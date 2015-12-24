class Room extends Fz2D.Group
  constructor: (w, h, sprites) ->
    super(0, 0, w, h)
   
    @exists = false
    @tag = "room"
    @font = new Fz2D.Font(sprites.getTexture('font_16'), 16)
    @label = @add(new Fz2D.Gui.Label('', 64, 64, @font))

    random = new Fz2D.Random()

    # TODO: generate "cluther" meaning environment (trees, etc)
    tree_one = sprites.getTexture('tree_one')
    tree_two = sprites.getTexture('tree_two')

    for i in [0..3]
      if random.nextBool()
        texture = tree_one
      else
        texture = tree_two

      tree = @add(new Fz2D.Entity(texture))
      tree.reset(random.next(w - tree.w), h - tree.h)

    grass_one = sprites.getTexture('grass_one')
    grass_two = sprites.getTexture('grass_two')
    grass_three = sprites.getTexture('grass_three')

    for i in [0..16]
      if random.nextBool()
        texture = grass_one
      else if random.nextBool()
        texture = grass_three
      else
        texture = grass_two

      grass = @add(new Fz2D.Entity(texture))
      grass.reset(random.next(w - grass.w), h - grass.h)

    texture = sprites.getTexture('candy_cane')

    for i in [0..2]
      if random.next(64) & 15
        candy_cane = @add(new Fz2D.Entity(texture))
        candy_cane.reset(random.next(w - candy_cane.w), h - candy_cane.h)

  setTag: (tag) ->
    @tag = "room_#{tag}"

  setText: (text) ->
    @label.setText(text)
