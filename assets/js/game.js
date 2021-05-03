class Game {

  engine;
  config;
  level;
  player;
  enemies;
  items;

  constructor(config) {

    this.config = config.game;

    this.resources = new Resources();
    this.engine = new Engine(this, config.engine, config.resources);

    this.level = config.game.level;
    this.player = new Player(this, config.player);

    // TODO: calculate and insert enemies automatically
    this.enemies = config.game.enemies.map(config => new Enemy(this, config));

    this.items = config.game.items.map(config => new Item(this, config));
  }

  updateTopPanel = () => {

    // Atualiza o level
    const level = document.querySelector('.level-number');
    level.innerHTML = this.level;

    // Atualiza o score
    const playerScore = document.querySelector('.points');
    playerScore.innerHTML = this.player.points;

    // Atualiza as vidas
    const livesContainer = document.getElementById('lives_container');
    livesContainer.innerHTML = "";

    // Atualiza progresso
    this.player.updateProgress();

    for(let index = 0, max = this.player.lives; index < max; index++){

      const lifeIcon = document.createElement('i');
      
      lifeIcon.setAttribute("class", "fa fa-heart heart-lives");
      livesContainer.appendChild(lifeIcon);
    }
  };

  startGettingInput = () => {

    const input = direction => this.player.handleInput(direction);

    document.addEventListener('keyup', (e) => {

      const allowedKeys = {
        39: 'right',
        37: 'left'
      };

      input(allowedKeys[e.keyCode]);
    });

    // Setas de direção para dispositivos móveis.
    document.getElementById('arrow-right')
            .addEventListener('click', () => input('right'));

    document.getElementById('arrow-left')
            .addEventListener('click', () => input('left'));
  };

  showStartScreen = () => {

    const startScreen = document.querySelector('#startScreen');
    const buttonPlay = document.querySelector('#playGame');

    const startGame = () => {

      startScreen.classList.remove('show');
      this.startGettingInput();
    }
    const spaceBarStartGame = (e) => { 

      if (e.keyCode == 32) startGame();
      document.removeEventListener('keyup', spaceBarStartGame);
    };

    startScreen.classList.add('show');

    buttonPlay.focus();
    buttonPlay.addEventListener('click', startGame);
    document.addEventListener('keyup', spaceBarStartGame);

    this.updateTopPanel();
  };

  goToNextLevel = () => {

    this.level++;

    this.enemies.forEach(enemy => enemy.goToNextLevel());

    this.updateTopPanel();
  };

  showGameOverScreen = () => {

    const resetGame = () => {

      gameOverScreen.classList.remove('show');
      this.reset();
    }
    const spaceBarResetGame = (e) => { 

      if (e.keyCode == 32) resetGame();
      document.removeEventListener('keyup', spaceBarResetGame);
    };

    const gameOverScreen = document.querySelector('#gameOverScreen');
          gameOverScreen.classList.add('show');

    const finalScore = document.querySelector('.points-finalScore');
          finalScore.innerHTML = this.player.points;
    
    const buttonTryAgain = document.querySelector('#tryAgain');
          buttonTryAgain.focus();
          buttonTryAgain.addEventListener('click', resetGame);

    document.addEventListener('keyup', spaceBarResetGame);
  };

  reset = () => {

    this.level = this.config.level;
    this.player.reset();

    for(let index = 0, max = this.enemies.length; index < max; index++){
      this.enemies[index].reset();
    };

    this.updateTopPanel();
  };
}

class Enemy {

  game;
  config;

  speed = 0;

  constructor(game, config) {

    const { sprite, xCoord } = config;

    this.config = config;
    this.game = game;

    this.sprite = sprite;
    this.x = xCoord;

    this.reset();
  }

  /* O parâmetro dt é o delta de tempo entre game ticks.
   * 
   * Você deve multiplicar qualquer movimento por este parâmetro.
   * Isso garante que o jogo execute na mesma velocidade, em qualquer computador. */
  update = (dt) => {
  
    this.y = this.y + (this.speed * dt);
    
    /* Quando o inimigo alcança a borda inferior, ele recebe uma nova 
     * coordenada vertical. */
    if (this.y > this.game.engine.canvas.height) {

      this.x = this.getRandomColumn();
      this.y = -100;
    }
  };
  
  reset = () => {

    this.x = this.getRandomColumn();
    this.y = -100;

    this.setSpeed();
  };
  
  goToNextLevel = () => {

    this.x = this.getRandomColumn();
    this.y = -100;

    this.setSpeed();
  };
  
  render = () => {
    this.game.engine.ctx.drawImage(this.game.resources.get(this.sprite), this.x, this.y);
  };
  
  checkCollisions = () => {

    /* Confere se o inimigo e jogador estão na mesma linha do grid. */
    if (this.x === this.game.player.x) {
      
      /* Confere se o inimigo e jogador estão se tocado, verticalmente. */
      const enemyBottomSideY = this.y + 101;
      const playerBottomSideY = this.game.player.y;

      if((enemyBottomSideY > playerBottomSideY) && !(playerBottomSideY < this.y)) {
        this.game.player.hit();
        this.reset();
      }
    }
  };

