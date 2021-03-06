// Generated by CoffeeScript 1.10.0
var Bird, Deer, Door, Game, Lock, LockKey, Player, Room, RoomClub, RoomGamble, RoomGamblePrelude, RoomIntermissionFour, RoomIntermissionOne, RoomIntermissionThree, RoomIntermissionTwo, RoomLocks, RoomTutorial, Switch, World,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Bird = (function(superClass) {
  extend(Bird, superClass);

  function Bird(sprites) {
    var bird_left, bird_right;
    bird_left = sprites.getTexture('bird_left');
    bird_right = sprites.getTexture('bird_right');
    Bird.__super__.constructor.call(this, bird_left.getSubTexture(0, 0, 44, 32));
    this.addAnimation('left', bird_left, 2);
    this.addAnimation('right', bird_right, 2);
    this.random = new Fz2D.Random();
    this.moving = true;
    this.speed = 0.1;
  }

  Bird.prototype.fly_left = function(x, y) {
    this.reset(x, y);
    this.play('left', true);
    return this.dx = -this.speed;
  };

  Bird.prototype.fly_right = function(x, y) {
    this.reset(x, y);
    this.play('right', true);
    return this.dx = this.speed;
  };

  Bird.prototype.kill = function() {
    var x, y;
    Bird.__super__.kill.apply(this, arguments);
    y = this.random.next(200);
    if (this.random.nextBool()) {
      x = this.group.x - (this.w - 1);
      return this.fly_right(x, y);
    } else {
      x = this.group.w - (this.w - 1);
      return this.fly_left(x, y);
    }
  };

  Bird.prototype.update = function(timer, input) {
    Bird.__super__.update.apply(this, arguments);
    if (this.isOutOfBounds()) {
      return this.kill();
    }
  };

  return Bird;

})(Fz2D.Entity);

Deer = (function(superClass) {
  extend(Deer, superClass);

  function Deer(sprites) {
    var idle_left, idle_right, run_left, run_right;
    run_right = sprites.getTexture('deer_run_right');
    run_left = sprites.getTexture('deer_run_left');
    idle_right = sprites.getTexture('deer_idle_right');
    idle_left = sprites.getTexture('deer_idle_left');
    Deer.__super__.constructor.call(this, new Fz2D.Entity(run_right.getSubTexture(0, 0, 128, 128)));
    this.addAnimation('run_right', run_right, 5);
    this.addAnimation('run_left', run_left, 5);
    this.addAnimation('idle_right', idle_right, 5, 400);
    this.addAnimation('idle_left', idle_left, 5, 400);
    this.play('idle_right', true);
    this.moving = true;
    this.speed = 0.2;
  }

  Deer.prototype.run_left = function() {
    this.dx = -this.speed;
    if (!this.is('run_left')) {
      return this.play('run_left', true);
    }
  };

  Deer.prototype.run_right = function() {
    this.dx = this.speed;
    if (!this.is('run_right')) {
      return this.play('run_right', true);
    }
  };

  Deer.prototype.idle = function() {
    if (!this.is('idle_left') && this.is('run_left')) {
      this.dx = 0;
      return this.play('idle_left', true);
    } else if (!this.is('idle_right') && this.is('run_right')) {
      this.dx = 0;
      return this.play('idle_right', true);
    }
  };

  return Deer;

})(Fz2D.Entity);

