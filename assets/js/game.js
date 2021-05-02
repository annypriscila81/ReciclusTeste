class Game {

  engine;
  score;
  level;
  player;
  enemies;

  // TODO: should receive settings as parameters
  constructor() {

    this.resources = new Resources();
    this.engine = new Engine(this);

    this.score = 0;
    this.level = 0;
    this.player = new Player(this, 100, 400);

    // TODO: calculate and insert enemies automatically
    this.enemies = [
      new Enemy(this, 40),
      new Enemy(this, 130),
      new Enemy(this, 220)
    ];
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

  // TODO: go to next level after x amount of points (progressively)
  goToNextLevel = () => {

    this.level++;

    for (let index = 0, max = this.enemies.length; index < max; index++) {
      this.enemies[index].goToNextLevel();
    };

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

    this.level = 0;
    this.player.reset();

    for(let index = 0, max = this.enemies.length; index < max; index++){
      this.enemies[index].reset();
    };

    this.updateTopPanel();
  };
}

class Enemy {

  game;

  constructor(game, x) {

    this.game = game;
    // TODO: enemy sprite as parameter
    this.sprite = `${baseURL}/assets/img/entities/enemy-bug.png`;
    this.x = x;

    this.reset();
  }

  /* O parâmetro dt é o delta de tempo entre game ticks.
   * 
   * Você deve multiplicar qualquer movimento por este parâmetro.
   * Isso garante que o jogo execute na mesma velocidade, em qualquer computador. */
  update = (dt) => {
  
    // https://discussions.udacity.com/t/how-do-i-define-the-enemys-speed/185100
    this.y = this.y + (this.speed * dt);
    
    /* Quando o inimigo alcança a borda inferior, ele recebe uma nova 
     * coordenada vertical. */
    if (this.y > 606) {

      // TODO: we need a more elegant solution
      this.x = [0, 100, 200, 300, 400][Utils.getRandomInt(0,4)];
      this.y = -100;
    }
  };
  
  reset = () => {

    this.speed = Utils.getRandomInt(50, 150);
    this.x = [0, 100, 200, 300, 400][Utils.getRandomInt(0,4)];
    this.y = -100;
  };
  
  goToNextLevel = () => {

    this.speed += Utils.getRandomInt(30,100);
    this.x = [0, 100, 200, 300, 400][Utils.getRandomInt(0,4)];
    this.y = -100;
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
      }
    } 
  };
}

class Player {

  game;

  // TODO: make use of x and y parameters
  constructor(game, x, y) {

    this.game = game;
    // TODO: player sprite as parameter
    this.sprite = `${baseURL}/assets/img/entities/char/char-boy.png`;
    
    this.lives = 4;
    this.points = 0;

    this.backToInitialPosition();
  }
  
  reset = () => {

    this.lives = 4;
    this.points = 0;

    this.backToInitialPosition();
  };
  
  // TODO: actually use parameters
  backToInitialPosition = (x, y) => {

    this.x = 100;
    this.y = 400;
  };
  
  // TODO: dont get back to initial position
  // TODO: dissipate enemy on hit
  // TODO: lose health if hit by enemy
  // TODO: dissipate item on hit
  // TODO: dont get back to initial position
  hit = () =>{
  
    this.lives--;

    this.game.updateTopPanel();

    // TODO: implement different business logic (lives === 0 && health === 0)
    if (this.lives === 0) this.game.showGameOverScreen();
  };
  
  render = () => {
    this.game.engine.ctx.drawImage(this.game.resources.get(this.sprite), this.x, this.y);
  };
  
  /* Invocado quando o jogador chega aos blocos de água. */
  // TODO: only ever level up after a few items are collected (progressively)
  goToNextLevel = () =>{

    // TODO: points amount depend on item collected
    this.points += 10;
    this.backToInitialPosition();

    this.game.goToNextLevel();
  };
  
  // TODO: automatically determine boundaries
  handleInput = (key) => {

    switch (key) {
      case 'right':
        this.x += 100;
        if (this.x === 500) this.x = 400;
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
