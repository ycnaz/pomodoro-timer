const initial_timer = 1500 // 25 minutes in seconds
let timerInterval;
let pausedTimer;

document.addEventListener("DOMContentLoaded", () => {
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