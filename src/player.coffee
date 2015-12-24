class Player extends Fz2D.Group
  Key = Fz2D.Input.Keyboard.Key

  constructor: (w, h, sprites) ->
    super(0, 0, w, h)

    @items = @add(new Fz2D.Group(0, 0, w, h))
    @items.add(new LockKey(sprites, 'yellow', 32 * 2, 16))
    @items.add(new LockKey(sprites, 'green',  32 * 4, 16))
    @items.add(new LockKey(sprites, 'red',    32 * 6, 16))
    @items.add(new LockKey(sprites, 'blue',   32 * 8, 16))

    @deer = @add(new Deer(sprites))

  goto: (tag, position='left') ->
    @room.exists = false if @room?

    @room = @group.findByTag("room_#{tag}")
    @room.exists = true

    console.log('entered ' + tag) if Fz2D.development?

    if position == 'right'
      @deer.reset(@w - @deer.w - 10, @h - @deer.h + 5)
      @deer.play('idle_left', true)
    else
      @deer.reset(10, @h - @deer.h + 5)
      @deer.idle()

  has: (item) ->
    count = 0

    @items.each( (e) ->
      if e.exists and e.tag.indexOf(item) == 0
        count += 1
    )

    count

  give: (item) ->
    key = @items.findByTag(item)
    if key? and (not key.exists) and key.give(item)
      true
    else
      false

  use: (item) ->
    key = @items.findByTag(item)
    if key? and key.exists and key.use(item)
      true
    else
      false

  update: (timer, input) ->
    super

    if @deer.x < 0
      @deer.x = 0
    else if @deer.x + @deer.w > @w
      @deer.x = @w - @deer.w

    if input.keys[Key.RIGHT]
      @deer.run_right()
    else if input.keys[Key.LEFT]
      @deer.run_left()
    else
      @deer.idle()

    if input.keys.pressed[Key.E]
      Fz2D.collide(@deer, @room, @oncollide)
      @deer.exists = true

  oncollide: (deer, entity) =>
    if entity instanceof Switch
      entity.toggle(@)
    else if entity instanceof Door
      deer.exists = false if entity.enter(@)
    else if entity instanceof Lock
      entity.unlock(@)
    else if entity instanceof LockKey
      deer.exists = false
      entity.use()
      @give(entity.tag)
