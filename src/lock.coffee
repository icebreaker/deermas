class Lock extends Fz2D.Entity
  constructor: (sprites, tag=null, x=0, y=0) ->
    if tag?
      super(sprites.getTexture("lock_#{tag}"), x, y)
      @tag = "lock_#{tag}"
      @key = "key_#{tag}"

      @addAnimation('locked', sprites.getTexture("lock_#{tag}"))
      @addAnimation('unlocked', sprites.getTexture("lock_#{tag}_unlocked"))
    else
      super(sprites.getTexture('lock'), x, y)
      @tag = 'lock'
      @key = 'key'

      @addAnimation('locked', sprites.getTexture('lock'))
      @addAnimation('unlocked', sprites.getTexture('lock_unlocked'))

    @play('locked')

  onunlock: (entity) ->
    # nop

  unlock: (entity) ->
    if @is('locked') and entity.use(@key)
      @play('unlocked')
      @onunlock(entity)
      true
    else
      false
