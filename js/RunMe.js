fps = null; 
canvas = null;
ctx = null;

// ----------------------------------------

var posX = 20;
var posY = 20;

function GameTick(elapsed)
{
	// --- Logic
	moveCharacter(elapsed);
    
    // --- Rendering

    // Clear the screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    // Render objects
    drawCharacter();
    
    
}

window.onload = function () {
    canvas = document.getElementById("blobnomCanvas");
    ctx = canvas.getContext("2d");
    GameLoopManager.run(GameTick);
    
};