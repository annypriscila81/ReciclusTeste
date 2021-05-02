class Game {

  score;
  level;
  player;
  enemies;

  // TODO: should receive settings as parameters
  constructor() {

    this.score = 0;
    this.level = 0;
    this.player = new Player(100, 400);

    // TODO: calculate and insert enemies automatically
    this.enemies = [
      new Enemy(40),
      new Enemy(130),
      new Enemy(220)
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

    const input = direction => myGame.player.handleInput(direction);

    document.addEventListener('keyup', (e) => {

      // TODO: disable up and down
      const allowedKeys = {
        38: 'up',
        39: 'right',
        40: 'down',
        37: 'left'
      };

      input(allowedKeys[e.keyCode]);
    });

    // Setas de direção para dispositivos móveis.
    document.getElementById('arrow-up')
            .addEventListener('click', () => input('up'));

    document.getElementById('arrow-right')
            .addEventListener('click', () => input('right'));

    document.getElementById('arrow-down')
            .addEventListener('click', () => input('down'));

    document.getElementById('arrow-left')
            .addEventListener('click', () => input('left'));
  };

  showStartScreen = () => {

    // TODO: add event listener for space bar
    const startScreen = document.querySelector('#startScreen');
    startScreen.classList.add('show');

    const buttonPlay = document.querySelector('#playGame');
    buttonPlay.focus();
    buttonPlay.addEventListener('click', () => {
      startScreen.classList.remove('show');
      myGame.startGettingInput();
    });

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

  // TODO: add event listener for space bar
  showGameOverScreen = () => {

    const gameOverScreen = document.querySelector('#gameOverScreen');
    gameOverScreen.classList.add('show');

    const finalScore = document.querySelector('.points-finalScore');
    finalScore.innerHTML = this.player.points;

    const buttonTryAgain = document.querySelector('#tryAgain');
    buttonTryAgain.focus();
    buttonTryAgain.addEventListener('click', function() {
        gameOverScreen.classList.remove('show');
        myGame.reset();
    });
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

  constructor(x) {

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
      this.x = [0, 100, 200, 300, 400][getRandomInt(0,4)];
      this.y = -100;
    }
  };
  
  reset = () => {

    this.speed = getRandomInt(50, 150);
    this.x = [0, 100, 200, 300, 400][getRandomInt(0,4)];
    this.y = -100;
  };
  
  goToNextLevel = () => {

    this.speed += getRandomInt(30,100);
    this.x = [0, 100, 200, 300, 400][getRandomInt(0,4)];
    this.y = -100;
  };
  
  render = () => {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  checkCollisions = () => {

    const player = myGame.player;

    /* Confere se o inimigo e jogador estão na mesma linha do grid. */
    if (this.x === player.x) {
      
      /* Confere se o inimigo e jogador estão se tocado, verticalmente. */
      const enemyBottomSideY = this.y + 101;
      const playerBottomSideY = player.y;

      if((enemyBottomSideY > player.y) && !(playerBottomSideY < this.y)) {
        player.hit();
      }
    } 
  };
}

class Player {

  // TODO: make use of x and y parameters
  constructor(x, y) {//TODO

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
  backToInitialPosition = (x, y) => {//TODO

    this.x = 100;
    this.y = 400;
  };
  
  // TODO: dont get back to initial position
  // TODO: dissipate enemy on hit
  // TODO: lose health if hit by enemy
  // TODO: dissipate item on hit
  // TODO: dont get back to initial position
  // TODO: dont get back to initial position
  hit = () =>{
  
    this.lives--;

    myGame.updateTopPanel();
    this.backToInitialPosition();

    // TODO: implement different business logic (lives === 0 && health === 0)
    if (this.lives === 0) myGame.showGameOverScreen();
  };
  
  render = () => {//TODO
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  /* Invocado quando o jogador chega aos blocs de água. */
  // TODO: only ever level up after a few items are collected (progressively)
  goToNextLevel = () =>{

    // TODO: points amount depend on item collected
    this.points += 10;
    this.backToInitialPosition();

    myGame.goToNextLevel();
  };
  
  // TODO: remove up and down
  // TODO: automatically determine boundaries
  handleInput = (key) => {

    switch (key) {
      case 'up':
        this.y -= 90;
        /* Confere se o jogador chegou aos blocos de água. */
        if(this.y === -50) this.goToNextLevel();
        break;

      case 'right':
        this.x += 100;
        if (this.x === 500) this.x = 400;
        break;

      case 'down':
        this.y += 90;
        if(this.y === 490) this.y = 400;
        break;

      case 'left':
        this.x -= 100;
        if (this.x === -100) this.x = 0;
        break;
    }
  };
}

// TODO: create a class specifically for utils
// TODO: fisher yates utils
/*
 ****** UTILS ******
*/

// Baseado em: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {//TODO

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}
