class Bird extends Fz2D.Entity
  constructor: (sprites) ->
    bird_left = sprites.getTexture('bird_left')
    bird_right = sprites.getTexture('bird_right')

    super(bird_left.getSubTexture(0, 0, 44, 32))

    @addAnimation('left', bird_left, 2)
    @addAnimation('right', bird_right, 2)

    @random = new Fz2D.Random()

    @moving = true
    @speed = 0.1

  fly_left: (x, y) ->
    @reset(x, y)
    @play('left', true)
    @dx = -@speed

  fly_right: (x, y) ->
    @reset(x, y)
    @play('right', true)
    @dx = @speed

  kill: () ->
    super

    y = @random.next(200)

    if @random.nextBool()
      x = @group.x - (@w - 1)
      @fly_right(x, y)
    else
      x = @group.w - (@w - 1)
      @fly_left(x, y)

  update: (timer, input) ->
    super
    @kill() if @isOutOfBounds()
