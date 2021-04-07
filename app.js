//Countdown Timer//

let statusSpan = document.querySelector("#status");
let statusToggle = document.querySelector("#status-toggle");
let playButton = document.querySelector("#play");
let pauseButton = document.querySelector("#pause");
let stopButton = document.querySelector("#stop");
let minutesDisplay = document.querySelector("#minutes");
let secondsDisplay = document.querySelector("#seconds");
let workMinutesInput = document.querySelector("#work-minutes");
let restMinutesInput = document.querySelector("#rest-minutes");
let inputs = document.querySelector(".inputs")

let totalSeconds = 0;
let secondsElapsed = 0;
let status = "Working";
const timerSound = new Audio('end-sound.mp3')
let interval;


function getFormattedMinutes() {
  //
  let secondsLeft = totalSeconds - secondsElapsed;

  let minutesLeft = Math.floor(secondsLeft / 60);

  let formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

function setTime() {
    var minutes;
          
    if (status === "Working") {
     minutes = workMinutesInput.value.trim();
    } else {
     minutes = restMinutesInput.value.trim();
    }
          
    clearInterval(interval);
    totalSeconds = minutes * 60;
}

function renderTime() {
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
  
    if (secondsElapsed >= totalSeconds) {
      timerSound.play();
      stopTimer();
    }
  }

function startTimer() {
  setTime();

  if (totalSeconds > 0) {
      interval = setInterval(function() {
        secondsElapsed++;

        renderTime();
      }, 1000);
  } else {
    alert("Minutes of work/rest must be greater than 0.")
  }
}

function pauseTimer() {
    clearInterval(interval);
    renderTime();
}

function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
}

// function stopAudio() {
//   timerSound.pause();
// }

function toggleStatus(event) {
    var checked = event.target.checked;
  
    if (checked) {
      status = "Working";
    } else {
      status = "Resting";
    }
  
    statusSpan.textContent = status;
  
    secondsElapsed = 0;
    setTime();
    renderTime();
}

playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);
// inputs.addEventListener("change", setTimePreferences);
// inputs.addEventListener("keyup", setTimePreferences);
        

function setRemainingPathColor(timeLeft) {
    const {alert, warning, info} = Color_codes;
    if (timeLeft <= alert.threshold){
        document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
        document.getElementById("base-timer-path-remaining").classList.add(alert.color);
    }else if (timeLeft <= warning.threshold) {
        document.getElementById("base-timer-path-remaining").classList.remove(info.color);
        document.getElementById("base-timer-path-remaining").classList.add(warning.color);
    }
}

//Divide time left by time limit

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / Time_limit;
    return rawTimeFraction - (1 / Time_limit) * (1 - rawTimeFraction)
}

//Update dasharray value as time passes

function setCircleDashArray() {
    const circleDashArray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDashArray);
}

//Future dev - add animation for time elapsed//


// function startTimer() {
//     timerInterval = setInterval(() => {
//         timePassed = timePassed += 1;
//         timeLeft = Time_limit - timePassed;

//         document.getElementById("base-timer-label").innerHTML= formatTime(timeLeft)

//         setCircleDashArray();
//         setRemainingPathColor(timeLeft);

//         if (timeLeft === 0){
//             onTimesUp();
//         }

//     }, 1000)

// }

// const FULL_DASH_ARRAY = 283;
// const warning_threshold = 10;
// const alert_threshold = 5;

// const Color_codes = {
//     info: {
//         color: 'green'
//     },
//     warning: {
//         color: "orange",
//         threshold: warning_threshold
//     },
//     alert: {
//         color: "red",
//         threshold: alert_threshold
//     }
// };
// const Time_limit = 60;
// let timePassed = 0;
// let timeLeft = Time_limit;

// let timerInterval = null;

// let remainingPathColor = Color_codes.info.color;
