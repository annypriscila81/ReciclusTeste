var baseURL = "/reciclus";

const config = {
  game: {
    level: 1,

    spawn: {
      yCoord: -180
    },

    enemies: [
      { sprite: `${baseURL}/assets/img/objects/radioativo.png` },
      { sprite: `${baseURL}/assets/img/objects/hospitalar.png`  },
      { sprite: `${baseURL}/assets/img/objects/vidro.png` }
    ],

    items: [
      { sprite: `${baseURL}/assets/img/objects/plastico.png` },
      { sprite: `${baseURL}/assets/img/objects/plastico.png` }
    ]
  },

  player: {
    sprite: `${baseURL}/assets/img/objects/lixeira.png`,

    lives: 5,
    points: 0,
    
    required_xp: 30,

    coords: {
      // x: 200,
      // y: 300,
    }
  },

  engine: {
    canvas: {
      container: document.getElementById("canvas_container"),
      element: document.createElement('canvas'),
    },

    row: {
      images: [
        `${baseURL}/assets/img/sprites/sky.png`,   // céu
        `${baseURL}/assets/img/sprites/sky.png`,   // céu
        `${baseURL}/assets/img/sprites/sky.png`,   // céu
        `${baseURL}/assets/img/sprites/sky.png`,   // céu

        `${baseURL}/assets/img/sprites/grass-block.png`,   // linha feita de grama
      ]
    },

    column: {
      count: 9
    }
  },

  resources: [
    `${baseURL}/assets/img/sprites/stone-block.png`,
    `${baseURL}/assets/img/sprites/sky.png`,
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

// TODO: sounds
