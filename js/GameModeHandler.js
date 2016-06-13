var bombs=[];
var maxBombs=3;
var pup=null;
var pupSize=20;
var baseSpeed=200;
var laserX=null;
var laserXY=0;
var laserY=null;
var laserYX=0;
var laserDown=true;
var laserRight=true;
function changeGameMode(newMode){
	mode=newMode;
	reset();
}
function reset(){
	dead=false;
	posX=20;
	posY=20;
	running=true;
	paused=false;
	facing='right';
	size = 32;
	dead=false;
	keysPressed=0;
	time=0; 
	points=0;
	time=null;
	offsetTime=0;
	curTime=0;
	startTime=new Date;
	bombs=[];
	pup=null;
	hasWon=false;
	menu=false;
}
function drawBaddies(){
	switch(mode){
	case "Challenge":
		if(bombs.length!=maxBombs ){
			for(var i=0; i<(maxBombs-bombs.length); i++){
				bombs.push(genXY());
			}
		}
		var bombImg=[];
		for(var i=0; i<bombs.length; i++){
			bombImg[i] = new Image();
		    bombImg[i].src = "images/bomb.png";
		    ctx.drawImage(bombImg[i], bombs[i].x, bombs[i].y,32,32); 
		}
		break;
	
	}
	drawPup();
	hasColidedBomb(posX, posY, 32,size,true);
	hasColidedPup(posX, posY, 32,size,true);
}
function gameLogic(elapsed){
	switch(mode){
	case "Easy":
		speed=(points*20)+200;
		size=(points*7)+32;
		if(points>=easyPointsRequired){
			won();
		}
		break; 
	case "Hard":
		speed=(keysPressed*16)+200+(points*35);
		size=(points*7)+32;
		if(points>=hardPointsRequired){
			won();
		}
		break;	
	case "Challenge":
		var newSpeed=(keysPressed*10)+200;
		speed=(newSpeed>baseSpeed)?newSpeed-(points*10):baseSpeed;
		
		break;	
		
	}
}
function drawLasers(elapsed){
	var lspeed=300;
	if(laserX==null){
		laserX=genCoordinate(1,canvas.width);
	}if(laserY==null){
		laserY=genCoordinate(1,canvas.height);
	}
	//x
	ctx.fillStyle = "red";
    ctx.fillRect(laserX, laserXY, 10, 20);
    ctx.fillRect(laserYX, laserY, 20, 10);
    if(laserDown){
    	laserXY=laserXY+(elapsed*lspeed);
    	if(laserXY>=canvas.height){
    		laserDown=false;
    		laserX+=size;
    	}
    }else{
    	laserDown=false;
    	laserXY=laserXY-(elapsed*lspeed);
    	if(laserXY<=0){
    		laserDown=true;
    		laserX+=size;
    	}
    }
    if(laserX>canvas.width){
    	laserX=0;
    }
    if(laserRight){
    	laserYX=laserYX+(elapsed*lspeed);
    	if(laserYX>=canvas.width){
    		laserRight=false;
    		laserY+=size;
    	}
    }else{
    	laserRight=false;
    	laserYX=laserYX-(elapsed*lspeed);
    	if(laserYX<=0){
    		laserRight=true;
    		laserY+=size;
    	}
    }
    if(laserY>canvas.width){
    	laserY=0;
    }

	hasColidedBomb(laserX, laserXY, 10,size,false);
	hasColidedPup(laserX, laserXY, 10,pupSize,false);
	hasColidedBomb(laserYX, laserY, size,20,false);
	hasColidedPup(laserYX, laserY, pupSize,20,false);
	hasColidedLaser(laserX, laserXY, 10,size);
	hasColidedLaser(laserYX, laserY, size,10);
}
function won(){
	running=false;
	hasWon=true;
}
function drawPup(){
	var pupImg;
	if(pup==null){
		pup=genXY();
	}

	pupImg = new Image();
	pupImg.src= "images/burger.png";
    ctx.drawImage(pupImg, pup.x, pup.y,pupSize,pupSize); 
}
function genXY(){
	return { x : genCoordinate(50, canvas.width-105), y : genCoordinate(50, canvas.height-105) };
}
function genCoordinate(min, max){
	return (Math.floor(Math.random() * max)+min);
	
}
function hasColidedBomb (x, y, obSize,projSize,  kill){
	for (var s, i = 0; s = this.bombs[i]; ++i){
		var r2 = Pow2((obSize/2)+(projSize/3));
		var dx = x-s.x;
		var dy = y-s.y;
		var calc=dx*dx+dy*dy;
		if (calc < r2){
			bombs.splice(i, 1);
			if(kill){
				dead=true;
			}
		}
	}
}
function hasColidedPup(x, y, obSize,projSize, plusPoint){
	if(pup!=null){
		var r2 = Pow2(obSize+projSize)*0.3;
		var dx = x-pup.x;
		var dy = y-pup.y;
		var calc=dx*dx+dy*dy;
		if (calc < r2){
			if(plusPoint){
				givePoint();
			}
			pup=null;
		}
	}
	
}
function hasColidedLaser(x, y, obSize,projSize){
	
		var r2 = Pow2(obSize+projSize)*0.3;
		var dx = posX-x;
		var dy = posY-y;
		var calc=dx*dx+dy*dy;
		if (calc < r2){
			dead=true;
		}
	
	
}
function givePoint(){
	points++;
}

function Pow2(v) {
	return v*v;
}