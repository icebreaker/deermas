class RoomIntermissionTwo extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('intermission_two')
    @setText('Waaiiitt ...\n\tI gambled them away on "Poker Stars" ...\nohhhh maaaannn ...')

    door = @add(new Door(sprites))
    door.reset(@w - door.w - 10, @h - door.h)
    door.toggle()
    door.onenter = (entity) ->
      entity.goto('gamble_prelude')
