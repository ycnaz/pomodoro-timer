const initial_timer = 3; // 25 minutes in seconds
let timerInterval;
let pausedTimer;
let pomodoroCount = 0;
let isBreak = false;
let isMuted = false;
let breakTimers = {
    '5': 5,
    '20': 20
};

document.addEventListener("DOMContentLoaded", () => {
    const soundOn = document.getElementById('sound-on')
    const soundOff = document.getElementById('sound-off')
    const buttons = document.querySelectorAll('.buttons')
    const startButton = document.querySelector('#start-button')
    const pauseButton = document.querySelector('#pause-button')
    const resetButton = document.querySelector('#reset-button')

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                this.blur()
            }, 200)
        })
    })

    startButton.addEventListener('click', () => {
        if (!timerInterval) startInterval()
    })

    pauseButton.addEventListener('click', () => {
        pauseInterval()
    })

    resetButton.addEventListener('click', () => {
        resetInterval()
    })

    soundOn.addEventListener('click', () => {
        handleSoundButton(soundOn, soundOff)
    })

    soundOff.addEventListener('click', () => {
        handleSoundButton(soundOff, soundOn)
    })
})

function startInterval() {
    let temp_timer;

    if (!pausedTimer && !isBreak) temp_timer = initial_timer
    else if (!pausedTimer && isBreak) temp_timer = pomodoroCount % 4 == 0 ? breakTimers['20'] : breakTimers['5']
    else temp_timer = pausedTimer

    timerInterval = setInterval(() => {
        if (temp_timer <= 0) return handleTimer()

        temp_timer--;
        pausedTimer = temp_timer

        updateDigit("minutes-first-digit", Math.floor((temp_timer / 60) / 10))
        updateDigit("minutes-second-digit", Math.floor(temp_timer / 60) % 10)
        updateDigit("seconds-first-digit", Math.floor((temp_timer % 60) / 10))
        updateDigit("seconds-second-digit", (temp_timer % 60) % 10)
    }, 1000)
}

function pauseInterval() {
    clearInterval(timerInterval)
    timerInterval = null
}

function resetInterval() {
    clearInterval(timerInterval)
    timerInterval = null
    pausedTimer = null
    isBreak = false
    updateDigit("minutes-first-digit", 2)
    updateDigit("minutes-second-digit", 5)
    updateDigit("seconds-first-digit", 0)
    updateDigit("seconds-second-digit", 0)
}

function updateDigit(id, newValue) {
    const el = document.getElementById(id)
    const currentValue = el.textContent;

    if (currentValue !== String(newValue)) {
        const newDigit = document.createElement("span");
        newDigit.classList.add("digit", "new");
        newDigit.id = id
        newDigit.textContent = String(newValue);

        el.classList.add("old");
        el.parentElement.appendChild(newDigit);
        
        setTimeout(() => {
            el.remove();
            newDigit.classList.remove("new");
        }, 300);
    }
}

function handleBreakTimers(duration) {
    clearInterval(timerInterval)
    timerInterval = null
    pausedTimer = null

    if (duration == 5) {
        updateDigit("minutes-first-digit", 0)
        updateDigit("minutes-second-digit", 5)
        updateDigit("seconds-first-digit", 0)
        updateDigit("seconds-second-digit", 0)
    } else {
        updateDigit("minutes-first-digit", 2)
        updateDigit("minutes-second-digit", 0)
        updateDigit("seconds-first-digit", 0)
        updateDigit("seconds-second-digit", 0)
    }
}

function handleTimer() {
    const pomodoroSpan = document.querySelector('#pomodoro-count')
    const audio = document.querySelector('#audio')
    if (!isBreak) pomodoroCount++
    pomodoroSpan.textContent = pomodoroCount
    isBreak = !isBreak
    if (!isMuted) audio.play()

    if (!isBreak) return resetInterval()
    if (pomodoroCount % 4 == 0) handleBreakTimers(20)
    else handleBreakTimers(5)
}

function handleSoundButton(clickedButton, otherButton) {
    if (clickedButton.id == 'sound-on') {
        clickedButton.style.display = 'none';
        otherButton.style.display = 'block';
        isMuted = true
    } else {
        clickedButton.style.display = 'none';
        otherButton.style.display = 'block';
        isMuted = false
    }
}