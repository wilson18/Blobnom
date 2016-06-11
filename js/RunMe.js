fps = null; 
canvas = null;
ctx = null;

// ----------------------------------------

var posX = 20;
var posY = 20;
var running=true;
var paused=true;

function GameTick(elapsed){
	
	InputManager.padUpdate();
	if (InputManager.padPressed & InputManager.PAD.CANCEL){
        paused = !paused;
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

	$(document).ready(function () {
	
	    canvas = document.getElementById("blobnomCanvas");
	    ctx = canvas.getContext("2d");
	    InputManager.connect(document, canvas);
	    GameLoopManager.run(GameTick);
		InputManager.reset();
    
	});
