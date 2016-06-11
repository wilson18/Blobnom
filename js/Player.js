
var facing='right';
var open=true;
var openTick=0;
var openTickMax=15;
var sizeX = 32;
var sizeY = 32;
var dead=false;

function drawCharacter(){
	var char = new Image();
    if(openTick>openTickMax){
    	openTick=0;
        open=!open;
    }else{
    	openTick++;
    }
    isDead();
    doMovement()
    char.src = "images/p_"+facing+"_"+(open?"open":"closed")+".png";
    ctx.drawImage(char, posX, posY,sizeX,sizeY);   
    
}
function moveCharacter(elapsed){
	switch(facing) {
	    case "left":
	        posX=posX-doMovementMath(elapsed);
	        break;
	    case "right":
	        posX=posX+doMovementMath(elapsed);
	        break;
	    case "up":
	    	posY=posY-doMovementMath(elapsed);
	        break;
	    case "down":
	    	posY=posY+doMovementMath(elapsed);
	        break;
	    default:
	        break;
	} 
}
function doMovementMath(elapsed){
	return 100*elapsed;
}
function isDead(){
	switch(facing) {
    case "left":
    	if(posX <0){
    		dead=true;
    	}
        break;
    case "right":
    	if(posX>canvas.width-sizeX){
    		dead=true;
    	}
        break;
    case "up":
    	if(posY<0){
    		dead=true;
    	}
        break;
    case "down":
    	if(posY>canvas.width-sizeY){
    		dead=true;
    	}
        break;
    default:
        break;
	}
	if(dead && running){
		alert("You are dead!");
		running=false;
	}
}
function doMovement(){
	if (InputManager.padPressed & InputManager.PAD.UP){
        facing="up";
	}else if (InputManager.padPressed & InputManager.PAD.DOWN){
        facing="down";
	}else if (InputManager.padPressed & InputManager.PAD.LEFT){
        facing="left";
	}else if (InputManager.padPressed & InputManager.PAD.RIGHT){
        facing="right";
	}
}