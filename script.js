minHeight = 80;
maxHeight = 150;
minWidth = 20;
maxWidth = 40;
minGap = 200;
maxGap = 500;
gap = randGap();
var myObstacles = [];
var seconds = 0;
var overAllSeconds = 0;
var xd;

scoreBoard = [];

window.onload = startGame;


// mänguekraan 
var gamescreen = {
  canvas: document.createElement("canvas"),

  start: function () {
    this.height = 500;
    this.done = false;
    this.canvas.height = 500;
    this.canvas.width = 1200;
    document.body.appendChild(this.canvas);

    secondCounter = document.createElement("P");
    secondCounter.setAttribute("id", "counter");
    this.test = setInterval(countDown, 1000);
    document.body.appendChild(secondCounter);


    this.context = this.canvas.getContext("2d");
    this.frame = 0;
    this.interval = setInterval(this.updateGameScreen, 5);
    
    this.level2 = setTimeout(this.levelTwo, 30000);
    this.level3 = setTimeout(this.levelThree, 60000);
    this.finish = setTimeout(this.gameOver, 90000);

    this.playTime = setInterval(countPlayTime, 1000);

    // üles hüppamine ja dashimine
    window.addEventListener("keydown", function(e){
        var key_state = (event.type == "keydown")?true:false;
        switch(e.which){

          case 38:
            if(player.y == 470){
              player.jumping = key_state;
            }
            break;

          case 39:
            if(player.y != 470){
              obstacle.move = key_state;
            }
            break;

          }
    });    
  },

  // game loop, kõik selle funktsiooni sees käivitub iga viie millisekundi tagant
  updateGameScreen: function () {
    for(i = 0; i < myObstacles.length; i++){
      if(player.crash(myObstacles[i])){
        player.isCrashed = true;
        gamescreen.stop();
        return;
      }
    }

    gamescreen.clear();

    if (everyinterval(gap)){
      myObstacles.push(new obstacle());
      gap = randGap();
      gamescreen.frame = 0;
    }

    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x -= 2.3;
        myObstacles[i].draw();
        if(obstacle.second == true){
          myObstacles[i].x -= 2.5; 
          myObstacles[i].draw();
        } else if(obstacle.third == true){
          myObstacles[i].x -= 3;
          myObstacles[i].draw();
        } else if(this.done == true ){ // mäng läbi, kuubik kihutab minema
            if(myObstacles[i].x <= 0){
              myObstacles[i].x -= 0;
              gamescreen.clear();
              player.x_vel += 27;
              break;
            }
          }
        }
        
      player.x += player.x_vel;
      player.x_vel *= 0.9;

      if(player.jumping == true){
        player.speedY = -3;
        player.jumping = false;
      }

      if(obstacle.move == true){
        breakDash = setTimeout(stopDash, 300);
        for(i = 0; i < myObstacles.length; i++){
          if(player.x != 470){
            myObstacles[i].x -= 5;
            myObstacles[i].x -= myObstacles[i].x_vel;
            myObstacles[i].x_vel *= 0.9
          }else if(player.x == 470){
            myObstacles[i].x -= 2;
          }
        }
      }

    player.newPos();
    player.update();
    gamescreen.frame += 1;
  },

  clear: function () {
    gamescreen.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  stop: function () {
    clearInterval(this.interval);
  },

  levelTwo: function () {
      obstacle.second = true;
      minGap = 125; 
      maxgap = 350;
  },

  levelThree: function () {
    obstacle.second = false;
    obstacle.third = true;
    minGap = 100; 
    maxgap = 250;
  },
  
  gameOver: function () {
    this.done = true;
  }
};

// mängukuubiku parameetrid ja liikumine
var player = {
    x: 20,
    y: 470,
    speedY: 0,
    x_vel: 0,
    y_vel: 0,
    jumping: false,
    isCrashed: false,
    update:function(){
      gamescreen.context.fillRect(this.x, this.y, 30, 30);
    },
    

    newPos:function(){ 
        // siis kui hyppega tippu jõuab, saab kõrgust muuta -- 280 -- 
        if(this.y < 250){
            this.speedY += 3;
        }
        this.y = this.y + this.speedY;
        // siis kui jälle maad puudutab
        if(this.speedY == 3 && this.y == 470 ){
            this.speedY = 0;
        }
    },
    crash:function(obs){
      if(this.x + 30 > obs.x && this.x < obs.x + obs.width && this.y > obs.y){
        gameOverScreen();
        return true;
      } else {
        return false;
      }

    }

}

