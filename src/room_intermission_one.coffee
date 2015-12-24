class RoomIntermissionOne extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('intermission_one')
    @setText('Oh shit ...\n\tI forgot the keys ...\nof the "Deer Club" ...')

    door = @add(new Door(sprites))
    door.reset(@w - door.w - 10, @h - door.h)
    door.toggle()
    door.onenter = (entity) ->
      entity.goto('intermission_two')
