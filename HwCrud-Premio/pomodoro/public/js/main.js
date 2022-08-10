/* eslint-disable no-mixed-spaces-and-tabs */

const progressBar = document.querySelector(".outerRing"),
	  minElem = document.querySelector("#minutes"),
	  secElem = document.querySelector("#seconds"),
	  startStop = document.querySelector("#stsp"),
	  setting = document.querySelector("#setting"),
	  reset = document.querySelector('#reset')
	 

let minutes = document.querySelector("#minutes").innerHTML,
	seconds = document.querySelector("#seconds").innerHTML,
	progress = null,
	progressStart = 0,
	progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
	speed = 1000,
	degTravel = 360 / progressEnd,
	toggleSettings = false,
	secRem = 0,
	minRem = 0,
	running = false
	// myReg = /^[0-9]*$/

function progressTrack() {
	progressStart++;

	secRem = Math.floor((progressEnd - progressStart) % 60);
	minRem = Math.floor((progressEnd - progressStart) / 60);

	secElem.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`;
	minElem.innerHTML = minRem.toString().length == 2 ? minRem : `0${minRem}`;

	progressBar.style.background = `conic-gradient(
      	#9d0000 ${progressStart * degTravel}deg,
      	#17171a ${progressStart * degTravel}deg
  		)`;
	if (progressStart == progressEnd) {
		progressBar.style.background = `conic-gradient(
				#00aa51 360deg,
				#00aa51 360deg
		  )`;
		getMessage()
		clearInterval(progress);
		startStop.innerHTML = "START";
		progress = null;
		progressStart = 0;		
	}
	
}



function startStopProgress() {
	if (!running) {
		progress = setInterval(progressTrack, speed);
		running = true	
	} else {
		clearInterval(progress);
		running = false;
		progressStart = 0;
		progressBar.style.background = `conic-gradient(
				#17171a 360deg,
				#17171a 360deg
		  )`;		  
	}	
}


function resetValues() {
	if (progress) {
		clearInterval(progress);
	}
	minutes = document.querySelector("#minutes").innerHTML;
	seconds = document.querySelector("#seconds").innerHTML;
	toggleSettings = false;
	minElem.contentEditable = false;
	minElem.style.borderBottom = `none`;
	secElem.contentEditable = false;
	secElem.style.borderBottom = `none`;
	progress = null;
	progressStart = 0;
	progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
	degTravel = 360 / progressEnd;
	progressBar.style.background = `conic-gradient(
				#17171a 360deg,
				#17171a 360deg
		  )`;
}


reset.onclick = () => {	
		document.querySelector('#minutes').innerHTML = minutes
		document.querySelector('#seconds').innerHTML = seconds
		startStopProgress()	
		startStop.innerHTML = "START";
}


startStop.onclick =  () => {
// 	// if (clock.running){
// 	//	clock.stop()
// // } else { clock.start() }
// 	}
	if (startStop.innerHTML === "START") {
		startStop.innerHTML = "STOP";
		startStopProgress();
		return;
}
	if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
			startStop.innerHTML = "START";
			startStopProgress();
			return;	
	}
}

//fix - when cog is hit, it switches start and stop
setting.onclick = () => {
	if (!toggleSettings) {
		toggleSettings = true;
		minElem.contentEditable = true;
		minElem.style.borderBottom = `1px dashed #ffffff50`;
		secElem.contentEditable = true;
		secElem.style.borderBottom = `1px dashed #ffffff50`;
	} else {
		resetValues();
	}
};

minElem.onblur = function () {
	resetValues();
};

secElem.onblur = function () {
	resetValues();
};


//Inserting 'reward' into dom

async function getMessage() {
	console.log('start of function');
	
	const message = await fetch('/message')
	console.log(message, 'message');
	let res = await message.json()	
	console.log('timer is at 0', 'this one', res);
		
	document.getElementById('place-reward').innerText = res
	console.log(res, 'timer has endededed');			
}

