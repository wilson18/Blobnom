fps = null; 
canvas = null;
ctx = null;

// ----------------------------------------

var posX = 20;
var posY = 20;
var running=false;
var paused=false;
var facing='right';
var open=true;
var openTick=0;
var openTickMax=15;
var size = 32;
var dead=false;
var mode='Easy'; //hard or challenge 
var keysPressed=0;
var time=null; 
var points=0;
var speed=150;
var startTime;
var finishTime; 
var offsetTime=0;
var curTime=0;
var easyPointsRequired=10;
var hardPointsRequired=13;
var hasWon=false;
var menu=true;
var audioInited=false;
var audioPlaying=false;
function GameTick(elapsed){
	
	runKeyBoardCommands();
	// --- Logic
	if(running & !paused){
		if(!audioPlaying){
			playAudio();
			audioPlaying=true;
		}
		gameLogic(elapsed);
		moveCharacter(elapsed);
	    // --- Rendering
	
	    // Clear the screen
	    ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	   
	    // Render objects

		drawBaddies();
	    drawCharacter();
	    if(mode=="Challenge") drawLasers(elapsed);
	    addScreenText();
	}else{
		drawFinalScreen();
	}
}
function drawFinalScreen(){
	var bgColour="black", largeTextColour, smallTextColour, largeFontSize=75, smallFontSize=15, largeMsg="", smallMsg="", smallMsg2;
	if(menu){
		ctx.fillStyle = "#EEEEEE";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
		var menuImg = new Image();
		menuImg.src= "images/menu.png";
	    ctx.drawImage(menuImg, 0, 0,canvas.width,canvas.height);
	}else if(hasWon){
		bgColour="green"
		largeTextColour="black"; 
		smallTextColour="blue";
		largeFontSize=75;
		smallFontSize=15;
		largeMsg="You Won!!!!";
		smallMsg="omg, gratz man! Can you do any better though? \n" +
				"Press [R] to restart.";
	}else if(dead && mode=="Challenge"){
		bgColour="black";
		largeTextColour="blue"; 
		smallTextColour="green";
		largeFontSize=105;
		smallFontSize=25;
		largeMsg="You Died!!!";
		smallMsg="Good Try though. Why not try again? Press [R] to restart.";
		smallMsg2="You scored " + points + " points, pressed "+keysPressed+" keys and lasted "+(time==null?curTime:time)+" seconds!";
	}else if(dead){
		bgColour="#cf1010";
		largeTextColour="white"; 
		smallTextColour="white";
		largeFontSize=105;
		smallFontSize=15;
		largeMsg="You Died!!!";
		smallMsg="Pfff, thought you could do better. Try again, press [R]";
	}else if(paused){
		bgColour="black";
		largeTextColour="white"; 
		smallTextColour="green";
		largeFontSize=75;
		smallFontSize=15;
		largeMsg="Game Paused";
		smallMsg="Press [Esc] to resume.";
	}
	if(!menu){
		ctx.fillStyle = bgColour;
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = largeTextColour;
		ctx.textAlign = "center";
		ctx.font = largeFontSize+"px sans-serif";
	    ctx.fillText(largeMsg,(canvas.width/2), (canvas.height/2)-20);
		ctx.textAlign = "center";
		ctx.fillStyle = smallTextColour;
		ctx.font = smallFontSize+"px sans-serif";
	    ctx.fillText(smallMsg,(canvas.width/2) , (canvas.height/2)+7);
		ctx.textAlign = "center";
		ctx.fillStyle = smallTextColour;
		ctx.font = smallFontSize+"px sans-serif";
	    ctx.fillText(smallMsg2,(canvas.width/2) , (canvas.height/2)+7+smallFontSize);
	    
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
	switch(mode){
	case "Easy":
		ctx.fillText("Points Left: "+(easyPointsRequired-points)+"  Keys: " +keysPressed, 3, canvas.height-10);
		break;
	case "Hard":
		ctx.fillText("Points Left: "+(hardPointsRequired-points)+"  Keys: " +keysPressed, 3, canvas.height-10);
		break;
	default: 
		ctx.fillText("Points: "+points+"  Keys: " +keysPressed+ "   Time: " + (time==null?curTime:time) , 3, canvas.height-10);
	break;
	}
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
		if(!audioInited){
			initAudio();
			audioInited=true;
		}
		console.log("Stop playing in the console you nerd and play the damn game!");
    
	});
