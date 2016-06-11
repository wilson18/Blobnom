fps = null; 
canvas = null;
ctx = null;

// ----------------------------------------

var posX = 20;
var posY = 20;
var running=true;
var paused=true;
var facing='right';
var open=true;
var openTick=0;
var openTickMax=15;
var sizeX = 32;
var sizeY = 32;
var dead=false;
var mode='easy'; //hard or challenge 
var keysPressed=0;
var time=0; 
var points=0;

function GameTick(elapsed){
	
	InputManager.padUpdate();
	if (InputManager.padPressed & InputManager.PAD.CANCEL){
        paused = !paused;
	}
	if(InputManager.currentlyPressedKeys[InputManager.KEY.R]){
		reset();
	}
	// --- Logic
	if(running & !paused){
		moveCharacter(elapsed);
	    
	    // --- Rendering
	
	    // Clear the screen
	    ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	   
	    // Render objects
	    drawCharacter();
	}
    
    


}
function reset(){
	dead=false;
	posX=20;
	posY=20;
	running=true;
	paused=false;
	facing='right';
	sizeX = 32;
	sizeY = 32;
	dead=false;
	mode='easy'; //hard or challenge 
	keysPressed=0;
	time=0; 
	points=0;
}

	$(document).ready(function () {
	
	    canvas = document.getElementById("blobnomCanvas");
	    ctx = canvas.getContext("2d");
	    InputManager.connect(document, canvas);
	    GameLoopManager.run(GameTick);
		InputManager.reset();
    
	});
