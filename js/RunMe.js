fps = null; 
canvas = null;
ctx = null;

// ----------------------------------------

var posX = 20;
var posY = 20;
var running=true;
var paused=false;
var facing='right';
var open=true;
var openTick=0;
var openTickMax=15;
var sizeX = 32;
var sizeY = 32;
var dead=false;
var mode='Challenge'; //hard or challenge 
var keysPressed=0;
var time=null; 
var points=0;
var speed=150;
var startTime;
var finishTime; 
var offsetTime=0;
var curTime=0;

function GameTick(elapsed){
	
	runKeyBoardCommands();
	// --- Logic
	if(running & !paused){
		moveCharacter(elapsed);
	    // --- Rendering
	
	    // Clear the screen
	    ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	   
	    // Render objects

		drawBaddies();
	    drawCharacter();
	    
	    addScreenText();
	}
}
function addScreenText(){
	//Bottom ScoreBoard
	if(time==null){
		var now =new Date();
		curTime= Math.round((((now- startTime) / 1000)+offsetTime)*100)/100;
	}
	ctx.textAlign = "left";
	ctx.fillStyle = "white";
	ctx.font = "20px sans-serif";
	ctx.fillText("Points: "+points+"  Keys: " +keysPressed+ "   Time: " + (time==null?curTime:time) , 3, canvas.height-10);
	ctx.textAlign = "right";
	//Draw GameMode
	ctx.textAlign = "right";
	ctx.fillStyle = "white";
	ctx.font = "20px sans-serif";
	ctx.fillText("Mode: "+mode, canvas.width-10, 20);
	ctx.textAlign = "right";
}

	$(document).ready(function () {
	
	    canvas = document.getElementById("blobnomCanvas");
	    ctx = canvas.getContext("2d");
	    InputManager.connect(document, canvas);
	    GameLoopManager.run(GameTick);
		InputManager.reset();
		startTime = new Date();
    
	});