Door = (function(superClass) {
  extend(Door, superClass);

  function Door(sprites, tag, x, y) {
    if (tag == null) {
      tag = null;
    }
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    Door.__super__.constructor.call(this, sprites.getTexture('door_closed'), x, y);
    if (tag != null) {
      this.tag = "door_" + tag;
      this.addAnimation('open', sprites.getTexture("door_open_" + tag));
    } else {
      this.tag = 'door';
      this.addAnimation('open', sprites.getTexture('door_open'));
    }
    this.addAnimation('close', sprites.getTexture('door_closed'));
    this.play('close');
    this.delay = 0;
  }

  Door.prototype.onenter = function(entity) {};

  Door.prototype.onopen = function(entity) {};

  Door.prototype.onclose = function(entity) {};

  Door.prototype.ontoggle = function(entity) {};

  Door.prototype.toggle = function(entity) {
    if (this.is('open')) {
      this.close(entity);
    } else {
      this.open(entity);
    }
    return this.ontoggle(entity);
  };

  Door.prototype.open = function(entity) {
    if (!this.is('open')) {
      this.play('open');
      return this.onopen(entity);
    }
  };

  Door.prototype.close = function(entity) {
    if (!this.is('close')) {
      this.play('close');
      return this.onclose(entity);
    }
  };

  Door.prototype.enter = function(entity) {
    if (this.is('open')) {
      this.onenter(entity);
      return true;
    } else {
      return false;
    }
  };

  Door.prototype.update = function(timer, input) {
    Door.__super__.update.apply(this, arguments);
    if (this.delay > 0) {
      this.delay -= timer.dt;
      if (this.delay <= 0) {
        this.delay = 0;
        return this.close();
      }
    }
  };

  return Door;

})(Fz2D.Entity);

Game = (function(superClass) {
  extend(Game, superClass);

  function Game() {
    return Game.__super__.constructor.apply(this, arguments);
  }

  Game.prototype.w = 1024;

  Game.prototype.h = 480;

  Game.prototype.bg = '#D0F4F7';

  Game.prototype.fg = '#5e81a2';

  Game.prototype.assets = {
    sprites: 'sprites.atlas',
    sounds: {
      winter: 'winter.ogg'
    }
  };

  Game.prototype.plugins = [Fz2D.Plugins.GitHub, Fz2D.Plugins.Stats];

  Game.prototype.github = {
    username: 'icebreaker',
    repository: 'deermas'
  };

  Game.prototype.onload = function(game) {
    if (Fz2D.production != null) {
      game.input.mouse.hide();
    }
    return game.scene.add(new World(game.w, game.h, game.assets.sprites, game.assets.sounds));
  };

  return Game;

})(Fz2D.Game);

Game.run();

Lock = (function(superClass) {
  extend(Lock, superClass);

  function Lock(sprites, tag, x, y) {
    if (tag == null) {
      tag = null;
    }
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (tag != null) {
      Lock.__super__.constructor.call(this, sprites.getTexture("lock_" + tag), x, y);
      this.tag = "lock_" + tag;
      this.key = "key_" + tag;
      this.addAnimation('locked', sprites.getTexture("lock_" + tag));
      this.addAnimation('unlocked', sprites.getTexture("lock_" + tag + "_unlocked"));
    } else {
      Lock.__super__.constructor.call(this, sprites.getTexture('lock'), x, y);
      this.tag = 'lock';
      this.key = 'key';
      this.addAnimation('locked', sprites.getTexture('lock'));
      this.addAnimation('unlocked', sprites.getTexture('lock_unlocked'));
    }
    this.play('locked');
  }

  Lock.prototype.onunlock = function(entity) {};

  Lock.prototype.unlock = function(entity) {
    if (this.is('locked') && entity.use(this.key)) {
      this.play('unlocked');
      this.onunlock(entity);
      return true;
    } else {
      return false;
    }
  };

  return Lock;

})(Fz2D.Entity);

LockKey = (function(superClass) {
  extend(LockKey, superClass);

  function LockKey(sprites, tag, x, y) {
    if (tag == null) {
      tag = null;
    }
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (tag != null) {
      LockKey.__super__.constructor.call(this, sprites.getTexture("key_" + tag), x, y);
      this.tag = "key_" + tag;
    } else {
      LockKey.__super__.constructor.call(this, sprites.getTexture('key'), x, y);
    }
    this.exists = false;
  }

  LockKey.prototype.onuse = function(key) {};

  LockKey.prototype.ongive = function(key) {};

  LockKey.prototype.use = function() {
    this.kill();
    this.onuse(this.tag);
    return true;
  };

  LockKey.prototype.give = function() {
    this.reset();
    this.ongive(this.tag);
    return true;
  };

  return LockKey;

})(Fz2D.Entity);

