const initial_timer = 1500 // 25 minutes in seconds
let timerInterval;
let pausedTimer;

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.buttons')
    const startButton = document.querySelector('#start-button')
    const pauseButton = document.querySelector('#pause-button')
    const resetButton = document.querySelector('#reset-button')
    const minutes = document.querySelector('#minutes')
    const seconds = document.querySelector('#seconds')

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
})

function startInterval() {
    let temp_timer;

    if (!pausedTimer) temp_timer = initial_timer
    else temp_timer = pausedTimer

    timerInterval = setInterval(() => {
        if (temp_timer <= 0){
            clearInterval(timerInterval)
            timerInterval = null
            return
        }

        temp_timer--;
        pausedTimer = temp_timer
        minutes.textContent = Math.floor(temp_timer / 60)

        if ((temp_timer % 60) > 10) seconds.textContent = temp_timer % 60
        else seconds.textContent = String(temp_timer % 60).padStart(2, '0')
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
    minutes.textContent = 25
    seconds.textContent = '00'
}