class LockKey extends Fz2D.Entity
  constructor: (sprites, tag=null, x=0, y=0) ->
    if tag?
      super(sprites.getTexture("key_#{tag}"), x, y)
      @tag = "key_#{tag}"
    else
      super(sprites.getTexture('key'), x, y)

    @exists = false

  onuse: (key) ->
    # nop

  ongive: (key) ->
    # nop

  use: () ->
    @kill()
    @onuse(@tag)
    true

  give: () ->
    @reset()
    @ongive(@tag)
    true