Player = (function(superClass) {
  var Key;

  extend(Player, superClass);

  Key = Fz2D.Input.Keyboard.Key;

  function Player(w, h, sprites) {
    this.oncollide = bind(this.oncollide, this);
    Player.__super__.constructor.call(this, 0, 0, w, h);
    this.items = this.add(new Fz2D.Group(0, 0, w, h));
    this.items.add(new LockKey(sprites, 'yellow', 32 * 2, 16));
    this.items.add(new LockKey(sprites, 'green', 32 * 4, 16));
    this.items.add(new LockKey(sprites, 'red', 32 * 6, 16));
    this.items.add(new LockKey(sprites, 'blue', 32 * 8, 16));
    this.deer = this.add(new Deer(sprites));
  }

  Player.prototype.goto = function(tag, position) {
    if (position == null) {
      position = 'left';
    }
    if (this.room != null) {
      this.room.exists = false;
    }
    this.room = this.group.findByTag("room_" + tag);
    this.room.exists = true;
    if (Fz2D.development != null) {
      console.log('entered ' + tag);
    }
    if (position === 'right') {
      this.deer.reset(this.w - this.deer.w - 10, this.h - this.deer.h + 5);
      return this.deer.play('idle_left', true);
    } else {
      this.deer.reset(10, this.h - this.deer.h + 5);
      return this.deer.idle();
    }
  };

  Player.prototype.has = function(item) {
    var count;
    count = 0;
    this.items.each(function(e) {
      if (e.exists && e.tag.indexOf(item) === 0) {
        return count += 1;
      }
    });
    return count;
  };

  Player.prototype.give = function(item) {
    var key;
    key = this.items.findByTag(item);
    if ((key != null) && (!key.exists) && key.give(item)) {
      return true;
    } else {
      return false;
    }
  };

  Player.prototype.use = function(item) {
    var key;
    key = this.items.findByTag(item);
    if ((key != null) && key.exists && key.use(item)) {
      return true;
    } else {
      return false;
    }
  };

  Player.prototype.update = function(timer, input) {
    Player.__super__.update.apply(this, arguments);
    if (this.deer.x < 0) {
      this.deer.x = 0;
    } else if (this.deer.x + this.deer.w > this.w) {
      this.deer.x = this.w - this.deer.w;
    }
    if (input.keys[Key.RIGHT]) {
      this.deer.run_right();
    } else if (input.keys[Key.LEFT]) {
      this.deer.run_left();
    } else {
      this.deer.idle();
    }
    if (input.keys.pressed[Key.E]) {
      Fz2D.collide(this.deer, this.room, this.oncollide);
      return this.deer.exists = true;
    }
  };

  Player.prototype.oncollide = function(deer, entity) {
    if (entity instanceof Switch) {
      return entity.toggle(this);
    } else if (entity instanceof Door) {
      if (entity.enter(this)) {
        return deer.exists = false;
      }
    } else if (entity instanceof Lock) {
      return entity.unlock(this);
    } else if (entity instanceof LockKey) {
      deer.exists = false;
      entity.use();
      return this.give(entity.tag);
    }
  };

  return Player;

})(Fz2D.Group);

Room = (function(superClass) {
  extend(Room, superClass);

  function Room(w, h, sprites) {
    var candy_cane, grass, grass_one, grass_three, grass_two, i, k, l, m, random, texture, tree, tree_one, tree_two;
    Room.__super__.constructor.call(this, 0, 0, w, h);
    this.exists = false;
    this.tag = "room";
    this.font = new Fz2D.Font(sprites.getTexture('font_16'), 16);
    this.label = this.add(new Fz2D.Gui.Label('', 64, 64, this.font));
    random = new Fz2D.Random();
    tree_one = sprites.getTexture('tree_one');
    tree_two = sprites.getTexture('tree_two');
    for (i = k = 0; k <= 3; i = ++k) {
      if (random.nextBool()) {
        texture = tree_one;
      } else {
        texture = tree_two;
      }
      tree = this.add(new Fz2D.Entity(texture));
      tree.reset(random.next(w - tree.w), h - tree.h);
    }
    grass_one = sprites.getTexture('grass_one');
    grass_two = sprites.getTexture('grass_two');
    grass_three = sprites.getTexture('grass_three');
    for (i = l = 0; l <= 16; i = ++l) {
      if (random.nextBool()) {
        texture = grass_one;
      } else if (random.nextBool()) {
        texture = grass_three;
      } else {
        texture = grass_two;
      }
      grass = this.add(new Fz2D.Entity(texture));
      grass.reset(random.next(w - grass.w), h - grass.h);
    }
    texture = sprites.getTexture('candy_cane');
    for (i = m = 0; m <= 2; i = ++m) {
      if (random.next(64) & 15) {
        candy_cane = this.add(new Fz2D.Entity(texture));
        candy_cane.reset(random.next(w - candy_cane.w), h - candy_cane.h);
      }
    }
  }

  Room.prototype.setTag = function(tag) {
    return this.tag = "room_" + tag;
  };

  Room.prototype.setText = function(text) {
    return this.label.setText(text);
  };

  return Room;

})(Fz2D.Group);

