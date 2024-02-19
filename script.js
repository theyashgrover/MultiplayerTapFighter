
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')
let attackButton1 = document.querySelector('.attackButton1')
let attackButton2 = document.querySelector('.attackButton2')
let healButton1 = document.querySelector('.healButton1')
let healButton2 = document.querySelector('.healButton2')

const updateGame = (p1,p2,gameState) => {
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver
    result.innerText = game.declareWinner(game.isOver,p1,p2)
    return gameState
  } 
}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  
  strike (player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg) 
    enemy.health -= damageAmount
    enemy.health = Math.max(0, enemy.health);
    updateGame(p1,p2,gameState)
    return `${player.name} attacks ${enemy.name} for ${damageAmount}`
  }
  
  heal (player) {
    
    let hpAmount = Math.ceil(Math.random() * 5)
    player.health += hpAmount
    player.health = Math.min(100, player.health);
    updateGame(p1,p2,gameState)
    
    return `${player.name} heals for ${hpAmount} HP!`
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  
  declareWinner(isOver,p1, p2) {
    let message
  
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    }
    else if(isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`
    } 
    console.log(isOver, p1.health, p2.health)
    document.getElementById('victory').play() 
    return message
  }

  reset(p1,p2) {
    document.getElementById('stimulate').play();
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = 'Start!'
    updateGame(p1,p2)

    setTimeout(() => {
      resultDiv.innerText = '';
    }, 3000);
  }

  play(p1, p2) {
    this.reset(p1, p2);
    document.getElementById('stimulate').play();

    while (!this.isOver) {
      p1.strike(p1,p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1, p2.attackDmg);
      p1.heal(p1)
    }
    return this.declareWinner(this.isOver,p1,p2);
  }

}

let player1 = new Player('Killua Zoldyck', 100, 15)
let player2 = new Player('Gojo Satoru', 100, 15)
let p1 = player1;
let p2 = player2;
let game = new Game();

updateGame(p1,p2)

let gameState = game.isOver

play.onclick = () => result.innerText = game.play(p1,p2);

document.addEventListener('keydown', function(e) {
  if (e.key == "q" && p2.health > 0 && game.isOver == false ){
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById('p1attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "a" && p2.health > 0 ){
    p1.heal(p1)
    document.getElementById('p1heal').play();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "p" && p1.health > 0 && game.isOver == false ){
    p2.strike(p2, p1, p2.attackDmg)
    document.getElementById('p2attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "l" && p2.health > 0 ){
  player2.heal(p2)
  document.getElementById('p2heal').play();
  }
});

attackButton1.addEventListener('click', () => {
  if(p2.health > 0 && game.isOver == false){
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById('p1attack').play();
  }
})

attackButton2.addEventListener('click', () => {
  if(p1.health > 0 && game.isOver == false){
    p2.strike(p2, p1, p2.attackDmg)
    document.getElementById('p2attack').play();
  }
})

healButton1.addEventListener('click', () => {
  if(p1.health > 0){
    p1.heal(p1)
    document.getElementById('p1heal').play();
  }
})

healButton2.addEventListener('click', () => {
  if(p2.health > 0){
    p2.heal(p2)
    document.getElementById('p2heal').play();
  }
})