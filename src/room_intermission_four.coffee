class RoomIntermissionFour extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('intermission_four')
    @setText('Yes, yes, yes ...\n\tI got the keys ...\nClap, clap, clap, clap ...')

    back_door = @add(new Door(sprites))
    back_door.reset(10, @h - back_door.h)
    back_door.open()
    back_door.onenter = (entity) ->
      entity.goto('gamble', 'right')
 
    door = @add(new Door(sprites))
    door.reset(@w - door.w - 10, @h - door.h)
    door.toggle()
    door.onenter = (entity) ->
      entity.goto('locks')
