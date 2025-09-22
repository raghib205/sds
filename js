const state = {
  coins: 0,
  hatchCapacity: 1,
  pets: [],
  eggs: [],
  isAdmin: false,
  miniGameActive: false,
  miniGameClicks: 0,
  miniGameTarget: 0,
  miniGameTimer: 0,
  prestige: 0,
  prestigePoints: 0,
  autoHatcher: false,
  autoHatcherLevel: 0,
  coinMultiplier: 1,
  achievements: [],
  dailyRewardStreak: 0,
  lastRewardTime: 0,
  offlineEarnings: 0,
  lastSaveTime: Date.now(),
  shop: {
    coinBooster: 0,
    luckyCharm: 0,
    goldRush: 0,
    timeWarp: 0,
    magicWand: 0
  },
  quests: [],
  questsCompleted: [],
  petBattles: {
    wins: 0,
    losses: 0,
    currentOpponent: null
  },
  research: {
    unlocked: [],
    points: 0
  },
  garden: {
    plots: [],
    seeds: {},
    level: 1
  },
  casino: {
    chips: 100,
    lastSpin: 0
  },
  zones: {
    unlocked: [1], // Zone 1 is unlocked by default
    costs: {}, // Will be generated dynamically
    themes: {
      1: { bgGradient: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)', eggGradient: 'linear-gradient(135deg, #a5d6a7, #81c784)' },
      2: { bgGradient: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', eggGradient: 'linear-gradient(135deg, #ffcc80, #ffb74d)' },
      3: { bgGradient: 'linear-gradient(135deg, #ffebee, #ffcdd2)', eggGradient: 'linear-gradient(135deg, #f48fb1, #f06292)' },
      4: { bgGradient: 'linear-gradient(135deg, #f3e5f5, #e1bee7)', eggGradient: 'linear-gradient(135deg, #ce93d8, #ba68c8)' },
      5: { bgGradient: 'linear-gradient(135deg, #e8eaf6, #c5cae9)', eggGradient: 'linear-gradient(135deg, #9fa8da, #7986cb)' },
      6: { bgGradient: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', eggGradient: 'linear-gradient(135deg, #80cbc4, #4db6ac)' },
      7: { bgGradient: 'linear-gradient(135deg, #fce4ec, #f8bbd9)', eggGradient: 'linear-gradient(135deg, #f48fb1, #ec407a)' },
      8: { bgGradient: 'linear-gradient(135deg, #fff8e1, #ffecb3)', eggGradient: 'linear-gradient(135deg, #ffd54f, #ffca28)' },
      9: { bgGradient: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)', eggGradient: 'linear-gradient(135deg, #4fc3f7, #29b6f6)' },
      10: { bgGradient: 'linear-gradient(135deg, #f1f8e9, #dcedc8)', eggGradient: 'linear-gradient(135deg, #aed581, #9ccc65)' },
      11: { bgGradient: 'linear-gradient(135deg, #fafafa, #f5f5f5)', eggGradient: 'linear-gradient(135deg, #bdbdbd, #9e9e9e)' },
      12: { bgGradient: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', eggGradient: 'linear-gradient(135deg, #424242, #616161)' }
    }
  }
};

// Admin mode toggle with Ctrl + Shift + A
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
    state.isAdmin = !state.isAdmin;
    if (state.isAdmin) {
      state.coins = Infinity;
      state.hatchCapacity = Infinity;
      alert('Admin mode activated!');
    } else {
      state.coins = 0;
      state.hatchCapacity = 1;
      alert('Admin mode deactivated!');
    }
    updateUI();
  }
});
  
// World selector scroll logic
document.addEventListener('DOMContentLoaded', function() {
  const world1Btn = document.getElementById('world1Btn');
  const world2Btn = document.getElementById('world2Btn');
  if (world1Btn) {
    world1Btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (world2Btn) {
    world2Btn.addEventListener('click', function() {
      window.scrollTo({ top: 4000, behavior: 'smooth' });
    });
  }
});

const EGGS = {
  leaf: {
    cost: 25,
    emoji: '🍃',
    pets: {
      common: { chance: 70, multiplier: 1, emoji: '🐛' },
      uncommon: { chance: 25, multiplier: 2, emoji: '🐦' },
      rare: { chance: 5, multiplier: 4, emoji: '🦔' }
    }
  },
  stone: {
    cost: 100,
    emoji: '🪨',
    pets: {
      common: { chance: 60, multiplier: 2, emoji: '🐌' },
      uncommon: { chance: 30, multiplier: 4, emoji: '🦎' },
      rare: { chance: 10, multiplier: 8, emoji: '🦕' }
    }
  },
  flame: {
    cost: 500,
    emoji: '🔥',
    pets: {
      uncommon: { chance: 60, multiplier: 4, emoji: '🦊' },
      rare: { chance: 30, multiplier: 8, emoji: '🦁' },
      epic: { chance: 10, multiplier: 16, emoji: '🐲' }
    }
  },
  tide: {
    cost: 1000,
    emoji: '🌊',
    pets: {
      uncommon: { chance: 50, multiplier: 6, emoji: '🐟' },
      rare: { chance: 40, multiplier: 10, emoji: '🐬' },
      epic: { chance: 10, multiplier: 20, emoji: '🧜' }
    }
  },
  bloom: {
    cost: 2500,
    emoji: '🌸',
    pets: {
      rare: { chance: 60, multiplier: 12, emoji: '🦋' },
      epic: { chance: 30, multiplier: 24, emoji: '🧚' },
      legendary: { chance: 10, multiplier: 48, emoji: '🌺' }
    }
  },
  dusk: {
    cost: 5000,
    emoji: '🌆',
    pets: {
      epic: { chance: 70, multiplier: 30, emoji: '🦉' },
      legendary: { chance: 25, multiplier: 60, emoji: '🦇' },
      mythical: { chance: 5, multiplier: 120, emoji: '🌙' }
    }
  },
  root: {
    cost: 7500,
    emoji: '🌳',
    pets: {
      epic: { chance: 65, multiplier: 40, emoji: '🦥' },
      legendary: { chance: 30, multiplier: 80, emoji: '🦣' },
      mythical: { chance: 5, multiplier: 160, emoji: '🌲' }
    }
  },
  storm: {
    cost: 9000,
    emoji: '🌩️',
    pets: {
      legendary: { chance: 70, multiplier: 100, emoji: '🦅' },
      mythical: { chance: 25, multiplier: 200, emoji: '⚡' },
      divine: { chance: 5, multiplier: 400, emoji: '🌪️' }
    }
  },
  crystal: {
    cost: 9500,
    emoji: '💎',
    pets: {
      mythical: { chance: 80, multiplier: 120, emoji: '🧊' },
      divine: { chance: 18, multiplier: 240, emoji: '🔮' },
      celestial: { chance: 2, multiplier: 480, emoji: '✨' }
    }
  },
  eclipse: {
    cost: 10000,
    emoji: '🌘',
    pets: {
      divine: { chance: 75, multiplier: 150, emoji: '🌑' },
      celestial: { chance: 20, multiplier: 300, emoji: '🌠' },
      cosmic: { chance: 5, multiplier: 600, emoji: '🌌' }
    }
  },
  ember: {
    cost: 25000,
    emoji: '🔥',
    pets: {
      rare: { chance: 60, multiplier: 200, emoji: '🦊' },
      epic: { chance: 30, multiplier: 400, emoji: '🔥' },
      legendary: { chance: 10, multiplier: 800, emoji: '🌋' }
    }
  },
  frost: {
    cost: 30000,
    emoji: '❄️',
    pets: {
      rare: { chance: 55, multiplier: 250, emoji: '🐧' },
      epic: { chance: 35, multiplier: 500, emoji: '🧊' },
      legendary: { chance: 10, multiplier: 1000, emoji: '🌨️' }
    }
  },
  quake: {
    cost: 35000,
    emoji: '🌍',
    pets: {
      epic: { chance: 60, multiplier: 600, emoji: '🦖' },
      legendary: { chance: 30, multiplier: 1200, emoji: '⛰️' },
      mythical: { chance: 10, multiplier: 2400, emoji: '🌋' }
    }
  },
  gust: {
    cost: 40000,
    emoji: '💨',
    pets: {
      epic: { chance: 55, multiplier: 700, emoji: '🦅' },
      legendary: { chance: 35, multiplier: 1400, emoji: '🌪️' },
      mythical: { chance: 10, multiplier: 2800, emoji: '🌀' }
    }
  },
  magma: {
    cost: 45000,
    emoji: '🌋',
    pets: {
      legendary: { chance: 60, multiplier: 1600, emoji: '🦎' },
      mythical: { chance: 30, multiplier: 3200, emoji: '🔥' },
      divine: { chance: 10, multiplier: 6400, emoji: '💥' }
    }
  },
  glacier: {
    cost: 50000,
    emoji: '🧊',
    pets: {
      legendary: { chance: 55, multiplier: 1800, emoji: '🐻' },
      mythical: { chance: 35, multiplier: 3600, emoji: '❄️' },
      divine: { chance: 10, multiplier: 7200, emoji: '🧞' }
    }
  },
  bolt: {
    cost: 55000,
    emoji: '⚡',
    pets: {
      mythical: { chance: 60, multiplier: 4000, emoji: '🐍' },
      divine: { chance: 30, multiplier: 8000, emoji: '⚡' },
      celestial: { chance: 10, multiplier: 16000, emoji: '🌩️' }
    }
  },
  mist: {
    cost: 60000,
    emoji: '🌫️',
    pets: {
      mythical: { chance: 55, multiplier: 4500, emoji: '🦢' },
      divine: { chance: 35, multiplier: 9000, emoji: '🌫️' },
      celestial: { chance: 10, multiplier: 18000, emoji: '🧞' }
    }
  },
  spark: {
    cost: 65000,
    emoji: '✨',
    pets: {
      divine: { chance: 60, multiplier: 10000, emoji: '🧚' },
      celestial: { chance: 30, multiplier: 20000, emoji: '🌟' },
      cosmic: { chance: 10, multiplier: 40000, emoji: '🌌' }
    }
  },
  surge: {
    cost: 70000,
    emoji: '🌊',
    pets: {
      divine: { chance: 55, multiplier: 12000, emoji: '🐬' },
      celestial: { chance: 35, multiplier: 24000, emoji: '🌊' },
      cosmic: { chance: 10, multiplier: 48000, emoji: '🌠' }
    }
  },
  fairy: {
    cost: 75000,
    emoji: '🧚',
    pets: {
      rare: { chance: 60, multiplier: 15000, emoji: '🦋' },
      epic: { chance: 30, multiplier: 30000, emoji: '🧝' },
      legendary: { chance: 10, multiplier: 60000, emoji: '🌸' }
    }
  },
  goblin: {
    cost: 80000,
    emoji: '👺',
    pets: {
      rare: { chance: 55, multiplier: 16000, emoji: '🧌' },
      epic: { chance: 35, multiplier: 32000, emoji: '🪓' },
      legendary: { chance: 10, multiplier: 64000, emoji: '💰' }
    }
  },
  elf: {
    cost: 85000,
    emoji: '🧝',
    pets: {
      epic: { chance: 60, multiplier: 35000, emoji: '🏹' },
      legendary: { chance: 30, multiplier: 70000, emoji: '🧝‍♂️' },
      mythical: { chance: 10, multiplier: 140000, emoji: '🌿' }
    }
  },
  unicorn: {
    cost: 90000,
    emoji: '🦄',
    pets: {
      epic: { chance: 55, multiplier: 40000, emoji: '🦓' },
      legendary: { chance: 35, multiplier: 80000, emoji: '🦄' },
      mythical: { chance: 10, multiplier: 160000, emoji: '🌈' }
    }
  },
  griffin: {
    cost: 95000,
    emoji: '🦅',
    pets: {
      legendary: { chance: 60, multiplier: 90000, emoji: '🦅' },
      mythical: { chance: 30, multiplier: 180000, emoji: '🦁' },
      divine: { chance: 10, multiplier: 360000, emoji: '🛡️' }
    }
  },
  phoenix: {
    cost: 100000,
    emoji: '🔥',
    pets: {
      legendary: { chance: 55, multiplier: 100000, emoji: '🐦' },
      mythical: { chance: 35, multiplier: 200000, emoji: '🔥' },
      divine: { chance: 10, multiplier: 400000, emoji: '🌅' }
    }
  },
  troll: {
    cost: 110000,
    emoji: '🧌',
    pets: {
      mythical: { chance: 60, multiplier: 220000, emoji: '🪨' },
      divine: { chance: 30, multiplier: 440000, emoji: '🧱' },
      celestial: { chance: 10, multiplier: 880000, emoji: '🗿' }
    }
  },
  centaur: {
    cost: 120000,
    emoji: '🐎',
    pets: {
      mythical: { chance: 55, multiplier: 240000, emoji: '🏹' },
      divine: { chance: 35, multiplier: 480000, emoji: '🧝' },
      celestial: { chance: 10, multiplier: 960000, emoji: '🌠' }
    }
  },
  dragon: {
    cost: 130000,
    emoji: '🐉',
    pets: {
      divine: { chance: 60, multiplier: 500000, emoji: '🐲' },
      celestial: { chance: 30, multiplier: 1000000, emoji: '🔥' },
      cosmic: { chance: 10, multiplier: 2000000, emoji: '🌌' }
    }
  },
  chimera: {
    cost: 140000,
    emoji: '🦖',
    pets: {
      divine: { chance: 55, multiplier: 550000, emoji: '🦖' },
      celestial: { chance: 35, multiplier: 1100000, emoji: '🧬' },
      cosmic: { chance: 10, multiplier: 2200000, emoji: '🌀' }
    }
  },
  circuit: {
    cost: 150000,
    emoji: '🧩',
    pets: {
      rare: { chance: 60, multiplier: 600000, emoji: '🔌' },
      epic: { chance: 30, multiplier: 1200000, emoji: '🔋' },
      legendary: { chance: 10, multiplier: 2400000, emoji: '⚙️' }
    }
  },
  gear: {
    cost: 160000,
    emoji: '⚙️',
    pets: {
      rare: { chance: 55, multiplier: 650000, emoji: '🧲' },
      epic: { chance: 35, multiplier: 1300000, emoji: '🔧' },
      legendary: { chance: 10, multiplier: 2600000, emoji: '🛠️' }
    }
  },
  byte: {
    cost: 170000,
    emoji: '💾',
    pets: {
      epic: { chance: 60, multiplier: 1400000, emoji: '📀' },
      legendary: { chance: 30, multiplier: 2800000, emoji: '💻' },
      mythical: { chance: 10, multiplier: 5600000, emoji: '🖥️' }
    }
  },
  bot: {
    cost: 180000,
    emoji: '🤖',
    pets: {
      epic: { chance: 55, multiplier: 1500000, emoji: '🦾' },
      legendary: { chance: 35, multiplier: 3000000, emoji: '🧠' },
      mythical: { chance: 10, multiplier: 6000000, emoji: '🛸' }
    }
  },
  drone: {
    cost: 190000,
    emoji: '🛸',
    pets: {
      legendary: { chance: 60, multiplier: 3200000, emoji: '📡' },
      mythical: { chance: 30, multiplier: 6400000, emoji: '🛰️' },
      divine: { chance: 10, multiplier: 12800000, emoji: '🌐' }
    }
  },
  mech: {
    cost: 200000,
    emoji: '🦾',
    pets: {
      legendary: { chance: 55, multiplier: 3500000, emoji: '🛠️' },
      mythical: { chance: 35, multiplier: 7000000, emoji: '⚙️' },
      divine: { chance: 10, multiplier: 14000000, emoji: '🔩' }
    }
  },
  core: {
    cost: 210000,
    emoji: '🧠',
    pets: {
      mythical: { chance: 60, multiplier: 7500000, emoji: '🧬' },
      divine: { chance: 30, multiplier: 15000000, emoji: '💡' },
      celestial: { chance: 10, multiplier: 30000000, emoji: '🌟' }
    }
  },
  chip: {
    cost: 220000,
    emoji: '🔋',
    pets: {
      mythical: { chance: 55, multiplier: 8000000, emoji: '💾' },
      divine: { chance: 35, multiplier: 16000000, emoji: '🧠' },
      celestial: { chance: 10, multiplier: 32000000, emoji: '⚡' }
    }
  },
  matrix: {
    cost: 230000,
    emoji: '🧮',
    pets: {
      divine: { chance: 60, multiplier: 17000000, emoji: '🧿' },
      celestial: { chance: 30, multiplier: 34000000, emoji: '🌌' },
      cosmic: { chance: 10, multiplier: 68000000, emoji: '🌀' }
    }
  },
  ai: {
    cost: 250000,
    emoji: '🧠',
    pets: {
      divine: { chance: 55, multiplier: 18000000, emoji: '🤖' },
      celestial: { chance: 35, multiplier: 36000000, emoji: '🧬' },
      cosmic: { chance: 10, multiplier: 72000000, emoji: '♾️' }
    }
  },
  circuit: {
    cost: 150000,
    emoji: '🧩',
    pets: {
      rare: { chance: 60, multiplier: 600000, emoji: '🔌' },
      epic: { chance: 30, multiplier: 1200000, emoji: '🔋' },
      legendary: { chance: 10, multiplier: 2400000, emoji: '⚙️' }
    }
  },
  gear: {
    cost: 160000,
    emoji: '⚙️',
    pets: {
      rare: { chance: 55, multiplier: 650000, emoji: '🧲' },
      epic: { chance: 35, multiplier: 1300000, emoji: '🔧' },
      legendary: { chance: 10, multiplier: 2600000, emoji: '🛠️' }
    }
  },
  byte: {
    cost: 170000,
    emoji: '💾',
    pets: {
      epic: { chance: 60, multiplier: 1400000, emoji: '📀' },
      legendary: { chance: 30, multiplier: 2800000, emoji: '💻' },
      mythical: { chance: 10, multiplier: 5600000, emoji: '🖥️' }
    }
  },
  bot: {
    cost: 180000,
    emoji: '🤖',
    pets: {
      epic: { chance: 55, multiplier: 1500000, emoji: '🦾' },
      legendary: { chance: 35, multiplier: 3000000, emoji: '🧠' },
      mythical: { chance: 10, multiplier: 6000000, emoji: '🛸' }
    }
  },
  drone: {
    cost: 190000,
    emoji: '🛸',
    pets: {
      legendary: { chance: 60, multiplier: 3200000, emoji: '📡' },
      mythical: { chance: 30, multiplier: 6400000, emoji: '🛰️' },
      divine: { chance: 10, multiplier: 12800000, emoji: '🌐' }
    }
  },
  mech: {
    cost: 200000,
    emoji: '🦾',
    pets: {
      legendary: { chance: 55, multiplier: 3500000, emoji: '🛠️' },
      mythical: { chance: 35, multiplier: 7000000, emoji: '⚙️' },
      divine: { chance: 10, multiplier: 14000000, emoji: '🔩' }
    }
  },
  core: {
    cost: 210000,
    emoji: '🧠',
    pets: {
      mythical: { chance: 60, multiplier: 7500000, emoji: '🧬' },
      divine: { chance: 30, multiplier: 15000000, emoji: '💡' },
      celestial: { chance: 10, multiplier: 30000000, emoji: '🌟' }
    }
  },
  chip: {
    cost: 220000,
    emoji: '🔋',
    pets: {
      mythical: { chance: 55, multiplier: 8000000, emoji: '💾' },
      divine: { chance: 35, multiplier: 16000000, emoji: '🧠' },
      celestial: { chance: 10, multiplier: 32000000, emoji: '⚡' }
    }
  },
  matrix: {
    cost: 230000,
    emoji: '🧮',
    pets: {
      divine: { chance: 60, multiplier: 17000000, emoji: '🧿' },
      celestial: { chance: 30, multiplier: 34000000, emoji: '🌌' },
      cosmic: { chance: 10, multiplier: 68000000, emoji: '🌀' }
    }
  },
  ai: {
    cost: 250000,
    emoji: '🧠',
    pets: {
      divine: { chance: 55, multiplier: 18000000, emoji: '🤖' },
      celestial: { chance: 35, multiplier: 36000000, emoji: '🧬' },
      cosmic: { chance: 10, multiplier: 72000000, emoji: '♾️' }
    }
  },
  nova: {
    cost: 500000,
    emoji: '🌟',
    pets: {
      epic: { chance: 60, multiplier: 20000000, emoji: '💫' },
      legendary: { chance: 30, multiplier: 40000000, emoji: '🌠' },
      mythical: { chance: 10, multiplier: 80000000, emoji: '🌌' }
    }
  },
  starlight: {
    cost: 600000,
    emoji: '✨',
    pets: {
      epic: { chance: 55, multiplier: 22000000, emoji: '🌟' },
      legendary: { chance: 35, multiplier: 44000000, emoji: '🎇' },
      mythical: { chance: 10, multiplier: 88000000, emoji: '🌠' }
    }
  },
  nebula: {
    cost: 700000,
    emoji: '☄️',
    pets: {
      legendary: { chance: 60, multiplier: 48000000, emoji: '🪐' },
      mythical: { chance: 30, multiplier: 96000000, emoji: '🌌' },
      divine: { chance: 10, multiplier: 192000000, emoji: '🧿' }
    }
  },
  orbit: {
    cost: 800000,
    emoji: '🪐',
    pets: {
      legendary: { chance: 55, multiplier: 50000000, emoji: '🛰️' },
      mythical: { chance: 35, multiplier: 100000000, emoji: '🌌' },
      divine: { chance: 10, multiplier: 200000000, emoji: '🌠' }
    }
  },
  gravity: {
    cost: 900000,
    emoji: '🌀',
    pets: {
      mythical: { chance: 60, multiplier: 110000000, emoji: '🌌' },
      divine: { chance: 30, multiplier: 220000000, emoji: '🧲' },
      celestial: { chance: 10, multiplier: 440000000, emoji: '🌌' }
    }
  },
  eclipse_core: {
    cost: 1000000,
    emoji: '🌘',
    pets: {
      mythical: { chance: 55, multiplier: 120000000, emoji: '🌑' },
      divine: { chance: 35, multiplier: 240000000, emoji: '🌠' },
      celestial: { chance: 10, multiplier: 480000000, emoji: '🌌' }
    }
  },
  blackhole: {
    cost: 1500000,
    emoji: '🕳️',
    pets: {
      divine: { chance: 60, multiplier: 250000000, emoji: '🧿' },
      celestial: { chance: 30, multiplier: 500000000, emoji: '🌌' },
      cosmic: { chance: 10, multiplier: 1000000000, emoji: '♾️' }
    }
  },
  comet: {
    cost: 2000000,
    emoji: '☄️',
    pets: {
      divine: { chance: 55, multiplier: 300000000, emoji: '🌠' },
      celestial: { chance: 35, multiplier: 600000000, emoji: '🌌' },
      cosmic: { chance: 10, multiplier: 1200000000, emoji: '🌟' }
    }
  },
  asteroid: {
    cost: 2500000,
    emoji: '🪨',
    pets: {
      celestial: { chance: 60, multiplier: 700000000, emoji: '🪐' },
      cosmic: { chance: 30, multiplier: 1400000000, emoji: '🌌' },
      secret: { chance: 10, multiplier: 2800000000, emoji: '🎯' }
    }
  },
  galaxy: {
    cost: 3000000,
    emoji: '🌌',
    pets: {
      celestial: { chance: 55, multiplier: 800000000, emoji: '🌠' },
      cosmic: { chance: 35, multiplier: 1600000000, emoji: '🌌' },
      secret: { chance: 10, multiplier: 3200000000, emoji: '♾️' }
    }
  },
  zeus: {
    cost: 3500000,
    emoji: '⚡',
    pets: {
      divine: { chance: 60, multiplier: 900000000, emoji: '🧔' },
      celestial: { chance: 30, multiplier: 1800000000, emoji: '⚡' },
      cosmic: { chance: 10, multiplier: 3600000000, emoji: '🌩️' }
    }
  },
  thor: {
    cost: 4000000,
    emoji: '🔨',
    pets: {
      divine: { chance: 55, multiplier: 1000000000, emoji: '🧔‍♂️' },
      celestial: { chance: 35, multiplier: 2000000000, emoji: '🔨' },
      cosmic: { chance: 10, multiplier: 4000000000, emoji: '🌪️' }
    }
  },
  zeus: {
    cost: 3500000,
    emoji: '⚡',
    pets: {
      divine: { chance: 60, multiplier: 900000000, emoji: '🧔' },
      celestial: { chance: 30, multiplier: 1800000000, emoji: '⚡' },
      cosmic: { chance: 10, multiplier: 3600000000, emoji: '🌩️' }
    }
  },
  thor: {
    cost: 4000000,
    emoji: '🔨',
    pets: {
      divine: { chance: 55, multiplier: 1000000000, emoji: '🧔‍♂️' },
      celestial: { chance: 35, multiplier: 2000000000, emoji: '🔨' },
      cosmic: { chance: 10, multiplier: 4000000000, emoji: '🌪️' }
    }
  },
  anubis: {
    cost: 3500000,
    emoji: '🐕‍🦺',
    pets: {
      divine: { chance: 60, multiplier: 900000000, emoji: '🐺' },
      celestial: { chance: 30, multiplier: 1800000000, emoji: '🧞' },
      cosmic: { chance: 10, multiplier: 3600000000, emoji: '🌌' }
    }
  },
  ra: {
    cost: 4000000,
    emoji: '🌞',
    pets: {
      divine: { chance: 55, multiplier: 1000000000, emoji: '🦅' },
      celestial: { chance: 35, multiplier: 2000000000, emoji: '🔥' },
      cosmic: { chance: 10, multiplier: 4000000000, emoji: '🌠' }
    }
  },
  odin: {
    cost: 4500000,
    emoji: '🦉',
    pets: {
      divine: { chance: 50, multiplier: 1100000000, emoji: '🧙' },
      celestial: { chance: 40, multiplier: 2200000000, emoji: '🦄' },
      cosmic: { chance: 10, multiplier: 4400000000, emoji: '🌌' }
    }
  },
  hera: {
    cost: 5000000,
    emoji: '👑',
    pets: {
      divine: { chance: 45, multiplier: 1200000000, emoji: '🦢' },
      celestial: { chance: 45, multiplier: 2400000000, emoji: '🌸' },
      cosmic: { chance: 10, multiplier: 4800000000, emoji: '🌟' }
    }
  },
  poseidon: {
    cost: 5500000,
    emoji: '🌊',
    pets: {
      divine: { chance: 40, multiplier: 1300000000, emoji: '🐬' },
      celestial: { chance: 50, multiplier: 2600000000, emoji: '🧜' },
      cosmic: { chance: 10, multiplier: 5200000000, emoji: '🌌' }
    }
  },
  hades: {
    cost: 6000000,
    emoji: '💀',
    pets: {
      divine: { chance: 35, multiplier: 1400000000, emoji: '🦇' },
      celestial: { chance: 55, multiplier: 2800000000, emoji: '🕸️' },
      cosmic: { chance: 10, multiplier: 5600000000, emoji: '🌑' }
    }
  },
  titan: {
    cost: 6500000,
    emoji: '🗿',
    pets: {
      celestial: { chance: 60, multiplier: 3000000000, emoji: '🪨' },
      cosmic: { chance: 30, multiplier: 6000000000, emoji: '🌌' },
      secret: { chance: 10, multiplier: 12000000000, emoji: '🎯' }
    }
  },
  olympus: {
    cost: 7000000,
    emoji: '🏛️',
    pets: {
      celestial: { chance: 55, multiplier: 3200000000, emoji: '⚡' },
      cosmic: { chance: 35, multiplier: 6400000000, emoji: '🌠' },
      secret: { chance: 10, multiplier: 12800000000, emoji: '👑' }
    }
  },
  shadow: {
    cost: 7500000,
    emoji: '🌑',
    pets: {
      mythical: { chance: 60, multiplier: 3500000000, emoji: '👻' },
      divine: { chance: 30, multiplier: 7000000000, emoji: '🕷️' },
      secret: { chance: 10, multiplier: 14000000000, emoji: '🧟' }
    }
  },
  fang: {
    cost: 8000000,
    emoji: '🧛',
    pets: {
      mythical: { chance: 55, multiplier: 3600000000, emoji: '🦇' },
      divine: { chance: 35, multiplier: 7200000000, emoji: '🧛' },
      secret: { chance: 10, multiplier: 14400000000, emoji: '🩸' }
    }
  },
  bone: {
    cost: 8500000,
    emoji: '🦴',
    pets: {
      mythical: { chance: 50, multiplier: 3700000000, emoji: '💀' },
      divine: { chance: 40, multiplier: 7400000000, emoji: '🦴' },
      secret: { chance: 10, multiplier: 14800000000, emoji: '🧠' }
    }
  },
  blood: {
    cost: 9000000,
    emoji: '🩸',
    pets: {
      mythical: { chance: 45, multiplier: 3800000000, emoji: '🧛' },
      divine: { chance: 45, multiplier: 7600000000, emoji: '🧟' },
      secret: { chance: 10, multiplier: 15200000000, emoji: '🧬' }
    }
  },
  scream: {
    cost: 9500000,
    emoji: '😱',
    pets: {
      mythical: { chance: 40, multiplier: 3900000000, emoji: '👹' },
      divine: { chance: 50, multiplier: 7800000000, emoji: '👺' },
      secret: { chance: 10, multiplier: 15600000000, emoji: '🧞' }
    }
  },
  haunt: {
    cost: 10000000,
    emoji: '🏚️',
    pets: {
      divine: { chance: 60, multiplier: 8000000000, emoji: '👻' },
      celestial: { chance: 30, multiplier: 16000000000, emoji: '🕸️' },
      secret: { chance: 10, multiplier: 32000000000, emoji: '👁️' }
    }
  },
  crypt: {
    cost: 11000000,
    emoji: '⚰️',
    pets: {
      divine: { chance: 55, multiplier: 8500000000, emoji: '💀' },
      celestial: { chance: 35, multiplier: 17000000000, emoji: '🧟' },
      secret: { chance: 10, multiplier: 34000000000, emoji: '🧬' }
    }
  },
  banshee: {
    cost: 12000000,
    emoji: '🧞',
    pets: {
      celestial: { chance: 60, multiplier: 18000000000, emoji: '🧞' },
      cosmic: { chance: 30, multiplier: 36000000000, emoji: '🌌' },
      secret: { chance: 10, multiplier: 72000000000, emoji: '🎯' }
    }
  },
  nightmare: {
    cost: 13000000,
    emoji: '🌘',
    pets: {
      celestial: { chance: 55, multiplier: 19000000000, emoji: '🌑' },
      cosmic: { chance: 35, multiplier: 38000000000, emoji: '🌌' },
      secret: { chance: 10, multiplier: 76000000000, emoji: '👁️' }
    }
  },
  void: {
    cost: 14000000,
    emoji: '⚫',
    pets: {
      cosmic: { chance: 60, multiplier: 40000000000, emoji: '🌌' },
      secret: { chance: 40, multiplier: 80000000000, emoji: '♾️' }
    }
  },
  cloud: {
    cost: 15000000,
    emoji: '☁️',
    pets: {
      mythical: { chance: 60, multiplier: 42000000000, emoji: '🐑' },
      divine: { chance: 30, multiplier: 84000000000, emoji: '🧸' },
      secret: { chance: 10, multiplier: 168000000000, emoji: '💤' }
    }
  },
  lullaby: {
    cost: 16000000,
    emoji: '🎶',
    pets: {
      mythical: { chance: 55, multiplier: 44000000000, emoji: '🦜' },
      divine: { chance: 35, multiplier: 88000000000, emoji: '🎼' },
      secret: { chance: 10, multiplier: 176000000000, emoji: '🎵' }
    }
  },
  whisper: {
    cost: 17000000,
    emoji: '🫥',
    pets: {
      mythical: { chance: 50, multiplier: 46000000000, emoji: '🦢' },
      divine: { chance: 40, multiplier: 92000000000, emoji: '🧞' },
      secret: { chance: 10, multiplier: 184000000000, emoji: '🌫️' }
    }
  },
  shimmer: {
    cost: 18000000,
    emoji: '✨',
    pets: {
      mythical: { chance: 45, multiplier: 48000000000, emoji: '🧚' },
      divine: { chance: 45, multiplier: 96000000000, emoji: '🌟' },
      secret: { chance: 10, multiplier: 192000000000, emoji: '💫' }
    }
  },
  illusion: {
    cost: 19000000,
    emoji: '🪞',
    pets: {
      mythical: { chance: 40, multiplier: 50000000000, emoji: '🧙' },
      divine: { chance: 50, multiplier: 100000000000, emoji: '🧠' },
      secret: { chance: 10, multiplier: 200000000000, emoji: '🌀' }
    }
  },
  echo: {
    cost: 20000000,
    emoji: '🔊',
    pets: {
      divine: { chance: 60, multiplier: 105000000000, emoji: '🎤' },
      celestial: { chance: 30, multiplier: 210000000000, emoji: '🎧' },
      secret: { chance: 10, multiplier: 420000000000, emoji: '🧬' }
    }
  },
  velvet: {
    cost: 21000000,
    emoji: '🧵',
    pets: {
      divine: { chance: 55, multiplier: 110000000000, emoji: '🧸' },
      celestial: { chance: 35, multiplier: 220000000000, emoji: '🪡' },
      secret: { chance: 10, multiplier: 440000000000, emoji: '👑' }
    }
  },
  trance: {
    cost: 22000000,
    emoji: '🌀',
    pets: {
      celestial: { chance: 60, multiplier: 230000000000, emoji: '🧘' },
      cosmic: { chance: 30, multiplier: 460000000000, emoji: '🌌' },
      secret: { chance: 10, multiplier: 920000000000, emoji: '🎯' }
    }
  },
  mirage: {
    cost: 23000000,
    emoji: '🌫️',
    pets: {
      celestial: { chance: 55, multiplier: 240000000000, emoji: '🧞' },
      cosmic: { chance: 35, multiplier: 480000000000, emoji: '🌠' },
      secret: { chance: 10, multiplier: 960000000000, emoji: '♾️' }
    }
  },
  stardust: {
    cost: 24000000,
    emoji: '🌠',
    pets: {
      cosmic: { chance: 60, multiplier: 500000000000, emoji: '✨' },
      secret: { chance: 40, multiplier: 1000000000000, emoji: '🎆' }
    }
  },
  crown: {
    cost: 25000000,
    emoji: '👑',
    pets: {
      divine: { chance: 60, multiplier: 520000000000, emoji: '🦁' },
      celestial: { chance: 30, multiplier: 1040000000000, emoji: '👑' },
      secret: { chance: 10, multiplier: 2080000000000, emoji: '🏆' }
    }
  },
  jewel: {
    cost: 26000000,
    emoji: '💎',
    pets: {
      divine: { chance: 55, multiplier: 540000000000, emoji: '💍' },
      celestial: { chance: 35, multiplier: 1080000000000, emoji: '💠' },
      secret: { chance: 10, multiplier: 2160000000000, emoji: '🔱' }
    }
  },
  throne: {
    cost: 27000000,
    emoji: '🪑',
    pets: {
      divine: { chance: 50, multiplier: 560000000000, emoji: '🧝' },
      celestial: { chance: 40, multiplier: 1120000000000, emoji: '🧙' },
      secret: { chance: 10, multiplier: 2240000000000, emoji: '🧬' }
    }
  },
  scepter: {
    cost: 28000000,
    emoji: '⚜️',
    pets: {
      divine: { chance: 45, multiplier: 580000000000, emoji: '🪄' },
      celestial: { chance: 45, multiplier: 1160000000000, emoji: '🧞' },
      secret: { chance: 10, multiplier: 2320000000000, emoji: '🌟' }
    }
  },
  robe: {
    cost: 29000000,
    emoji: '👘',
    pets: {
      divine: { chance: 40, multiplier: 600000000000, emoji: '🧙' },
      celestial: { chance: 50, multiplier: 1200000000000, emoji: '🧝' },
      secret: { chance: 10, multiplier: 2400000000000, emoji: '🎭' }
    }
  },
  scroll: {
    cost: 30000000,
    emoji: '📜',
    pets: {
      celestial: { chance: 60, multiplier: 1250000000000, emoji: '📖' },
      cosmic: { chance: 30, multiplier: 2500000000000, emoji: '🧠' },
      secret: { chance: 10, multiplier: 5000000000000, emoji: '🎯' }
    }
  },
  banner: {
    cost: 31000000,
    emoji: '🎏',
    pets: {
      celestial: { chance: 55, multiplier: 1300000000000, emoji: '🦚' },
      cosmic: { chance: 35, multiplier: 2600000000000, emoji: '🧞' },
      secret: { chance: 10, multiplier: 5200000000000, emoji: '👑' }
    }
  },
  palace: {
    cost: 32000000,
    emoji: '🏰',
    pets: {
      cosmic: { chance: 60, multiplier: 2700000000000, emoji: '🦄' },
      secret: { chance: 40, multiplier: 5400000000000, emoji: '🎆' }
    }
  },
  knight: {
    cost: 33000000,
    emoji: '🛡️',
    pets: {
      cosmic: { chance: 55, multiplier: 2800000000000, emoji: '⚔️' },
      secret: { chance: 45, multiplier: 5600000000000, emoji: '🧬' }
    }
  },
  empress: {
    cost: 34000000,
    emoji: '👸',
    pets: {
      secret: { chance: 100, multiplier: 6000000000000, emoji: '👑' }
    }
  },
  origin: {
    cost: 50000000,
    emoji: '🌌',
    pets: {
      final: { chance: 60, multiplier: 7000000000000, emoji: '🌠' }
    }
  },
};

// Zone System Helper Functions
// Remove duplicate egg keys and get clean list
const EGG_KEYS = [...new Set(Object.keys(EGGS))];
const EGGS_PER_ZONE = 7;
const TOTAL_ZONES = Math.ceil(EGG_KEYS.length / EGGS_PER_ZONE);

// Generate costs and themes for all zones
function initializeZones() {
  // Generate costs using exponential progression
  for (let zone = 1; zone <= TOTAL_ZONES; zone++) {
    if (zone === 1) {
      state.zones.costs[zone] = 0; // Zone 1 is free
    } else {
      state.zones.costs[zone] = Math.floor(1000 * Math.pow(2.5, zone - 2));
    }
  }

  // Generate themes for all zones
  const baseThemes = [
    { bgGradient: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)', eggGradient: 'linear-gradient(135deg, #a5d6a7, #81c784)' }, // Green
    { bgGradient: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', eggGradient: 'linear-gradient(135deg, #ffcc80, #ffb74d)' }, // Orange  
    { bgGradient: 'linear-gradient(135deg, #ffebee, #ffcdd2)', eggGradient: 'linear-gradient(135deg, #f48fb1, #f06292)' }, // Pink
    { bgGradient: 'linear-gradient(135deg, #f3e5f5, #e1bee7)', eggGradient: 'linear-gradient(135deg, #ce93d8, #ba68c8)' }, // Purple
    { bgGradient: 'linear-gradient(135deg, #e8eaf6, #c5cae9)', eggGradient: 'linear-gradient(135deg, #9fa8da, #7986cb)' }, // Indigo
    { bgGradient: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', eggGradient: 'linear-gradient(135deg, #80cbc4, #4db6ac)' }, // Teal
    { bgGradient: 'linear-gradient(135deg, #fff8e1, #ffecb3)', eggGradient: 'linear-gradient(135deg, #ffd54f, #ffca28)' }, // Amber
    { bgGradient: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)', eggGradient: 'linear-gradient(135deg, #4fc3f7, #29b6f6)' }, // Light Blue
  ];

  for (let zone = 1; zone <= TOTAL_ZONES; zone++) {
    const themeIndex = (zone - 1) % baseThemes.length;
    state.zones.themes[zone] = { ...baseThemes[themeIndex] };
  }
}

function getEggZone(eggIndex) {
  return Math.floor(eggIndex / EGGS_PER_ZONE) + 1;
}

function getZoneForEggType(eggType) {
  const eggIndex = EGG_KEYS.indexOf(eggType);
  return eggIndex !== -1 ? getEggZone(eggIndex) : 1;
}

function isZoneUnlocked(zoneNumber) {
  return state.zones.unlocked.includes(zoneNumber);
}

function unlockZone(zoneNumber) {
  const cost = state.zones.costs[zoneNumber];
  if (cost !== undefined && state.coins >= cost && !isZoneUnlocked(zoneNumber)) {
    state.coins -= cost;
    state.zones.unlocked.push(zoneNumber);
    state.zones.unlocked.sort((a, b) => a - b);
    updateUI();
    alert(`🎉 Zone ${zoneNumber} unlocked! 🎉`);
    return true;
  } else if (cost === undefined) {
    alert(`Zone ${zoneNumber} is not available!`);
  }
  return false;
}

function getEggsForZone(zoneNumber) {
  const startIndex = (zoneNumber - 1) * EGGS_PER_ZONE;
  const endIndex = Math.min(startIndex + EGGS_PER_ZONE, EGG_KEYS.length);
  return EGG_KEYS.slice(startIndex, endIndex);
}

function getCurrentZone() {
  return Math.max(...state.zones.unlocked);
}

function applyZoneTheme() {
  // Remove global body background override to not interfere with dark mode
  // Individual zones will use their own themes in the UI
  const currentZone = getCurrentZone();
  const theme = state.zones.themes[currentZone];
  if (theme) {
    document.documentElement.style.setProperty('--zone-bg-gradient', theme.bgGradient);
    document.documentElement.style.setProperty('--zone-egg-gradient', theme.eggGradient);
    // Don't override body.style.background - let dark mode handle it
  }
}

// Function to allow users to customize zone costs and colors
function customizeZone(zoneNumber, newCost, newBgGradient, newEggGradient) {
  if (state.isAdmin) {
    if (newCost !== undefined) {
      state.zones.costs[zoneNumber] = newCost;
    }
    if (newBgGradient !== undefined) {
      state.zones.themes[zoneNumber].bgGradient = newBgGradient;
    }
    if (newEggGradient !== undefined) {
      state.zones.themes[zoneNumber].eggGradient = newEggGradient;
    }
    applyZoneTheme();
    updateUI();
    alert(`Zone ${zoneNumber} customized!`);
  } else {
    alert('Admin mode required to customize zones! (Ctrl+Shift+A)');
  }
}

const CLICK_COINS = 1;

// Format numbers with metric prefixes
function formatNumber(num) {
  if (num === Infinity) return '∞';
  if (num < 1000) return Math.floor(num).toString();

  const units = [
    { threshold: 1e63, suffix: 'Vigintillion' },
    { threshold: 1e60, suffix: 'Novemdecillion' },
    { threshold: 1e57, suffix: 'Octodecillion' },
    { threshold: 1e54, suffix: 'Septendecillion' },
    { threshold: 1e51, suffix: 'Sexdecillion' },
    { threshold: 1e48, suffix: 'Quindecillion' },
    { threshold: 1e45, suffix: 'Quattuordecillion' },
    { threshold: 1e42, suffix: 'Tredecillion' },
    { threshold: 1e39, suffix: 'Duodecillion' },
    { threshold: 1e36, suffix: 'Undecillion' },
    { threshold: 1e33, suffix: 'Decillion' },
    { threshold: 1e30, suffix: 'Nonillion' },
    { threshold: 1e27, suffix: 'Octillion' },
    { threshold: 1e24, suffix: 'Septillion' },
    { threshold: 1e21, suffix: 'Sextillion' },
    { threshold: 1e18, suffix: 'Quintillion' },
    { threshold: 1e15, suffix: 'Quadrillion' },
    { threshold: 1e12, suffix: 'T' },
    { threshold: 1e9, suffix: 'B' },
    { threshold: 1e6, suffix: 'M' },
    { threshold: 1e3, suffix: 'K' }
  ];

  for (let unit of units) {
    if (num >= unit.threshold) {
      const value = num / unit.threshold;
      return (value < 10 ? value.toFixed(2) : value < 100 ? value.toFixed(1) : Math.floor(value)) + unit.suffix;
    }
  }

  return Math.floor(num).toString();
}

const SHOP_ITEMS = {
  coinBooster: { name: 'Coin Booster', baseCost: 1000, effect: 'x2 coins for 5 minutes', multiplier: 2 },
  luckyCharm: { name: 'Lucky Charm', baseCost: 5000, effect: '+10% rare pet chance for 10 minutes', duration: 600000 },
  goldRush: { name: 'Gold Rush', baseCost: 10000, effect: 'x5 coins for 2 minutes', multiplier: 5 },
  timeWarp: { name: 'Time Warp', baseCost: 25000, effect: 'Instant hatch all eggs', instant: true },
  magicWand: { name: 'Magic Wand', baseCost: 100000, effect: 'Guarantee next egg is legendary+', guarantee: true }
};

const QUESTS = [
  { id: 'first_pet', name: 'Get Started', description: 'Hatch your first pet', reward: 500, condition: () => state.pets.length >= 1 },
  { id: 'coin_saver', name: 'Coin Saver', description: 'Save 10,000 coins', reward: 2000, condition: () => state.coins >= 10000 },
  { id: 'pet_collector', name: 'Pet Collector', description: 'Own 20 pets', reward: 5000, condition: () => state.pets.length >= 20 },
  { id: 'rare_hunter', name: 'Rare Hunter', description: 'Find 5 rare+ pets', reward: 10000, condition: () => state.pets.filter(p => ['rare', 'epic', 'legendary', 'mythical'].includes(p.type)).length >= 5 },
  { id: 'evolution_expert', name: 'Evolution Expert', description: 'Evolve a pet to level 5', reward: 15000, condition: () => state.pets.some(p => p.level >= 5) },
  { id: 'battle_champion', name: 'Battle Champion', description: 'Win 10 pet battles', reward: 25000, condition: () => state.petBattles.wins >= 10 },
  { id: 'gardener', name: 'Gardener', description: 'Plant 5 seeds in the garden', reward: 8000, condition: () => state.garden.plots.filter(p => p.planted).length >= 5 },
  { id: 'researcher', name: 'Researcher', description: 'Unlock 3 research upgrades', reward: 20000, condition: () => state.research.unlocked.length >= 3 },
  { id: 'gambler', name: 'Gambler', description: 'Win 1000 chips at the casino', reward: 50000, condition: () => state.casino.chips >= 1100 },
  { id: 'prestige_master', name: 'Prestige Master', description: 'Reach prestige level 3', reward: 100000, condition: () => state.prestige >= 3 }
];

const RESEARCH_TREE = {
  fastHatch: { name: 'Fast Hatching', cost: 10, effect: 'Eggs hatch 50% faster', unlocked: false },
  bonusCoins: { name: 'Bonus Coins', cost: 15, effect: '+25% coin generation', unlocked: false },
  rarityBoost: { name: 'Rarity Boost', cost: 20, effect: '+5% chance for better pets', unlocked: false },
  autoCollect: { name: 'Auto Collect', cost: 25, effect: 'Automatically collect idle coins', unlocked: false },
  megaMultiplier: { name: 'Mega Multiplier', cost: 50, effect: 'x3 pet multipliers', unlocked: false },
  quantumHatch: { name: 'Quantum Hatch', cost: 100, effect: 'Chance to hatch multiple pets from one egg', unlocked: false }
};

function addCoins(amount) {
  state.coins += amount * state.coinMultiplier;
  updateUI();
}

function createEgg(eggType, quantity = 1) {
  const egg = EGGS[eggType];
  const eggZone = getZoneForEggType(eggType);

  // Check if zone is unlocked
  if (!isZoneUnlocked(eggZone)) {
    alert(`🔒 Zone ${eggZone} is locked! You need ${formatNumber(state.zones.costs[eggZone])} coins to unlock it.`);
    return;
  }

  const totalCost = egg.cost * quantity;
  if (state.eggs.length + quantity <= state.hatchCapacity && state.coins >= totalCost) {
    state.coins -= totalCost;

    for (let i = 0; i < quantity; i++) {
      const eggDiv = document.createElement('div');
      eggDiv.className = 'egg animating';
      eggDiv.textContent = egg.emoji;
      eggDiv.style.background = state.zones.themes[eggZone].eggGradient;
      document.getElementById('eggsContainer').appendChild(eggDiv);

      setTimeout(() => {
        state.eggs.push({ type: eggType });
        hatchEgg(state.eggs.length - 1);
        updateUI();
      }, 2000);
    }
  }
}

function hatchEgg(index) {
  const eggType = state.eggs[index].type;
  const pets = EGGS[eggType].pets;
  const random = Math.random() * 100;
  let total = 0;
  let selectedPet = null;

  for (const [rarity, pet] of Object.entries(pets)) {
    total += pet.chance;
    if (random <= total && !selectedPet) {
      selectedPet = { type: rarity, ...pet };
    }
  }

  state.pets.push({
    id: Date.now() + Math.random(),
    type: selectedPet.type,
    multiplier: selectedPet.multiplier,
    emoji: selectedPet.emoji,
    level: 1,
    experience: 0,
    power: Math.floor(selectedPet.multiplier * 10),
    ability: getRandomAbility(selectedPet.type)
  });

  state.eggs.splice(index, 1);
  updateUI();
  checkQuests();
}

function getRandomAbility(rarity) {
  const abilities = {
    common: ['Coin Boost', 'Quick Hatch'],
    uncommon: ['Coin Boost', 'Quick Hatch', 'Lucky Find'],
    rare: ['Lucky Find', 'Double Coins', 'Auto Clicker'],
    epic: ['Double Coins', 'Auto Clicker', 'Mega Multiplier'],
    legendary: ['Mega Multiplier', 'Time Warp', 'Gold Rush'],
    mythical: ['Time Warp', 'Gold Rush', 'Reality Bend'],
    divine: ['Reality Bend', 'Infinity Loop', 'Cosmic Power'],
    celestial: ['Cosmic Power', 'Universal Force', 'Transcendent'],
    cosmic: ['Universal Force', 'Transcendent', 'Omnipotent'],
    infinity: ['Omnipotent', 'Beyond Reality', 'Ultimate Power'],
    omega: ['Ultimate Power', 'God Mode', 'Absolute Control'],
    supreme: ['God Mode', 'Absolute Control', 'Reality Warp'],
    ultimate: ['Reality Warp', 'Dimension Break', 'Time Control'],
    transcendent: ['Time Control', 'Space Manipulation', 'Existence Alter'],
    ethereal: ['Existence Alter', 'Universal Rewrite', 'Concept Destroy'],
    spectral: ['Concept Destroy', 'Logic Override', 'Truth Bend'],
    primordial: ['Truth Bend', 'Causality Break', 'Fate Control'],
    ancient: ['Fate Control', 'History Rewrite', 'Memory Alter'],
    final: ['Memory Alter', 'Ultimate Creation', 'Reality Master'],
    secret: ['The End', 'Beyond End', 'Secret Power']
  };

  const petAbilities = abilities[rarity] || abilities.common;
  return petAbilities[Math.floor(Math.random() * petAbilities.length)];
}

function evolvePet(petId) {
  const pet = state.pets.find(p => p.id == petId);
  if (!pet) return;

  const evolutionCost = pet.level * 1000;
  if (state.coins >= evolutionCost && pet.level < 20) {
    state.coins -= evolutionCost;
    pet.level++;
    pet.multiplier = Math.floor(pet.multiplier * 1.2);
    pet.power = Math.floor(pet.power * 1.3);

    if (Math.random() < 0.3) {
      pet.ability = getRandomAbility(pet.type);
    }

    alert(`${pet.emoji} evolved to level ${pet.level}! Power: ${pet.power}`);
    updateUI();
    checkQuests();
  } else if (pet.level >= 20) {
    alert('This pet is already at maximum level!');
  } else {
    alert(`Need ${formatNumber(evolutionCost)} coins to evolve this pet!`);
  }
}

function activateAbility(petId) {
  const pet = state.pets.find(p => p.id == petId);
  if (!pet) return;

  const abilityCost = pet.level+pet.multiplier * 500;
  if (state.coins >= abilityCost) {
    state.coins -= abilityCost;

    switch (pet.ability) {
      case 'Coin Boost':
        addCoins(pet.multiplier * 50);
        break;
      case 'Quick Hatch':
        if (state.eggs.length > 0) {
          hatchEgg(0);
        }
        break;
      case 'Lucky Find':
        addCoins(Math.floor(Math.random() * pet.multiplier * 500));
        break;
      case 'Double Coins':
        const currentCoins = state.coins;
        addCoins(currentCoins);
        break;
      case 'Auto Clicker':
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            const totalMultiplier = state.pets.reduce((sum, p) => sum + p.multiplier, 1);
            addCoins(CLICK_COINS * totalMultiplier);
          }, i * 100);
        }
        break;
      default:
        addCoins(pet.multiplier * pet.level * 50);
    }

    alert(`${pet.emoji} used ${pet.ability}!`);
    updateUI();
  } else {
    alert(`Need ${formatNumber(abilityCost)} coins to use this ability!`);
  }
}

function battlePet(petId) {
  const pet = state.pets.find(p => p.id == petId);
  if (!pet) return;

  if (!state.petBattles.currentOpponent) {
    // Generate random opponent
    const opponentPower = Math.floor(Math.random() * pet.power * 2) + 50;
    state.petBattles.currentOpponent = {
      emoji: ['🐺', '🐻', '🦁', '🐯', '🦈', '🐙', '🦅', '🐉'][Math.floor(Math.random() * 8)],
      power: opponentPower,
      name: 'Wild Beast'
    };
  }

  const battleResult = pet.power > state.petBattles.currentOpponent.power;

  if (battleResult) {
    const reward = Math.floor(state.petBattles.currentOpponent.power * 10);
    addCoins(reward);
    state.petBattles.wins++;
    pet.experience += 50;
    alert(`${pet.emoji} won the battle! Reward: ${formatNumber(reward)} coins! +50 EXP`);
  } else {
    state.petBattles.losses++;
    alert(`${pet.emoji} lost the battle! Better luck next time!`);
  }

  state.petBattles.currentOpponent = null;
  updateUI();
  checkQuests();
}

function buyShopItem(itemKey) {
  const item = SHOP_ITEMS[itemKey];
  const cost = item.baseCost * Math.pow(2, state.shop[itemKey]);

  if (state.coins >= cost) {
    state.coins -= cost;
    state.shop[itemKey]++;

    if (item.multiplier) {
      const oldMultiplier = state.coinMultiplier;
      state.coinMultiplier *= item.multiplier;
      setTimeout(() => {
        state.coinMultiplier = oldMultiplier;
        alert('Effect expired!');
      }, 300000); // 5 minutes
    }

    if (item.instant) {
      // Hatch all eggs instantly
      while (state.eggs.length > 0) {
        hatchEgg(0);
      }
    }

    alert(`Bought ${item.name}! Effect: ${item.effect}`);
    updateUI();
  } else {
    alert(`Need ${formatNumber(cost)} coins for ${item.name}!`);
  }
}

function plantSeed(plotIndex) {
  if (state.garden.plots[plotIndex] && !state.garden.plots[plotIndex].planted) {
    const seedCost = 1000;
    if (state.coins >= seedCost) {
      state.coins -= seedCost;
      state.garden.plots[plotIndex] = {
        planted: true,
        seedType: 'coin_tree',
        plantTime: Date.now(),
        growthTime: 3 // 5 minutes
      };
      alert('Seed planted! It will grow in 5 minutes.');
      updateUI();
      checkQuests();
    } else {
      alert('Need 1000 coins to plant a seed!');
    }
  }
}

function harvestPlot(plotIndex) {
  const plot = state.garden.plots[plotIndex];
  if (plot && plot.planted && Date.now() - plot.plantTime >= plot.growthTime) {
    const reward = Math.floor(Math.random() * 5000) + 2000;
    addCoins(reward);
    state.garden.plots[plotIndex] = { planted: false };
    alert(`Harvested! Reward: ${formatNumber(reward)} coins!`);
    updateUI();
  }
}

function unlockResearch(researchKey) {
  const research = RESEARCH_TREE[researchKey];
  if (state.research.points >= research.cost && !state.research.unlocked.includes(researchKey)) {
    state.research.points -= research.cost;
    state.research.unlocked.push(researchKey);

    // Apply research effects
    switch (researchKey) {
      case 'bonusCoins':
        state.coinMultiplier *= 1.25;
        break;
      case 'megaMultiplier':
        state.pets.forEach(pet => pet.multiplier *= 3);
        break;
    }

    alert(`Unlocked ${research.name}! Effect: ${research.effect}`);
    updateUI();
    checkQuests();
  } else {
    alert(`Need ${research.cost} research points!`);
  }
}

function spinCasino() {
  const cost = 50;
  if (state.casino.chips >= cost) {
    state.casino.chips -= cost;
    const result = Math.random();

    if (result < 0.4) { // 40% chance - small win
      const winnings = Math.floor(Math.random() * 50) + 25;
      state.casino.chips += winnings;
      alert(`🎰 Small win! +${winnings} chips!`);
    } else if (result < 0.7) { // 30% chance - nothing
      alert('🎰 No luck this time!');
    } else if (result < 0.9) { // 20% chance - medium win
      const winnings = Math.floor(Math.random() * 200) + 100;
      state.casino.chips += winnings;
      alert(`🎰 Nice win! +${winnings} chips!`);
    } else if (result < 0.99) { // 9% chance - big win
      const winnings = Math.floor(Math.random() * 500) + 300;
      state.casino.chips += winnings;
      alert(`🎰 Big win! +${winnings} chips!`);
    } else { // 1% chance - jackpot
      const winnings = Math.floor(Math.random() * 2000) + 1000;
      state.casino.chips += winnings;
      alert(`🎰 JACKPOT! +${winnings} chips!`);
    }

    updateUI();
    checkQuests();
  } else {
    alert('Need 50 chips to spin!');
  }
}

function convertChipsToCoins() {
  if (state.casino.chips >= 100) {
    const coins = state.casino.chips * 100;
    addCoins(coins);
    state.casino.chips = 0;
    alert(`Converted ${state.casino.chips} chips to ${formatNumber(coins)} coins!`);
    updateUI();
  } else {
    alert('Need at least 100 chips to convert!');
  }
}

function checkQuests() {
  QUESTS.forEach(quest => {
    if (!state.questsCompleted.includes(quest.id) && quest.condition()) {
      state.questsCompleted.push(quest.id);
      addCoins(quest.reward);
      state.research.points += 5;
      alert(`🎯 Quest Complete: ${quest.name}! Reward: ${formatNumber(quest.reward)} coins + 5 research points!`);
    }
  });
}

// Initialize garden plots
if (state.garden.plots.length === 0) {
  for (let i = 0; i < 6; i++) {
    state.garden.plots.push({ planted: false });
  }
}

function startMiniGame() {
  if (state.miniGameActive) return;

  const games = ['clickChallenge', 'memoryGame', 'mathQuiz', 'reactionTest'];
  const selectedGame = games[Math.floor(Math.random() * games.length)];

  switch (selectedGame) {
    case 'clickChallenge':
      startClickChallenge();
      break;
    case 'memoryGame':
      startMemoryGame();
      break;
    case 'mathQuiz':
      startMathQuiz();
      break;
    case 'reactionTest':
      startReactionTest();
      break;
  }
}

function startClickChallenge() {
  state.miniGameActive = true;
  state.miniGameClicks = 0;
  state.miniGameTarget = Math.floor(Math.random() * 20) + 10;
  state.miniGameTimer = 10;

  const gameDiv = document.createElement('div');
  gameDiv.id = 'miniGame';
  gameDiv.innerHTML = `
    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: var(--container-bg); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px var(--shadow-color);
                text-align: center; z-index: 10000; color: var(--text-color);">
      <h2>🎯 Click Challenge!</h2>
      <p>Click exactly <span id="target">${state.miniGameTarget}</span> times!</p>
      <p>Clicks: <span id="clicks">0</span></p>
      <p>Time: <span id="timer">${state.miniGameTimer}</span>s</p>
      <button id="clickButton" style="padding: 20px; font-size: 20px;">🎮 CLICK ME!</button>
      <button onclick="endMiniGame(false)" style="margin-left: 10px;">❌ Give Up</button>
    </div>
  `;

  document.body.appendChild(gameDiv);

  document.getElementById('clickButton').onclick = () => {
    state.miniGameClicks++;
    document.getElementById('clicks').textContent = state.miniGameClicks;

    if (state.miniGameClicks === state.miniGameTarget) {
      endMiniGame(true);
    } else if (state.miniGameClicks > state.miniGameTarget) {
      endMiniGame(false);
    }
  };

  const timer = setInterval(() => {
    state.miniGameTimer--;
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      timerElement.textContent = state.miniGameTimer;
    }

    if (state.miniGameTimer <= 0) {
      clearInterval(timer);
      endMiniGame(false);
    }
  }, 1000);
}

function startMemoryGame() {
  state.miniGameActive = true;
  const sequence = [];
  const colors = ['🔴', '🟡', '🟢', '🔵'];

  for (let i = 0; i < 5; i++) {
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  const gameDiv = document.createElement('div');
  gameDiv.id = 'miniGame';
  gameDiv.innerHTML = `
    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: var(--container-bg); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px var(--shadow-color);
                text-align: center; z-index: 10000; color: var(--text-color);">
      <h2>🧠 Memory Game!</h2>
      <p>Remember this sequence:</p>
      <div id="sequence" style="font-size: 30px; margin: 20px;">${sequence.join(' ')}</div>
      <div id="input" style="display: none;">
        <p>Click the colors in order:</p>
        <div>
          ${colors.map(color => `<button onclick="selectColor('${color}')" style="font-size: 30px; margin: 5px;">${color}</button>`).join('')}
        </div>
        <p>Selected: <span id="selected"></span></p>
      </div>
      <button onclick="endMiniGame(false)">❌ Give Up</button>
    </div>
  `;

  document.body.appendChild(gameDiv);

  let userSequence = [];

  window.selectColor = (color) => {
    userSequence.push(color);
    document.getElementById('selected').textContent = userSequence.join(' ');

    if (userSequence.length === sequence.length) {
      const correct = userSequence.every((color, index) => color === sequence[index]);
      endMiniGame(correct);
    }
  };

  setTimeout(() => {
    document.getElementById('sequence').style.display = 'none';
    document.getElementById('input').style.display = 'block';
  }, 3000);
}

function startMathQuiz() {
  state.miniGameActive = true;
  const a = Math.floor(Math.random() * 50) + 1;
  const b = Math.floor(Math.random() * 50) + 1;
  const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
  let answer;

  switch (operation) {
    case '+': answer = a + b; break;
    case '-': answer = a - b; break;
    case '*': answer = a * b; break;
  }

  const gameDiv = document.createElement('div');
  gameDiv.id = 'miniGame';
  gameDiv.innerHTML = `
    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: var(--container-bg); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px var(--shadow-color);
                text-align: center; z-index: 10000; color: var(--text-color);">
      <h2>🧮 Math Quiz!</h2>
      <p style="font-size: 30px; margin: 20px;">${a} ${operation} ${b} = ?</p>
      <input type="number" id="mathAnswer" style="font-size: 20px; padding: 10px; width: 100px;">
      <br><br>
      <button onclick="checkMathAnswer(${answer})">✅ Submit</button>
      <button onclick="endMiniGame(false)">❌ Give Up</button>
    </div>
  `;

  document.body.appendChild(gameDiv);

  window.checkMathAnswer = (correctAnswer) => {
    const userAnswer = parseInt(document.getElementById('mathAnswer').value);
    endMiniGame(userAnswer === correctAnswer);
  };
}

function startReactionTest() {
  state.miniGameActive = true;

  const gameDiv = document.createElement('div');
  gameDiv.id = 'miniGame';
  gameDiv.innerHTML = `
    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: var(--container-bg); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px var(--shadow-color);
                text-align: center; z-index: 10000; color: var(--text-color);">
      <h2>⚡ Reaction Test!</h2>
      <p>Wait for the green signal, then click as fast as you can!</p>
      <div id="reactionSignal" style="width: 200px; height: 200px; background: red; margin: 20px auto; border-radius: 50%; cursor: pointer;"></div>
      <button onclick="endMiniGame(false)">❌ Give Up</button>
    </div>
  `;

  document.body.appendChild(gameDiv);

  const signal = document.getElementById('reactionSignal');
  let startTime;
  let clicked = false;

  setTimeout(() => {
    signal.style.background = 'green';
    startTime = Date.now();

    signal.onclick = () => {
      if (!clicked) {
        clicked = true;
        const reactionTime = Date.now() - startTime;
        endMiniGame(reactionTime < 1000); // Win if reaction under 1 second
      }
    };
  }, Math.random() * 3000 + 2000); // Wait 2-5 seconds
}

function endMiniGame(won) {
  state.miniGameActive = false;
  const gameDiv = document.getElementById('miniGame');
  if (gameDiv) {
    gameDiv.remove();
  }

  if (won) {
    const reward = Math.floor(Math.random() * 1000) + 1000;
    const researchPoints = Math.floor(Math.random() * 5) + 2;
    addCoins(reward);
    state.research.points += researchPoints;
    alert(`🎉 You won! Reward: ${formatNumber(reward)} coins + ${researchPoints} research points!`);
  } else {
    alert('😢 Game over! Better luck next time!');
  }

  updateUI();
}

function upgradeCapacity() {
  const cost = state.hatchCapacity * 100;
  if (state.coins >= cost) {
    state.coins -= cost;
    state.hatchCapacity++;
    updateUI();
  }
}

function updateUI() {
  checkAchievements();
  checkQuests();

  document.getElementById('coins').textContent = state.isAdmin ? '∞' : formatNumber(state.coins);
  document.getElementById('hatchCapacity').textContent = state.isAdmin ? '∞' : state.hatchCapacity;

  const eggsContainer = document.getElementById('eggsContainer');
  eggsContainer.innerHTML = '';

  // Display currently hatching eggs
  state.eggs.forEach((egg, index) => {
    const eggDiv = document.createElement('div');
    eggDiv.className = 'egg';
    eggDiv.textContent = `🥚\n${egg.clicks}/${egg.required}`;
    eggDiv.onclick = () => clickEgg(index);
    eggsContainer.appendChild(eggDiv);
  });

  // Display zones with eggs
  if (state.eggs.length < state.hatchCapacity) {
    const totalZones = Math.ceil(EGG_KEYS.length / EGGS_PER_ZONE);

    for (let zone = 1; zone <= totalZones; zone++) {
      // Create zone container
      const zoneContainer = document.createElement('div');
      zoneContainer.className = 'zone-container';
      zoneContainer.style.marginBottom = '20px';
      zoneContainer.style.padding = '15px';
      zoneContainer.style.borderRadius = '10px';
      zoneContainer.style.border = '2px solid #ddd';

      const isUnlocked = isZoneUnlocked(zone);

      const zoneTheme = state.zones.themes[zone];
      if (isUnlocked && zoneTheme) {
        zoneContainer.style.background = zoneTheme.bgGradient;
        zoneContainer.style.opacity = '1';
      } else {
        zoneContainer.style.background = 'linear-gradient(135deg, #f5f5f5, #e0e0e0)';
        zoneContainer.style.opacity = '0.6';
      }

      // Zone header
      const zoneHeader = document.createElement('div');
      zoneHeader.className = 'zone-header';
      zoneHeader.style.textAlign = 'center';
      zoneHeader.style.marginBottom = '10px';
      zoneHeader.style.fontWeight = 'bold';
      zoneHeader.style.fontSize = '18px';

      if (isUnlocked) {
        zoneHeader.innerHTML = `🌟 Zone ${zone} - Unlocked 🌟`;
        zoneHeader.style.color = '#4CAF50';
      } else {
        const cost = state.zones.costs[zone];
        zoneHeader.innerHTML = `🔒 Zone ${zone} - Locked<br>Cost: ${formatNumber(cost)} coins`;
        zoneHeader.style.color = '#f44336';

        // Add unlock button
        const unlockButton = document.createElement('button');
        unlockButton.textContent = `🔓 Unlock Zone ${zone}`;
        unlockButton.style.marginTop = '10px';
        unlockButton.style.padding = '10px 20px';
        unlockButton.style.fontSize = '16px';
        unlockButton.style.backgroundColor = '#2196F3';
        unlockButton.style.color = 'white';
        unlockButton.style.border = 'none';
        unlockButton.style.borderRadius = '5px';
        unlockButton.style.cursor = 'pointer';

        if (state.coins >= cost) {
          unlockButton.style.backgroundColor = '#4CAF50';
          unlockButton.onclick = () => unlockZone(zone);
        } else {
          unlockButton.style.backgroundColor = '#ccc';
          unlockButton.style.cursor = 'not-allowed';
          unlockButton.onclick = () => alert(`Need ${formatNumber(cost - state.coins)} more coins!`);
        }

        zoneHeader.appendChild(unlockButton);
      }

      zoneContainer.appendChild(zoneHeader);

      // Zone eggs
      const zoneEggs = document.createElement('div');
      zoneEggs.className = 'zone-eggs';
      zoneEggs.style.display = 'flex';
      zoneEggs.style.flexWrap = 'wrap';
      zoneEggs.style.gap = '10px';
      zoneEggs.style.justifyContent = 'center';

      const eggsInZone = getEggsForZone(zone);

      eggsInZone.forEach(eggType => {
        const egg = EGGS[eggType];
        const newEggButton = document.createElement('div');
        newEggButton.className = 'egg';
        newEggButton.textContent = `${egg.emoji}\n${formatNumber(egg.cost)} 💰`;
        newEggButton.style.userSelect = 'none';

        if (isUnlocked && zoneTheme) {
          newEggButton.style.background = zoneTheme.eggGradient;
          newEggButton.style.cursor = 'pointer';
        } else {
          newEggButton.style.background = 'linear-gradient(135deg, #ccc, #999)';
          newEggButton.style.cursor = 'not-allowed';
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        let tooltipText = `${eggType.charAt(0).toUpperCase() + eggType.slice(1)} Egg\n\nPossible pets:\n`;
        for (const [rarity, pet] of Object.entries(egg.pets)) {
          tooltipText += `${pet.emoji} ${rarity}: ${pet.chance}% (x${pet.multiplier})\n`;
        }
        tooltip.textContent = tooltipText;

        if (isUnlocked) {
          newEggButton.onclick = () => {
            const quantity = parseInt(prompt("How many eggs would you like to hatch?", "1"));
            if (!isNaN(quantity) && quantity > 0) {
              const totalCost = egg.cost * quantity;
              if (state.coins >= totalCost && state.eggs.length + quantity <= state.hatchCapacity) {
                createEgg(eggType, quantity);
              } else {
                if (state.coins < totalCost) {
                  alert("Not enough coins!");
                } else {
                  alert("Not enough hatching capacity!");
                }
              }
            }
          };
        } else {
          newEggButton.onclick = () => alert(`🔒 Zone ${zone} is locked!`);
        }

        newEggButton.appendChild(tooltip);
        zoneEggs.appendChild(newEggButton);
      });

      zoneContainer.appendChild(zoneEggs);
      eggsContainer.appendChild(zoneContainer);
    }
  }

  const petsInventory = document.getElementById('petsInventory');
  petsInventory.innerHTML = '';

  state.pets.forEach(pet => {
    const petDiv = document.createElement('div');
    petDiv.className = `pet ${pet.type}`;
    petDiv.style.cssText = `
      margin: 10px; padding: 15px; border-radius: 10px;
      border: 2px solid #ddd; position: relative;
    `;

    petDiv.innerHTML = `
      <div style="font-size: 20px; margin-bottom: 5px;">
        ${pet.emoji} Level ${pet.level} (Power: ${pet.power})
      </div>
      <div style="font-size: 12px; margin-bottom: 10px;">
        Multiplier: x${pet.multiplier} | EXP: ${pet.experience}<br>
        Ability: ${pet.ability} | Type: ${pet.type}
      </div>
      <button onclick="evolvePet('${pet.id}')" style="margin: 2px; padding: 5px; font-size: 10px;">
        🔄 Evolve (${formatNumber(pet.level * 1000)} coins)
      </button>
      <button onclick="activateAbility('${pet.id}')" style="margin: 2px; padding: 5px; font-size: 10px;">
        ⚡ Use Ability (${formatNumber(pet.level * 500)} coins)
      </button>
      <button onclick="battlePet('${pet.id}')" style="margin: 2px; padding: 5px; font-size: 10px;">
        ⚔️ Battle (Power: ${pet.power})
      </button>
    `;

    petsInventory.appendChild(petDiv);
  });

  document.getElementById('upgradeCapacity').textContent =
    `Upgrade Capacity (${formatNumber(state.hatchCapacity * 100)} coins)`;

  const prestigeInfo = document.getElementById('prestigeInfo');
  if (prestigeInfo) {
    prestigeInfo.innerHTML = `
      Prestige: ${state.prestige} | Research Points: ${state.research.points} | 
      Coin Multiplier: x${state.coinMultiplier.toFixed(1)} |
      Auto-hatcher: Level ${state.autoHatcherLevel} |
      Daily Streak: ${state.dailyRewardStreak} | Casino Chips: ${state.casino.chips}
    `;
  }

  const achievementsList = document.getElementById('achievementsList');
  if (achievementsList) {
    achievementsList.innerHTML = `
      Achievements: ${state.achievements.length}/${ACHIEVEMENTS.length} | 
      Quests: ${state.questsCompleted.length}/${QUESTS.length} | 
      Battle Record: ${state.petBattles.wins}W-${state.petBattles.losses}L
    `;
  }
}

const ACHIEVEMENTS = [
  { id: 'first_hatch', name: 'First Hatch', description: 'Hatch your first egg', reward: 100, condition: () => state.pets.length >= 1 },
  { id: 'coin_collector', name: 'Coin Collector', description: 'Collect 10,000 coins', reward: 500, condition: () => state.coins >= 10000 },
  { id: 'pet_hoarder', name: 'Pet Hoarder', description: 'Own 50 pets', reward: 1000, condition: () => state.pets.length >= 50 },
  { id: 'legendary_finder', name: 'Legendary Finder', description: 'Find a legendary pet', reward: 2000, condition: () => state.pets.some(p => p.type === 'legendary') },
  { id: 'millionaire', name: 'Millionaire', description: 'Have 1 million coins', reward: 5000, condition: () => state.coins >= 1000000 },
  { id: 'secret_hunter', name: 'Secret Hunter', description: 'Find a secret rarity pet', reward: 10000, condition: () => state.pets.some(p => p.type === 'secret') },
  { id: 'evolution_master', name: 'Evolution Master', description: 'Evolve a pet to max level', reward: 3000, condition: () => state.pets.some(p => p.level >= 20) },
  { id: 'prestige_lord', name: 'Prestige Lord', description: 'Prestige for the first time', reward: 20000, condition: () => state.prestige >= 1 },
  { id: 'auto_master', name: 'Automation Master', description: 'Buy auto-hatcher', reward: 15000, condition: () => state.autoHatcher },
  { id: 'dedication', name: 'Dedication', description: 'Play for 7 days straight', reward: 25000, condition: () => state.dailyRewardStreak >= 7 },
  { id: 'battle_winner', name: 'Battle Winner', description: 'Win 25 pet battles', reward: 30000, condition: () => state.petBattles.wins >= 25 },
  { id: 'researcher', name: 'Researcher', description: 'Unlock all research', reward: 50000, condition: () => state.research.unlocked.length >= Object.keys(RESEARCH_TREE).length },
  { id: 'gardener', name: 'Master Gardener', description: 'Harvest 20 plants', reward: 35000, condition: () => state.garden.plots.filter(p => !p.planted).length >= 20 },
  { id: 'gambler', name: 'High Roller', description: 'Win 5000 casino chips', reward: 75000, condition: () => state.casino.chips >= 5000 }
];

function checkAchievements() {
  ACHIEVEMENTS.forEach(achievement => {
    if (!state.achievements.includes(achievement.id) && achievement.condition()) {
      state.achievements.push(achievement.id);
      addCoins(achievement.reward);
      alert(`🏆 Achievement Unlocked: ${achievement.name}! Reward: ${formatNumber(achievement.reward)} coins!`);
    }
  });
}

function prestige() {
  if (state.coins >= 1000000000) {
    const prestigeReward = Math.floor(state.coins / 1000000000);
    state.prestigePoints += prestigeReward;
    state.prestige++;
    state.coins = 0;
    state.pets = [];
    state.eggs = [];
    state.hatchCapacity = 1;
    state.coinMultiplier += prestigeReward * 0.1;
    alert(`🌟 Prestige ${state.prestige}! Gained ${formatNumber(prestigeReward)} prestige points! Coin multiplier: x${state.coinMultiplier.toFixed(1)}`);
    updateUI();
  } else {
    alert('Need at least 1 billion coins to prestige!');
  }
}

function buyAutoHatcher() {
  const cost = Math.pow(10, state.autoHatcherLevel + 8);
  if (state.coins >= cost) {
    state.coins -= cost;
    state.autoHatcherLevel++;
    state.autoHatcher = true;
    alert(`🤖 Auto-hatcher upgraded to level ${state.autoHatcherLevel}!`);
    updateUI();
  } else {
    alert(`Need ${formatNumber(cost)} coins for auto-hatcher upgrade!`);
  }
}

function claimDailyReward() {
  const now = Date.now();
  const daysSinceReward = Math.floor((now - state.lastRewardTime) / (24 * 60 * 60 * 1000));

  if (daysSinceReward >= 1) {
    if (daysSinceReward === 1) {
      state.dailyRewardStreak++;
    } else {
      state.dailyRewardStreak = 1;
    }

    const reward = 1000 * state.dailyRewardStreak * (1 + state.prestige);
    addCoins(reward);
    state.lastRewardTime = now;
    alert(`🎁 Daily reward claimed! Day ${state.dailyRewardStreak}: ${formatNumber(reward)} coins!`);
    updateUI();
  } else {
    alert('Daily reward already claimed today!');
  }
}

function calculateOfflineEarnings() {
  const now = Date.now();
  const hoursOffline = Math.floor((now - state.lastSaveTime) / (60 * 60 * 1000));

  if (hoursOffline > 0 && state.autoHatcher) {
    const earnings = hoursOffline * state.autoHatcherLevel * 100 * state.coinMultiplier;
    state.offlineEarnings = Math.min(earnings, state.coins * 24);

    if (state.offlineEarnings > 0) {
      const claim = confirm(`Welcome back! You were offline for ${hoursOffline} hours and earned ${formatNumber(Math.floor(state.offlineEarnings))} coins from auto-hatcher. Claim them?`);
      if (claim) {
        addCoins(state.offlineEarnings);
      }
    }
  }

  state.lastSaveTime = now;
}

setInterval(() => {
  if (state.autoHatcher && state.autoHatcherLevel > 0) {
    const earnings = state.autoHatcherLevel * 10 * state.coinMultiplier;
    addCoins(earnings);
  }
}, 5000);

function toggleDarkMode() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  const darkModeButton = document.querySelector('button[onclick="toggleDarkMode()"]');
  if (darkModeButton) {
    darkModeButton.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);

  setTimeout(() => {
    const darkModeButton = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (darkModeButton) {
      darkModeButton.textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
  }, 100);
}

// Make functions global
window.evolvePet = evolvePet;
window.activateAbility = activateAbility;
window.battlePet = battlePet;
window.buyShopItem = buyShopItem;
window.plantSeed = plantSeed;
window.harvestPlot = harvestPlot;
window.unlockResearch = unlockResearch;
window.spinCasino = spinCasino;
window.convertChipsToCoins = convertChipsToCoins;
window.startMiniGame = startMiniGame;
window.endMiniGame = endMiniGame;
window.prestige = prestige;
window.buyAutoHatcher = buyAutoHatcher;
window.claimDailyReward = claimDailyReward;
window.toggleDarkMode = toggleDarkMode;

// Zone system functions
window.unlockZone = unlockZone;
window.customizeZone = customizeZone;
window.applyZoneTheme = applyZoneTheme;
window.getCurrentZone = getCurrentZone;
window.getZoneForEggType = getZoneForEggType;
window.isZoneUnlocked = isZoneUnlocked;
window.initializeZones = initializeZones;

document.getElementById('upgradeCapacity').onclick = upgradeCapacity;
document.getElementById('earnCoins').onclick = () => {
  const totalMultiplier = state.pets.reduce((sum, pet) => sum + pet.multiplier, 1);
  addCoins(CLICK_COINS * totalMultiplier);
};
let hasTransitioned = false;

window.addEventListener('scroll', () => {
  if (window.scrollY > 500 && !hasTransitioned) {
    hasTransitioned = true;
    document.documentElement.style.setProperty('--bg-gradient', 'linear-gradient(to bottom right, #0f172a, #1e3a8a)');
  } else if (window.scrollY <= 500 && hasTransitioned) {
    hasTransitioned = false;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const defaultGradient = isDark
      ? 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)'
      : 'linear-gradient(to bottom right, #f0f0f0, #ffffff)';
    document.documentElement.style.setProperty('--bg-gradient', defaultGradient);
  }
});

calculateOfflineEarnings();
loadTheme();
initializeZones();
applyZoneTheme();
updateUI();
