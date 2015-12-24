class RoomTutorial extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('tutorial')
    @setText('"Deermas" is here ...\n\tand the deer with no friends ...\ncalled "Maral" is heading ...\n\tto the "Deer Club" ...')

    door = @add(new Door(sprites))
    door.reset(@w - door.w - 10, @h - door.h)
    door.ontoggle = () ->
      door_help.exists = !door_help.exists
    door.onenter = (entity) ->
      entity.goto('intermission_one')

    sw = @add(new Switch(sprites))
    sw.reset((@w - sw.w) >> 1, @h - sw.h)
    sw.ontoggle = () ->
      sw_help.exists = !sw_help.exists
      door.toggle()

    door_help = @add(new Fz2D.Entity(sprites.getTexture('key_e'), door.x + 22, door.y - 64))
    door_help.exists = false

    sw_help = @add(new Fz2D.Entity(sprites.getTexture('key_e'), (@w - 32) >> 1, @h - 128))

    @add(new Fz2D.Entity(sprites.getTexture('arrow_left'),  16, @h - 128))
    @add(new Fz2D.Entity(sprites.getTexture('arrow_right'), 96, @h - 128))
