var baseURL = "/reciclus";

const config = {
  game: {
    level: 1,

    enemies: [
      { 
        sprite: `${baseURL}/assets/img/entities/enemy-bug.png`,
        xCoord: 40 
      },
      { 
        sprite: `${baseURL}/assets/img/entities/enemy-bug.png`,
        xCoord: 130 
      },
      { 
        sprite: `${baseURL}/assets/img/entities/enemy-bug.png`,
        xCoord: 220 
      },
    ],

    items: [
      { 
        sprite: `${baseURL}/assets/img/objects/heart.png`,
        xCoord: 40 
      }
    ]
  },

  player: {
    sprite: `${baseURL}/assets/img/entities/char/char-princess-girl.png`,

    lives: 5,
    points: 0,

    coords: {
      x: 100,
      y: 400,
    }
  },

  engine: {
    canvas: {
      container: document.getElementById("canvas_container"),
      element: document.createElement('canvas'),
      width: 505,
      height: 606
    },

    row: {
      count: 6,
      images: [
        `${baseURL}/assets/img/sprites/water-block.png`,   // linha superior feita de água

        `${baseURL}/assets/img/sprites/stone-block.png`,   // linha 1/3 feita de pedras
        `${baseURL}/assets/img/sprites/stone-block.png`,   // linha 2/3 feita de pedras
        `${baseURL}/assets/img/sprites/stone-block.png`,   // linha 3/3 feita de pedras

        `${baseURL}/assets/img/sprites/grass-block.png`,   // linha 1/2 feita de grama
        `${baseURL}/assets/img/sprites/grass-block.png`,   // linha 2/2 feita de grama
      ]
    },

    column: {
      count: 5
    }
  },

  resources: [
    `${baseURL}/assets/img/sprites/stone-block.png`,
    `${baseURL}/assets/img/sprites/water-block.png`,
    `${baseURL}/assets/img/sprites/grass-block.png`,

    `${baseURL}/assets/img/entities/enemy-bug.png`,

    `${baseURL}/assets/img/entities/char/char-princess-girl.png`,

    `${baseURL}/assets/img/objects/heart.png`
  ]
}

const reciclus = new Game(config);

window.onload = () => {
  
    reciclus.showStartScreen();
    // reciclus.startGettingInput();
}

// TODO: add more enemies
// TODO: add items to be collected
// TODO: entities class to be extended or implemented?
// TODO: mais de um jogador
// TODO: fix gameover and game start modals reposivity
// TODO: revisar tradução
