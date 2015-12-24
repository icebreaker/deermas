class RoomLocks extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('locks')
    @setText('Ha! ...\n\tluckily I managed to win back all four keys ...\nHahahaha!')

    @back_door = @add(new Door(sprites))
    @back_door.reset(10, @h - @back_door.h)
    @back_door.open()
    @back_door.onenter = (entity) ->
      entity.goto('intermission_four', 'right')

    @door = @add(new Door(sprites))
    @door.reset(@w - @door.w - 10, @h - @door.h)
    @door.onenter = (entity) ->
      entity.goto('club')

    lk1 = @add(new Lock(sprites, 'blue'))
    lk1.reset(((@w - lk1.w) >> 1) - lk1.w * 2, @h - lk1.h)
    lk1.onunlock = @onunlock

    lk2 = @add(new Lock(sprites, 'red'))
    lk2.reset(((@w - lk2.w) >> 1) - lk2.w * 5, @h - lk2.h)
    lk2.onunlock = @onunlock

    lk3 = @add(new Lock(sprites, 'yellow'))
    lk3.reset(((@w - lk3.w) >> 1) + lk3.w * 2, @h - lk3.h)
    lk3.onunlock = @onunlock

    lk4 = @add(new Lock(sprites, 'green'))
    lk4.reset(((@w - lk4.w) >> 1) + lk4.w * 5, @h - lk4.h)
    lk4.onunlock = @onunlock

  onunlock: () =>
    can_open_door = true

    @each( (item) ->
      if item instanceof Lock and item.is('locked')
        can_open_door = false
        false
    )

    if can_open_door
      @door.toggle()