RoomClub = (function(superClass) {
  extend(RoomClub, superClass);

  function RoomClub(w, h, sprites) {
    var deer, i, k, random, x, y;
    RoomClub.__super__.constructor.apply(this, arguments);
    this.setTag('club');
    this.setText('Welcome to the "Deer Club" ...\n\tMerry Chrismas ...\nand a Happy New Year\n\tMaral ...\nOwner and proud member of the "Deer Club" ...');
    random = new Fz2D.Random();
    for (i = k = 0; k <= 5; i = ++k) {
      deer = this.add(new Deer(sprites));
      deer.animation.delay = 200 + (random.next(200));
      if (random.nextBool()) {
        deer.play('idle_left', true);
      } else {
        deer.play('idle_right', true);
      }
      x = 200 + (random.next(w - 300));
      y = h - deer.h + 5;
      deer.reset(x, y);
    }
  }

  return RoomClub;

})(Room);

RoomGamble = (function(superClass) {
  extend(RoomGamble, superClass);

  function RoomGamble(w, h, sprites) {
    var c, door, k, len, ref, sw, x, y, yy, yyy;
    RoomGamble.__super__.constructor.apply(this, arguments);
    this.setTag('gamble');
    this.setText('Yes, yes, yes!\n\tLet\'s gamble ...');
    this.door = this.add(new Door(sprites));
    this.door.reset(this.w - this.door.w - 10, this.h - this.door.h);
    this.door.toggle();
    this.door.onenter = function(entity) {
      return entity.goto('intermission_four');
    };
    this.random = new Fz2D.Random();
    this.keys = this.shuffle_colors();
    this.lock_sequence = ' ';
    this.lock_sequence_replay = [];
    this.sequence = '';
    this.sw = this.add(new Switch(sprites, null, 64, this.h - 55));
    this.sw.ontoggle = (function(_this) {
      return function() {
        var door, new_colors;
        _this.sequence = '';
        _this.each(function(s) {
          if (s instanceof Switch) {
            s.alive = false;
          } else if (s instanceof Door) {
            s.last = false;
          }
          return true;
        });
        new_colors = _this.shuffle_colors();
        _this.lock_sequence = new_colors.join('');
        door = _this.findByTag("door_" + (new_colors.shift()));
        door.open();
        return _this.lock_sequence_replay = new_colors;
      };
    })(this);
    x = 180;
    y = this.h - 128;
    yy = this.h - 55;
    yyy = this.h - 38;
    ref = this.keys;
    for (k = 0, len = ref.length; k < len; k++) {
      c = ref[k];
      door = this.add(new Door(sprites, c, x, y));
      door.onopen = function() {
        this.delay = 2000;
        return this.room.sequence += this.color;
      };
      door.onclose = function() {
        var next_door;
        if (this.room.lock_sequence_replay.length > 0) {
          next_door = this.room.findByTag("door_" + (this.room.lock_sequence_replay.shift()));
          next_door.last = this.room.lock_sequence_replay.length === 0;
          return next_door.open();
        } else if (this.last) {
          this.room.sequence = '';
          return this.room.each(function(s) {
            if (s instanceof Switch) {
              s.alive = true;
            } else if (s instanceof Door) {
              s.last = false;
            }
            return true;
          });
        }
      };
      door.color = c;
      door.room = this;
      door.key = this.add(new LockKey(sprites, c, x + 25, yyy));
      sw = this.add(new Switch(sprites, c, x + 100, yy));
      sw.color = c;
      sw.door = door;
      sw.alive = false;
      sw.ontoggle = function() {
        return this.door.toggle();
      };
      x += 185;
    }
  }

  RoomGamble.prototype.doors_closed = function() {
    var count;
    count = 0;
    this.each(function(door) {
      if (door instanceof Door && door.is('open')) {
        return count += 1;
      }
    });
    return count === 1;
  };

  RoomGamble.prototype.shuffle_colors = function() {
    var colors, i, j, k, ref, ref1;
    colors = ['red', 'yellow', 'blue', 'green'];
    for (i = k = 1, ref = colors.length - 1; 1 <= ref ? k <= ref : k >= ref; i = 1 <= ref ? ++k : --k) {
      j = Math.floor(this.random.next(i + 1));
      ref1 = [colors[j], colors[i]], colors[i] = ref1[0], colors[j] = ref1[1];
    }
    return colors;
  };

  RoomGamble.prototype.update = function(timer, input) {
    RoomGamble.__super__.update.apply(this, arguments);
    if (this.lock_sequence_replay.length > 0) {
      return;
    }
    if (this.keys.length > 0) {
      if (this.sequence === this.lock_sequence && this.doors_closed()) {
        this.findByTag("key_" + (this.keys.shift())).give();
        this.sequence = '';
        this.each(function(s) {
          if (s instanceof Switch) {
            s.alive = false;
          } else if (s instanceof Door) {
            s.last = false;
          }
          return true;
        });
        return this.sw.alive = this.keys.length > 0;
      } else if (this.sequence.length > this.lock_sequence.length) {
        return this.sequence = '';
      }
    }
  };

  return RoomGamble;

})(Room);

