minHeight = 60;
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
    window.addEventListener("keydown", function(e){
      switch(e.which){
        case 38:
          jump();
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
        myObstacles[i].x -= 2;
        myObstacles[i].draw();
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
  }
};


var player = {
    x:20,
    y:470,
    speedY: 0,
    update:function(){
        gamescreen.context.fillRect(this.x, this.y, 30, 30);
    },
    newPos:function(){
        if(this.y < 280){
            this.speedY = 2;
        }
        this.y = this.y + this.speedY;
        if(this.speedY == 2 && this.y == 470){
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
  this.draw = function () {
    gamescreen.context.fillStyle = "#FF0000";
    gamescreen.context.fillRect(this.x, this.y, this.width, this.height);
  };
}

function startGame() {
    gamescreen.start();
  }
  
  function jump(){
      player.speedY = -2;
  }
  
  function everyinterval(n){
      if(gamescreen.frame%n == 0) return true;
      return false;
  }
  
  function randGap(){
      return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
  }
  

  
  
