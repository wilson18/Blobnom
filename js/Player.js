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
    ctx.drawImage(char, posX, posY,size,size);   
    
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
	return speed*elapsed;
}
function isDead(){
	switch(facing) {
    case "left":
    	if(posX <0){
    		dead=true;
    	}
        break;
    case "right":
    	if(posX>canvas.width-size){
    		dead=true;
    	}
        break;
    case "up":
    	if(posY<0){
    		dead=true;
    	}
        break;
    case "down":
    	if(posY>canvas.width-size){
    		dead=true;
    	}
        break;
    default:
        break;
	}
	if(dead && running){
		time=curTime;
		running=false;
	}
}