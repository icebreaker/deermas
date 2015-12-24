class RoomIntermissionThree extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('intermission_three')
    @setText('Damn it ...\n\tif I don\'t "win" back the keys ...\n"Deermas" is ruined ...')

    door = @add(new Door(sprites))
    door.reset(@w - door.w - 10, @h - door.h)
    door.toggle()
    door.onenter = (entity) ->
      entity.goto('gamble')
