class Door extends Fz2D.Entity
  constructor: (sprites, tag=null, x=0, y=0) ->
    super(sprites.getTexture('door_closed'), x, y)

    if tag?
      @tag = "door_#{tag}"
      @addAnimation('open', sprites.getTexture("door_open_#{tag}"))
    else
      @tag = 'door'
      @addAnimation('open', sprites.getTexture('door_open'))

    @addAnimation('close', sprites.getTexture('door_closed'))

    @play('close')
    @delay = 0

  onenter: (entity) ->
    # nop

  onopen: (entity) ->
    # nop

  onclose:(entity) ->
    # nop

  ontoggle: (entity) ->
    #nop

  toggle: (entity) ->
    if @is('open')
      @close(entity)
    else
      @open(entity)

    @ontoggle(entity)

  open: (entity) ->
    unless @is('open')
      @play('open')
      @onopen(entity)

  close: (entity) ->
    unless @is('close')
      @play('close')
      @onclose(entity)

  enter: (entity) ->
    if @is('open')
      @onenter(entity)
      true
    else
      false

  update: (timer, input) ->
    super

    if @delay > 0
      @delay -= timer.dt
      if @delay <= 0
        @delay = 0
        @close()
