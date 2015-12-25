class RoomClub extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('club')
    @setText('Welcome to the "Deer Club" ...\n\tMerry Christmas ...\nand a Happy New Year\n\tMaral ...\nOwner and proud member of the "Deer Club" ...')

    random = new Fz2D.Random()

    for i in [0..5]
      deer = @add(new Deer(sprites))
      deer.animation.delay = 200 + (random.next(200))

      if random.nextBool()
        deer.play('idle_left', true)
      else
        deer.play('idle_right', true)
 
      x = 200 + (random.next(w - 300))
      y = h - deer.h + 5

      deer.reset(x, y)