RoomGamblePrelude = (function(superClass) {
  extend(RoomGamblePrelude, superClass);

  function RoomGamblePrelude(w, h, sprites) {
    var sw1, sw2, sw3;
    RoomGamblePrelude.__super__.constructor.apply(this, arguments);
    this.setTag('gamble_prelude');
    this.setText('I wonder ...\n\tif I could gamble "just once more" ...\nand win them back ...\n\tOhhh, some switches ...');
    this.door = this.add(new Door(sprites));
    this.door.reset(this.w - this.door.w - 10, this.h - this.door.h);
    this.door.onenter = function(entity) {
      return entity.goto('intermission_three');
    };
    sw1 = this.add(new Switch(sprites));
    sw1.reset((this.w - sw1.w) >> 1, this.h - sw1.h);
    sw1.ontoggle = (function(_this) {
      return function() {
        return _this.ontoggle('2');
      };
    })(this);
    sw2 = this.add(new Switch(sprites));
    sw2.reset(((this.w - sw2.w) >> 1) + sw2.w * 4, this.h - sw2.h);
    sw2.ontoggle = (function(_this) {
      return function() {
        return _this.ontoggle('3');
      };
    })(this);
    sw3 = this.add(new Switch(sprites));
    sw3.reset(((this.w - sw3.w) >> 1) - sw3.w * 4, this.h - sw3.h);
    sw3.ontoggle = (function(_this) {
      return function() {
        return _this.ontoggle('1');
      };
    })(this);
    this.sequence = '';
  }

  RoomGamblePrelude.prototype.ontoggle = function(i) {
    this.sequence += i;
    if (this.sequence.length === 3) {
      if (this.sequence === '132') {
        this.door.toggle();
      }
      return this.sequence = '';
    } else {
      return this.door.close();
    }
  };

  return RoomGamblePrelude;

})(Room);

RoomIntermissionFour = (function(superClass) {
  extend(RoomIntermissionFour, superClass);

  function RoomIntermissionFour(w, h, sprites) {
    var back_door, door;
    RoomIntermissionFour.__super__.constructor.apply(this, arguments);
    this.setTag('intermission_four');
    this.setText('Yes, yes, yes ...\n\tI got the keys ...\nClap, clap, clap, clap ...');
    back_door = this.add(new Door(sprites));
    back_door.reset(10, this.h - back_door.h);
    back_door.open();
    back_door.onenter = function(entity) {
      return entity.goto('gamble', 'right');
    };
    door = this.add(new Door(sprites));
    door.reset(this.w - door.w - 10, this.h - door.h);
    door.toggle();
    door.onenter = function(entity) {
      return entity.goto('locks');
    };
  }

  return RoomIntermissionFour;

})(Room);

