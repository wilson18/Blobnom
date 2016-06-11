
var facing='right';
var open=true;
var openTick=0;
var openTickMax=15;
var sizeX = 32;
var sizeY = 32;

function drawCharacter(){
	var char = new Image();
    if(openTick>openTickMax){
    	openTick=0;
        open=!open;
    }else{
    	openTick++;
    }
    isDead();
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
    		facing="right";
    	}
        break;
    case "right":
    	if(posX>canvas.width-sizeX){
    		facing="left";
    	}
        break;
    case "up":
        break;
    case "down":
        break;
    default:
        break;
} 
}