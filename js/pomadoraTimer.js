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

        console.log(this.#startingTime)

        if (this.#startingTime === '0:10') {
            this.#row += 1;
            if (this.#row < 3) {
                pomadora.classList.add('shortBreak');
                pomadora.classList.remove('work');
                pomadora.classList.remove('longBreak');
                timer.textContent = `0:05`;
            } else if (this.#row === 3) {
                pomadora.classList.remove('shortBreak');
                pomadora.classList.remove('work');
                pomadora.classList.add('longBreak');
                timer.textContent = `00:10`;
            } else {
                timer.textContent = '0:20'
                start.style.display = 'block';
                reset.style.display = 'none';
                pomadora.classList.remove('shortBreak');
                pomadora.classList.add('work');
                pomadora.classList.remove('longBreak');
                this.#row = 0;
                localStorage.setItem('maxRows', (PomadoraTimer.maxRow + 1).toString())

                this.addHistory()

                return;
            }

            PomadoraTimer.startTrue = true;
            this.start();
        } else {
            timer.textContent = `0:10`;
            pomadora.classList.remove('shortBreak');
            pomadora.classList.add('work');
            pomadora.classList.remove('longBreak');
            PomadoraTimer.startTrue = true;
            this.start();
        }
    }
    addHistory(){
        let historyBlock = document.querySelector('#historyBlock');
        let dateClass = new Date();
        let date = `${dateClass.getDate()}.${dateClass.getMonth() + 1}.${dateClass.getFullYear()}`;
        let p = document.createElement("p")
        let span = document.createElement("span")
        span.textContent = date;
        p.textContent = `${PomadoraTimer.maxRows}`
        p.append(span)
        historyBlock.append(p)
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