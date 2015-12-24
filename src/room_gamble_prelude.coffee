class RoomGamblePrelude extends Room
  constructor: (w, h, sprites) ->
    super

    @setTag('gamble_prelude')
    @setText('I wonder ...\n\tif I could gamble "just once more" ...\nand win them back ...\n\tOhhh, some switches ...')

    @door = @add(new Door(sprites))
    @door.reset(@w - @door.w - 10, @h - @door.h)
    @door.onenter = (entity) ->
      entity.goto('intermission_three')

    sw1 = @add(new Switch(sprites))
    sw1.reset((@w - sw1.w) >> 1, @h - sw1.h)
    sw1.ontoggle = () =>
      @ontoggle('2')

    sw2 = @add(new Switch(sprites))
    sw2.reset(((@w - sw2.w) >> 1) + sw2.w * 4, @h - sw2.h)
    sw2.ontoggle = () =>
      @ontoggle('3')

    sw3 = @add(new Switch(sprites))
    sw3.reset(((@w - sw3.w) >> 1) - sw3.w * 4, @h - sw3.h)
    sw3.ontoggle = () =>
      @ontoggle('1')

    @sequence = ''

  ontoggle: (i) ->
    @sequence += i

    if @sequence.length == 3
      if @sequence == '132'
        @door.toggle()

      @sequence = ''
    else
      @door.close()
