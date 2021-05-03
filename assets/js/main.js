var baseURL = "/reciclus";

const config = {
  game: {
    level: 1,

    enemies: [
      { 
        sprite: `${baseURL}/assets/img/objects/radioativo.png`,
        xCoord: 40 
      },
      { 
        sprite: `${baseURL}/assets/img/objects/vidro.png`,
        xCoord: 130 
      },
      { 
        sprite: `${baseURL}/assets/img/objects/hospitalar.png`,
        xCoord: 220 
      }
    ],

    items: [
      { 
        sprite: `${baseURL}/assets/img/objects/plastico.png`,
        xCoord: 40 
      },
      { 
        sprite: `${baseURL}/assets/img/objects/plastico.png`,
        xCoord: 40 
      }
    ]
  },

  player: {
    sprite: `${baseURL}/assets/img/objects/lixeira.png`,

    lives: 5,
    points: 0,
    
    required_xp: 30,

    coords: {
      x: 200,
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

    `${baseURL}/assets/img/objects/radioativo.png`,
    `${baseURL}/assets/img/objects/vidro.png`,
    `${baseURL}/assets/img/objects/nonrecy.png`,
    `${baseURL}/assets/img/objects/hospitalar.png`,
    `${baseURL}/assets/img/objects/madeira.png`,
    `${baseURL}/assets/img/objects/metal.png`,
    `${baseURL}/assets/img/objects/organico.png`,
    `${baseURL}/assets/img/objects/papel.png`,
    `${baseURL}/assets/img/objects/perigoso.png`,
    
    `${baseURL}/assets/img/objects/lixeira.png`,

    `${baseURL}/assets/img/objects/plastico.png`
  ]
}

const reciclus = new Game(config);

window.onload = () => {
  
    reciclus.showStartScreen();
}

// TODO: fix gameover and game start modals reposivity
// TODO: transition between levels
// TODO: background
// TODO: sounds
