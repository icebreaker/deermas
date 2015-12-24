class World extends Fz2D.Group
  constructor: (w, h, sprites, sounds) ->
    super(0, 0, w, h)

    sounds.winter.setVolume(40)
    sounds.winter.play(true)

    @add(new Fz2D.Entity(sprites.getTexture('background')))

    ground = sprites.getTexture('ground')
    count = (w / ground.w) - 1
    y = h - ground.h

    for i in [0..count]
      @add(new Fz2D.Entity(ground, i * ground.w, y))

    @add(new RoomTutorial(w, y, sprites))
    @add(new RoomIntermissionOne(w, y, sprites))
    @add(new RoomIntermissionTwo(w, y, sprites))
    @add(new RoomGamblePrelude(w, y, sprites))
    @add(new RoomIntermissionThree(w, y, sprites))
    @add(new RoomGamble(w, y, sprites))
    @add(new RoomIntermissionFour(w, y, sprites))
    @add(new RoomLocks(w, y, sprites))
    @add(new RoomClub(w, y, sprites))

    player = @add(new Player(w, y, sprites))
    player.goto('tutorial')

    bird = @add(new Bird(sprites))
    bird.kill()
