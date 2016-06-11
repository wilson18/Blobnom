function runKeyBoardCommands(){
	InputManager.padUpdate();
	if (InputManager.padPressed & InputManager.PAD.CANCEL){
        if(paused){
        	offsetTime=curTime;
        	startTime=new Date;
        }
        paused = !paused;
	}
	if(InputManager.currentlyPressedKeys[InputManager.KEY.R]){
		reset();
	}
	if(InputManager.currentlyPressedKeys[InputManager.KEY.C]){
		changeGameMode("Challenge");
	}if(InputManager.currentlyPressedKeys[InputManager.KEY.ENTER]){
		changeGameMode("Easy");
	}if(InputManager.currentlyPressedKeys[InputManager.KEY.BACKSPACE]){
		changeGameMode("Hard");
	}
	
	
	
	
	
}

function doMovement(){
	if (InputManager.padPressed & InputManager.PAD.UP){
        facing="up";
        keysPressed++;
	}else if (InputManager.padPressed & InputManager.PAD.DOWN){
        facing="down";
        keysPressed++;
	}else if (InputManager.padPressed & InputManager.PAD.LEFT){
        facing="left";
        keysPressed++;
	}else if (InputManager.padPressed & InputManager.PAD.RIGHT){
        facing="right";
        keysPressed++;
	}
}