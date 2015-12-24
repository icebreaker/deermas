class RoomGamble extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('gamble')
    @setText('Yes, yes, yes!\n\tLet\'s gamble ...')

    @door = @add(new Door(sprites))
    @door.reset(@w - @door.w - 10, @h - @door.h)
    @door.toggle()
    @door.onenter = (entity) ->
      entity.goto('intermission_four')

    @random = new Fz2D.Random()

    @keys = @shuffle_colors()

    @lock_sequence = ' '
    @lock_sequence_replay = []
    @sequence = ''

    @sw = @add(new Switch(sprites, null, 64, @h - 55))
    @sw.ontoggle = () =>
      @sequence = ''

      @each( (s) ->
        if s instanceof Switch
          s.alive = false
        else if s instanceof Door
          s.last = false
        true
      )

      new_colors = @shuffle_colors()
      @lock_sequence =  new_colors.join('')

      door = @findByTag("door_#{new_colors.shift()}")
      door.open()

      @lock_sequence_replay = new_colors

    x = 180
    y = @h - 128
    yy= @h - 55
    yyy=@h - 38

    for c in @keys
      door = @add(new Door(sprites, c, x, y))
      door.onopen = () ->
        @delay = 2000
        @room.sequence += @color
      door.onclose = () ->
        if @room.lock_sequence_replay.length > 0
          next_door = @room.findByTag("door_#{@room.lock_sequence_replay.shift()}")
          next_door.last = (@room.lock_sequence_replay.length == 0)
          next_door.open()
        else if @last
          @room.sequence = ''
          @room.each( (s) ->
            if s instanceof Switch
              s.alive = true
            else if s instanceof Door
              s.last = false

            true
          )

      door.color = c
      door.room = @

      door.key = @add(new LockKey(sprites, c, x + 25, yyy))

      sw = @add(new Switch(sprites, c, x + 100, yy))
      sw.color = c
      sw.door = door
      sw.alive = false
      sw.ontoggle = () ->
        @door.toggle()

      x += 185

  doors_closed: () ->
    count = 0

    @each( (door) ->
      if door instanceof Door and door.is('open')
        count += 1
    )

    count == 1

  shuffle_colors: () ->
    colors = ['red', 'yellow', 'blue', 'green']

    for i in [1..colors.length-1]
      j = Math.floor(@random.next(i + 1))
      [colors[i], colors[j]] = [colors[j], colors[i]]

    colors

  update: (timer, input) ->
    super

    if @lock_sequence_replay.length > 0
      return

    if @keys.length > 0
      if @sequence == @lock_sequence and @doors_closed()
        @findByTag("key_#{@keys.shift()}").give()
        @sequence = ''
        @each( (s) ->
          if s instanceof Switch
            s.alive = false
          else if s instanceof Door
            s.last = false
          true
        )
        @sw.alive = (@keys.length > 0)
      else if @sequence.length > @lock_sequence.length
        @sequence = ''
