var bombs=[];
var maxBombs=3;
var pup=null;
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
	sizeX = 32;
	sizeY = 32;
	dead=false;
	keysPressed=0;
	time=0; 
	points=0;
	time=null;
	offsetTime=0;
	curTime=0;
	startTime=new Date;
	bombs=[];
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
	hasColidedBomb(posX, posY, sizeX,true);
}
function drawPup(){
	var pupImg;
	if(pup==null){
		pup=genXY();
	}

	pupImg = new Image();
	pupImg.src= "images/burger.png";
    ctx.drawImage(pupImg, pup.x, pup.y,32,32); 
}
function genXY(){
	return { x : genCoordinate(30, canvas.width-30), y : genCoordinate(30, canvas.height-30) };
}
function genCoordinate(min, max){
	return (Math.floor(Math.random() * max)+min);
	
}
function hasColidedBomb (x, y, size, kill){
	for (var s, i = 0; s = this.bombs[i]; ++i){
			var r2 = Pow2(size/3+18);
			var dx = x-s.x;
			var dy = y-s.y;
			var calc=dx*dx+dy*dy;
			if (calc < r2){
				console.log(calc+" " + r2);
				if(kill){
					bombs.splice(i, 1);
					dead=true;
				}
				console.log("dead");
			}
	}
	return false;
}

function Pow2(v) {
	return v*v;
}