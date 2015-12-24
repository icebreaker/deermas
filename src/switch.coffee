class Switch extends Fz2D.Entity
  constructor: (sprites, tag=null, x=0, y=0) ->
    if tag?
      super(sprites.getTexture("switch_#{tag}_left"), x, y)
      @tag = "switch_#{tag}"

      @addAnimation('left', sprites.getTexture("switch_#{tag}_left"))
      @addAnimation('right', sprites.getTexture("switch_#{tag}_right"))
    else
      super(sprites.getTexture("switch_left"), x, y)
      @tag = "switch"

      @addAnimation('left', sprites.getTexture("switch_left"))
      @addAnimation('right', sprites.getTexture("switch_right"))

    @play('left')

  ontoggle: (entity) ->
    # nop

  toggle: (entity) ->
    return unless @alive

    if @is('left')
      @play('right')
    else
      @play('left')

    @ontoggle(entity)