RoomIntermissionOne = (function(superClass) {
  extend(RoomIntermissionOne, superClass);

  function RoomIntermissionOne(w, h, sprites) {
    var door;
    RoomIntermissionOne.__super__.constructor.apply(this, arguments);
    this.setTag('intermission_one');
    this.setText('Oh shit ...\n\tI forgot the keys ...\nof the "Deer Club" ...');
    door = this.add(new Door(sprites));
    door.reset(this.w - door.w - 10, this.h - door.h);
    door.toggle();
    door.onenter = function(entity) {
      return entity.goto('intermission_two');
    };
  }

  return RoomIntermissionOne;

})(Room);

RoomIntermissionThree = (function(superClass) {
  extend(RoomIntermissionThree, superClass);

  function RoomIntermissionThree(w, h, sprites) {
    var door;
    RoomIntermissionThree.__super__.constructor.apply(this, arguments);
    this.setTag('intermission_three');
    this.setText('Damn it ...\n\tif I don\'t "win" back the keys ...\n"Deermas" is ruined ...');
    door = this.add(new Door(sprites));
    door.reset(this.w - door.w - 10, this.h - door.h);
    door.toggle();
    door.onenter = function(entity) {
      return entity.goto('gamble');
    };
  }

  return RoomIntermissionThree;

})(Room);

RoomIntermissionTwo = (function(superClass) {
  extend(RoomIntermissionTwo, superClass);

  function RoomIntermissionTwo(w, h, sprites) {
    var door;
    RoomIntermissionTwo.__super__.constructor.apply(this, arguments);
    this.setTag('intermission_two');
    this.setText('Waaiiitt ...\n\tI gambled them away on "Poker Stars" ...\nohhhh maaaannn ...');
    door = this.add(new Door(sprites));
    door.reset(this.w - door.w - 10, this.h - door.h);
    door.toggle();
    door.onenter = function(entity) {
      return entity.goto('gamble_prelude');
    };
  }

  return RoomIntermissionTwo;

})(Room);

RoomLocks = (function(superClass) {
  extend(RoomLocks, superClass);

  function RoomLocks(w, h, sprites) {
    this.onunlock = bind(this.onunlock, this);
    var lk1, lk2, lk3, lk4;
    RoomLocks.__super__.constructor.apply(this, arguments);
    this.setTag('locks');
    this.setText('Ha! ...\n\tluckily I managed to win back all four keys ...\nHahahaha!');
    this.back_door = this.add(new Door(sprites));
    this.back_door.reset(10, this.h - this.back_door.h);
    this.back_door.open();
    this.back_door.onenter = function(entity) {
      return entity.goto('intermission_four', 'right');
    };
    this.door = this.add(new Door(sprites));
    this.door.reset(this.w - this.door.w - 10, this.h - this.door.h);
    this.door.onenter = function(entity) {
      return entity.goto('club');
    };
    lk1 = this.add(new Lock(sprites, 'blue'));
    lk1.reset(((this.w - lk1.w) >> 1) - lk1.w * 2, this.h - lk1.h);
    lk1.onunlock = this.onunlock;
    lk2 = this.add(new Lock(sprites, 'red'));
    lk2.reset(((this.w - lk2.w) >> 1) - lk2.w * 5, this.h - lk2.h);
    lk2.onunlock = this.onunlock;
    lk3 = this.add(new Lock(sprites, 'yellow'));
    lk3.reset(((this.w - lk3.w) >> 1) + lk3.w * 2, this.h - lk3.h);
    lk3.onunlock = this.onunlock;
    lk4 = this.add(new Lock(sprites, 'green'));
    lk4.reset(((this.w - lk4.w) >> 1) + lk4.w * 5, this.h - lk4.h);
    lk4.onunlock = this.onunlock;
  }

  RoomLocks.prototype.onunlock = function() {
    var can_open_door;
    can_open_door = true;
    this.each(function(item) {
      if (item instanceof Lock && item.is('locked')) {
        can_open_door = false;
        return false;
      }
    });
    if (can_open_door) {
      return this.door.toggle();
    }
  };

  return RoomLocks;

})(Room);