  setSpeed = () => {

    this.speed = 0;

    for(let index = 0, max = this.game.level; index < max; index++){
      this.speed += Utils.getRandomInt(100,200);
    };
  };

  getRandomColumn = () => {

    let randomColumn = Utils.shuffleArray([0, 100, 200, 300, 400]);
        randomColumn = randomColumn[0];

    return randomColumn
  }
}

class Item {

  game;
  config;

  speed = 0;

  constructor(game, config) {

    const { sprite, xCoord } = config;

    this.config = config;
    this.game = game;

    this.sprite = sprite;
    this.x = xCoord;

    this.reset();
  }

  /* O parâmetro dt é o delta de tempo entre game ticks.
   * 
   * Você deve multiplicar qualquer movimento por este parâmetro.
   * Isso garante que o jogo execute na mesma velocidade, em qualquer computador. */
  update = (dt) => {
  
    this.y = this.y + (this.speed * dt);
    
    /* Quando o inimigo alcança a borda inferior, ele recebe uma nova 
     * coordenada vertical. */
    if (this.y > this.game.engine.canvas.height) {

      this.x = this.getRandomColumn();
      this.y = -100;
    }
  };
  
  reset = () => {

    this.x = this.getRandomColumn();
    this.y = -100;

    this.setSpeed();
  };
  
  goToNextLevel = () => {

    this.x = this.getRandomColumn();
    this.y = -100;

    this.setSpeed();
  };
  
  render = () => {
    this.game.engine.ctx.drawImage(this.game.resources.get(this.sprite), this.x, this.y);
  };
  
  checkCollisions = () => {

    /* Confere se o item e jogador estão na mesma linha do grid. */
    if (this.x === this.game.player.x) {
      
      /* Confere se o item e jogador estão se tocado, verticalmente. */
      const enemyBottomSideY = this.y + 101;
      const playerBottomSideY = this.game.player.y;

      if((enemyBottomSideY > playerBottomSideY) && !(playerBottomSideY < this.y)) {

        this.game.player.collected();

        if (this.game.player.points >= this.game.player.required_xp) this.game.player.goToNextLevel();
        this.reset();
      }
    }
  };

  setSpeed = () => {

    this.speed = 0;

    for(let index = 0, max = this.game.level; index < max; index++){
      this.speed += Utils.getRandomInt(100,200);
    };
  };

  getRandomColumn = () => {

    let randomColumn = Utils.shuffleArray([0, 100, 200, 300, 400]);
        randomColumn = randomColumn[0];

    return randomColumn
  }
}

class Player {

  game;
  config;
  required_xp;

  constructor(game, config) {

    const { sprite, lives, points, required_xp } = config;

    
    this.config = config;
    
    this.game = game;
    this.sprite = sprite;
    this.required_xp = required_xp;
    
    this.lives = lives;
    this.points = points;

    this.backToInitialPosition();
  }
  
  reset = () => {

    this.lives = this.config.lives;
    this.points = this.config.points;
    this.required_xp = this.config.required_xp;

    this.backToInitialPosition();
  };
  
  backToInitialPosition = () => {

    this.x = this.config.coords.x;
    this.y = this.config.coords.y;
  };
  
  hit = () =>{
  
    this.lives--;

    this.game.engine.canvas.classList.add('anim--shake');
    this.game.engine.canvas.addEventListener('animationend', () => {

      this.game.engine.canvas.classList.remove('anim--shake');
    })

    this.game.updateTopPanel();

    if (this.lives === 0) this.game.showGameOverScreen();
  };

  collected = () =>{
  
    this.points += 10;

    this.game.updateTopPanel();
  };

  updateProgress = () => {

    let progress, result;

    progress = document.body.querySelector('#canvas_container .progress-bar');
    result = (this.points * 100) / this.required_xp;
    progress.style.width = `${result}%`;
  }
  
  render = () => {
    this.game.engine.ctx.drawImage(this.game.resources.get(this.sprite), this.x, this.y);
  };
  
  goToNextLevel = () =>{

    this.required_xp = this.required_xp + this.points;
    this.backToInitialPosition();

    this.game.goToNextLevel();
  };
  
  handleInput = (key) => {

    switch (key) {
      case 'right':
        const lastColumn = this.game.engine.canvas.width - this.game.engine.column.count;
        this.x += 100;
        if (this.x === lastColumn) this.x = 400;
        break;

      case 'left':
        this.x -= 100;
        if (this.x === -100) this.x = 0;
        break;
    }
  };
}

/*
 ****** UTILS ******
*/

class Utils {

  static getRandomInt = (min, max) => {

    min = Math.ceil(min);
    max = Math.floor(max);
  
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Fisher-Yates shuffle algorithm
  static shuffleArray(array) {

    let value, index;
    let iteration = array.length;
  
    while (iteration) {
  
      index = Math.floor(Math.random() * iteration--);
  
      value = array[iteration];
      array[iteration] = array[index];
      array[index] = value;
    }
  
    return array;
  }
}
