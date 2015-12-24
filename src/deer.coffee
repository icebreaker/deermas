class Deer extends Fz2D.Entity
  constructor: (sprites) ->
    run_right = sprites.getTexture('deer_run_right')
    run_left  = sprites.getTexture('deer_run_left')

    idle_right = sprites.getTexture('deer_idle_right')
    idle_left = sprites.getTexture('deer_idle_left')

    super(new Fz2D.Entity(run_right.getSubTexture(0, 0, 128, 128)))

    @addAnimation('run_right', run_right, 5)
    @addAnimation('run_left', run_left, 5)

    @addAnimation('idle_right', idle_right, 5, 400)
    @addAnimation('idle_left', idle_left, 5, 400)

    @play('idle_right', true)

    @moving = true
    @speed = 0.2

  run_left: () ->
    @dx = -@speed
    @play('run_left', true) unless @is('run_left')

  run_right: () ->
    @dx = @speed
    @play('run_right', true) unless @is('run_right')

  idle: () ->
    if not @is('idle_left') and @is('run_left')
      @dx = 0
      @play('idle_left', true)
    else if not @is('idle_right') and @is('run_right')
      @dx = 0
      @play('idle_right', true)
