const FULL_DASH_ARRAY = 283;
const warning_threshold = 10;
const alert_threshold = 5;

const Color_codes = {
    info: {
        color: 'green'
    },
    warning: {
        color: "orange",
        threshold: warning_threshold
    },
    alert: {
        color: "red",
        threshold: alert_threshold
    }
};
const Time_limit = 60;
let timePassed = 0;
let timeLeft = Time_limit;

let timerInterval = null;

let remainingPathColor = Color_codes.info.color;


//Target app element to create HTML//

document.getElementById("app").innerHTML =
`
<div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
        <path 
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
        M 50,50
        m -45, 0
        a 45,45 0 1, 0 90, 0
        a 45,45 0 1, 0 -90, 0
        "
        ></path>
    </g>
    </svg>

    <span id="base-timer-label" class="base-timer__label">
    ${formatTime(timeLeft)}
    </span>
</div>

`;

//When window is open
startTimer();

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = Time_limit - timePassed;

        document.getElementById("base-timer-label").innerHTML= formatTime(timeLeft)

        setCircleDashArray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0){
            onTimesUp();
        }

    }, 1000)
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if(seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes} : ${seconds}`;
}

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
