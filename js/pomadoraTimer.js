class PomadoraTimer {
    static maxRows = 0;
    static startTrue = false;
    #row = 0;
    #interval;
    #startingTime

    constructor() {
        PomadoraTimer.maxRows = Number(localStorage.getItem('maxRows'))
        PomadoraTimer.startTrue = true;
    }

    start() {
        let timer = document.querySelector('#clock');
        let num = timer.textContent.split(':');
        this.#startingTime = timer.textContent


        function counting() {
            if (num[1] > 0) {
                num[1] = num[1] - 1;
            } else if (num[0] == 0 && num[1] == 0) {
                PomadoraTimer.startTrue = false;
                clearInterval(this.#interval)
                this.nextStep()
            } else {
                num[0] = num[0] - 1;
                num[1] = 59;
            }
            timer.textContent = `${String(num[0]).padStart(2, '0')}:${String(num[1]).padStart(2, '0')}`;
        }

        if (PomadoraTimer.startTrue) {
            this.#interval = setInterval(counting.bind(this), 1000);
        }

    }

    reset(){
        let timer = document.querySelector('#clock');
        timer.textContent = `25:00`;
        clearInterval(this.#interval)
        start.style.display = 'block';
        reset.style.display = 'none';
        this.#row = 0
    }


    nextStep() {
        let timer = document.querySelector('#clock');
        let pomadora = document.querySelector('#pomadoro');

        if (this.#startingTime === '25:00') {
            this.#row += 1;
            if (this.#row < 3) {
                pomadora.classList.add('shortBreak');
                pomadora.classList.remove('work');
                pomadora.classList.remove('longBreak');
                timer.textContent = `05:00`;
            } else if (this.#row === 3) {
                pomadora.classList.remove('shortBreak');
                pomadora.classList.remove('work');
                pomadora.classList.add('longBreak');
                timer.textContent = `15:00`;
            } else {
                timer.textContent = '25:00'
                start.style.display = 'block';
                reset.style.display = 'none';
                pomadora.classList.remove('shortBreak');
                pomadora.classList.add('work');
                pomadora.classList.remove('longBreak');
                this.#row = 0;
                localStorage.setItem('maxRows', (PomadoraTimer.maxRow + 1).toString())
                return;
            }

            PomadoraTimer.startTrue = true;
            this.start();
        } else {
            timer.textContent = `25:00`;
            pomadora.classList.remove('shortBreak');
            pomadora.classList.add('work');
            pomadora.classList.remove('longBreak');
            PomadoraTimer.startTrue = true;
            this.start();
        }
    }
}

let timer = new PomadoraTimer();
let start = document.querySelector('#start')
let reset = document.querySelector('#reset')
start.addEventListener('click', () => {
    timer.start();
    start.style.display = 'none';
    reset.style.display = 'block';
    console.log(PomadoraTimer.maxRows)
})
reset.addEventListener('click', () => {
    timer.reset();
})

localStorage.setItem('maxRows', '5')