
const Color_codes = {
    info: {
        color: 'green'
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
startTimer();

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = Time_limit - timePassed;

        document.getElementById("base-timer-label").innerHTML= formatTime(timeLeft)
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
