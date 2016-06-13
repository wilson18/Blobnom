var backgroundAudio;
function initAudio(){
	this.backgroundAudio = new Audio("images/HappySong.wav");
	this.backgroundAudio.loop = true;
	this.backgroundAudio.volume = .25;
	this.backgroundAudio.load();
	
}

function playAudio(){
	this.backgroundAudio.play();
}