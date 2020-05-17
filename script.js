minHeight = 80;
maxHeight = 150;
minWidth = 20;
maxWidth = 40;
minGap = 200;
maxGap = 500;
gap = randGap();
var myObstacles = [];

window.onload = startGame;

var gamescreen = {
  canvas: document.createElement("canvas"),

  
  start: function () {
    this.height = 500;
    this.canvas.height = 500;
    this.canvas.width = 1200;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context = this.canvas.getContext("2d");
    this.frame = 0;
    this.interval = setInterval(this.updateGameScreen, 5);
    
    this.level2 = setTimeout(this.levelTwo, 30000);
    this.level3 = setTimeout(this.levelThree, 60000);
  
    //this.finish = setTimeout(this.gameOver, 1000)
    
    window.addEventListener("keydown", function(e){
        var key_state = (event.type == "keydown")?true:false;
        switch(e.which){
          case 38:
            if(player.y == 470){
              //jump();
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

  updateGameScreen: function () {
    for(i = 0; i < myObstacles.length; i++){
      if(player.crash(myObstacles[i])){
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
          //minGap = 50;
          myObstacles[i].x -= 2.5;
          myObstacles[i].draw();
        } else if(obstacle.third == true){
          myObstacles[i].x -= 3;
          myObstacles[i].draw();
        }
      }

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
    for(i = 0; i < myObstacles.length; i++){
      myObstacles = []
    }
  }
};


var player = {
    x:20,
    y:470,
    speedY: 0,
    y_vel: 0,
    jumping: false,
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
        return true;
      } else {
        return false;
      }

    }

}

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
    gamescreen.context.fillStyle = "#FF0000";
    gamescreen.context.fillRect(this.x, this.y, this.width, this.height);
  };
}

function startGame() {
    gamescreen.start();
  }
  
function jump(){
    player.speedY = -3;
}

function everyinterval(n){
    if(gamescreen.frame % n == 0) return true;
    return false;
}

function randGap(){
    return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}

function dash(){
  for (i = 0; i < 50; i++) {
    myObstacles[i].x -= myObstacles[i].x_vel;
    myObstacles[i].x_vel = 50;
  }
}

function stopDash(){
  obstacle.move = false;
}



  
  
