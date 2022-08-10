// // const progressBar = document.querySelector(".outerRing"),
// //       minElem = document.querySelector("#minutes"),
// //       secElem = document.querySelector("#seconds"),
// //       start = document.querySelector("#stsp"),
// //       stop = document.querySelector("#stsp"),
// //       setting = document.querySelector("#setting"),
// //       reset = document.querySelector("#reset");
    
// let //minutes = document.querySelector("#minutes").innerHTML,
//     //seconds = document.querySelector("#seconds").innerHTML,
//     //timerStart = 0,
//     //timerEnd = parseInt(minutes) * 60 + parseInt(seconds),
//     speed = 1000,
//     //degTravel = 360 / progressEnd,
//     toggleSettings = false
  

// class Clock {
//   constructor(min, sec) {
//     //sets clocks minutes and seconds
//     this.min = min;
//     this.sec = sec;    

//     //tracks if the timer is running
//     this.running = false;

//   //tracks progress of clock
//     this.progress
//   }


// //track timer current value
//   timerTrack() {
//     timerStart++
   
//     secRem = Math.floor((timerEnd - timerStart) % 60)
//     minRem = Math.floor((timerEnd - timerStart) / 60);
//   }


// //start the timer
//   start() {
//     this.progress = setInterval(this.timerTrack, speed);
//     this.running = true;       
//   }


// //stop the timer
//   stop() {
//    this.progress = setInterval(this.progress)
//    this.running = false
//   }

//   settings() {
//     //interact with the cogwheel (maybe get rid cog?)
//   }


// //reset the timer
//   reset() {
    
//     clock = new Clock(min, sec);
//   }
// }
// let clock = new Clock(25, 0);


class Timer {
  constructor () {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
  }

  _getTimeElapsedSinceLastStart () {
    if (!this.startTime) {
      return 0;
    }
  
    return Date.now() - this.startTime;
  }

  start () {
    if (this.isRunning) {
      return console.error('Timer is already running');
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop () {
    if (!this.isRunning) {
      return console.error('Timer is already stopped');
    }

    this.isRunning = false;

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
  }

  reset () {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime () {
    if (!this.startTime) {
      return 0;
    }

    if (this.isRunning) {
      return this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    return this.overallTime;
  }
}

const timer = new Timer();
timer.start();
setInterval(() => {
  const timeInSeconds = Math.round(timer.getTime() / 1000);
  document.getElementById('time').innerText = timeInSeconds;
}, 100)