$('#start').click(startGame);


function startGame(){
    gamescreen.start();
}
var gamescreen = { 
    canvas:document.createElement("canvas"),
    start:function(){
        this.canvas.height = 500;
        this.canvas.width = 1200;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d");
    },
    updateGameScreen:function(){

    },
    clear:function(){
        gamescreen.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop:function(){

    }
}