// takistuste parameetrid ja joonistamine
function obstacle() {
  this.height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight + 1));
  this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1));
  this.x = 1200;
  this.y = gamescreen.height - this.height;
  this.x_vel = 0;
  this.move = false;
  this.second = false;
  this.third = false;
  this.draw = function () {
    gamescreen.context.fillStyle = "#ca3e47";
    gamescreen.context.fillRect(this.x, this.y, this.width, this.height);
  };
}



// tekitab canvase ja alustab mängu
function startGame() {
    gamescreen.start();
  }
  
// liigutab mängijat üles
function jump(){
    player.speedY = -3;
}

function everyinterval(n){
    if(gamescreen.frame % n == 0) return true;
    return false;
}

// tekitab suvalise vahe takistuste vahel
function randGap(){
    return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}

// dashimine, liigutab takistusi lähemale
function dash(){
  for (i = 0; i < 50; i++) {
    myObstacles[i].x -= myObstacles[i].x_vel;
    myObstacles[i].x_vel = 50;
  }
}

// peatab dashimise
function stopDash(){
  obstacle.move = false;
}

// loeb sekundeid kuni järgmise levenini (30st allapoole)
function countDown(){
  if(player.isCrashed == false){
    seconds += 1;
    toNextLevel = 31
    nextLevel = toNextLevel - seconds;
    if(nextLevel != 0){
      secondCounter.innerText = "Seconds until next level: " + nextLevel ;
    } else {
      toNextLevel = 31
      seconds = 0;
      seconds += 1;
      nextLevel = toNextLevel - seconds;
      secondCounter.innerText = "Seconds until next level: " + nextLevel ;
    }
  } else {
    secondCounter.innerText = "";
    return;
  }
}

// loeb mängu algusest kuni lõpuni sekundeid
function countPlayTime(){
  if(player.isCrashed == false || gamescreen.done == false){
    overAllSeconds += 1;
  } else {
    overAllSeconds = overAllSeconds;
    console.log(overAllSeconds);
    clearInterval(gamescreen.playTime); 

  }
}

// tekitab game over ekraani, nime textarea ja save nupu
function gameOverScreen(){

  setTimeout(function(){

    var ctx = gamescreen.context;
    gamescreen.context.font = "75px Georgia";
    ctx.fillStyle = "#B2B2B2";
    ctx.fillText("Kaotasid :(", 420, 150);


    gamescreen.context.font = "50px Georgia";
    ctx.fillStyle = "#B2B2B2";
    ctx.fillText("Su skoor oli " + overAllSeconds, 430, 250);

    secondCounter.innerText = "";

    inputDiv =  document.createElement("div");
    inputDiv.setAttribute("id", "inputDiv");

    screen = document.createElement("input");
    screen.setAttribute("id", "playerName");
    screen.placeholder = "Kirjuta oma nimi";

    
    saveButton = document.createElement("button");
    saveButton.setAttribute("id", "saveButton");
    saveButton.innerText = "Salvesta";

    restartButton = document.createElement("button");
    restartButton.setAttribute("id", "restart");
    restartButton.addEventListener("click", function(){
      window.location.reload()
    });
    restartButton.innerText = "Mängi uuesti";
    //inputDiv.appendChild(label);
    inputDiv.appendChild(screen);
    inputDiv.appendChild(saveButton);
    inputDiv.appendChild(restartButton);

    document.body.appendChild(inputDiv);
  }, 500);

  setTimeout(() => {
    gamescreen.context.fillStyle = "#ca3e47";
    gamescreen.context.fillRect(350, 50, 500, 400);

  }, 499);

}

// ei tööta mdea miks
xd = document.getElementById("#saveButton");
xd.addEventListener("click", function(){
  console.log("save")
  var name = document.getElementById("playerName").value;
  //gamescore(overAllSeconds, name);
  scoreBoard.push(gameScore(overAllSeconds, name));
  for(i = 0; i < scoreBoard.length; i++){
    console.log(scoreBoard[i]);
  }
});

// loeb sisse mängija punktisumma (sekundid) ja nime ----- POOLIK ------
function gameScore(points, playerName){
  this.points = points;
  this.playerName = playerName;
}

