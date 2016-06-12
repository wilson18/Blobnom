var bombs=[];
var maxBombs=3;
var pup=null;
var pupSize=20;
var baseSpeed=200;
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
	case "Challenge":
		var newSpeed=(keysPressed*5)+200;
		speed=(newSpeed>baseSpeed)?newSpeed-(points*10):baseSpeed;
		break;	
	case "Easy":
		speed=(points*20)+200;
		size=(points*7)+32;
		
		//console.log(speed);
		if(points>=easyPointsRequired){
			won();
		}
		break; 
		
	}
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
			console.log(calc+" " + r2);
			if(kill){
				bombs.splice(i, 1);
				dead=true;
				console.log("dead");
			}
		}
	}
}
function hasColidedPup(x, y, obSize,projSize, plusPoint){
	var r2 = Pow2((obSize/3)+(projSize/2));
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
function givePoint(){
	points++;
}

function Pow2(v) {
	return v*v;
}