RoomTutorial = (function(superClass) {
  extend(RoomTutorial, superClass);

  function RoomTutorial(w, h, sprites) {
    var door, door_help, sw, sw_help;
    RoomTutorial.__super__.constructor.apply(this, arguments);
    this.setTag('tutorial');
    this.setText('"Deermas" is here ...\n\tand the deer with no friends ...\ncalled "Maral" is heading ...\n\tto the "Deer Club" ...');
    door = this.add(new Door(sprites));
    door.reset(this.w - door.w - 10, this.h - door.h);
    door.ontoggle = function() {
      return door_help.exists = !door_help.exists;
    };
    door.onenter = function(entity) {
      return entity.goto('intermission_one');
    };
    sw = this.add(new Switch(sprites));
    sw.reset((this.w - sw.w) >> 1, this.h - sw.h);
    sw.ontoggle = function() {
      sw_help.exists = !sw_help.exists;
      return door.toggle();
    };
    door_help = this.add(new Fz2D.Entity(sprites.getTexture('key_e'), door.x + 22, door.y - 64));
    door_help.exists = false;
    sw_help = this.add(new Fz2D.Entity(sprites.getTexture('key_e'), (this.w - 32) >> 1, this.h - 128));
    this.add(new Fz2D.Entity(sprites.getTexture('arrow_left'), 16, this.h - 128));
    this.add(new Fz2D.Entity(sprites.getTexture('arrow_right'), 96, this.h - 128));
  }

  return RoomTutorial;

})(Room);

Switch = (function(superClass) {
  extend(Switch, superClass);

  function Switch(sprites, tag, x, y) {
    if (tag == null) {
      tag = null;
    }
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (tag != null) {
      Switch.__super__.constructor.call(this, sprites.getTexture("switch_" + tag + "_left"), x, y);
      this.tag = "switch_" + tag;
      this.addAnimation('left', sprites.getTexture("switch_" + tag + "_left"));
      this.addAnimation('right', sprites.getTexture("switch_" + tag + "_right"));
    } else {
      Switch.__super__.constructor.call(this, sprites.getTexture("switch_left"), x, y);
      this.tag = "switch";
      this.addAnimation('left', sprites.getTexture("switch_left"));
      this.addAnimation('right', sprites.getTexture("switch_right"));
    }
    this.play('left');
  }

  Switch.prototype.ontoggle = function(entity) {};

  Switch.prototype.toggle = function(entity) {
    if (!this.alive) {
      return;
    }
    if (this.is('left')) {
      this.play('right');
    } else {
      this.play('left');
    }
    return this.ontoggle(entity);
  };

  return Switch;

})(Fz2D.Entity);

World = (function(superClass) {
  extend(World, superClass);

  function World(w, h, sprites, sounds) {
    var bird, count, ground, i, k, player, ref, y;
    World.__super__.constructor.call(this, 0, 0, w, h);
    sounds.winter.setVolume(40);
    sounds.winter.play(true);
    this.add(new Fz2D.Entity(sprites.getTexture('background')));
    ground = sprites.getTexture('ground');
    count = (w / ground.w) - 1;
    y = h - ground.h;
    for (i = k = 0, ref = count; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
      this.add(new Fz2D.Entity(ground, i * ground.w, y));
    }
    this.add(new RoomTutorial(w, y, sprites));
    this.add(new RoomIntermissionOne(w, y, sprites));
    this.add(new RoomIntermissionTwo(w, y, sprites));
    this.add(new RoomGamblePrelude(w, y, sprites));
    this.add(new RoomIntermissionThree(w, y, sprites));
    this.add(new RoomGamble(w, y, sprites));
    this.add(new RoomIntermissionFour(w, y, sprites));
    this.add(new RoomLocks(w, y, sprites));
    this.add(new RoomClub(w, y, sprites));
    player = this.add(new Player(w, y, sprites));
    player.goto('tutorial');
    bird = this.add(new Bird(sprites));
    bird.kill();
  }

  return World;

})(Fz2D.Group);
