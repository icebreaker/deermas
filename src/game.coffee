class Game extends Fz2D.Game
  w: 1024
  h: 480
  bg: '#D0F4F7'
  fg: '#5e81a2'

  assets:
    sprites: 'sprites.atlas'
    sounds:
      winter: 'winter.ogg'
  
  plugins: [
    Fz2D.Plugins.GoogleAnalytics,
    Fz2D.Plugins.GitHub,
    Fz2D.Plugins.Stats
  ]

  ga:
    id: 'UA-3042007-2'

  github:
    username: 'icebreaker'
    repository: 'deermas'

  onload: (game) ->
    game.input.mouse.hide() if Fz2D.production?
    game.scene.add(new World(game.w, game.h, game.assets.sprites, game.assets.sounds))

Game.run()
