class PomadoraTimer {
    static maxRow = 0;
    static startTrue = false;
    #row = 0;
    #interval;
    #startingTime

    constructor() {
        if (localStorage.getItem('maxRow')) PomadoraTimer.maxRow = Number(JSON.parse(localStorage.getItem('maxRow')).num)
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
        PomadoraTimer.startTrue = true;
        this.#row = 0;
    }


    nextStep() {
        let timer = document.querySelector('#clock');
        let pomadora = document.querySelector('#pomadoro');

        console.log(this.#startingTime)

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

                PomadoraTimer.maxRow += 1

                localStorage.setItem('maxRow', JSON.stringify({
                    num: (PomadoraTimer.maxRow),
                    date:  `${String(dateClass.getDate()).padStart(2, '0')}.${String(dateClass.getMonth() + 1).padStart(2, '0')}.${dateClass.getFullYear()}`
                }))

                this.addHistory()

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

    addHistory(data=`${String(dateClass.getDate()).padStart(2, '0')}.${String(dateClass.getMonth() + 1).padStart(2, '0')}.${dateClass.getFullYear()}`, maxRow = PomadoraTimer.maxRow){
        let historyBlock = document.querySelector('#historyBlock');
        if (historyBlock.firstChild) {
            historyBlock.removeChild(historyBlock.firstChild);
        }

        let p = document.createElement("p")
        p.insertAdjacentHTML("beforeend", `<span>${data}</span> ${maxRow} rows`)
        historyBlock.append(p)
    }
}

let timer = new PomadoraTimer();
let start = document.querySelector('#start')
let reset = document.querySelector('#reset')
let dateClass = new Date();
window.addEventListener('load', () => {
    if (localStorage.getItem('maxRow')){
        timer.addHistory(JSON.parse(localStorage.getItem('maxRow')).date, JSON.parse(localStorage.getItem('maxRow')).num)
    }
})
start.addEventListener('click', () => {
    timer.start();
    start.style.display = 'none';
    reset.style.display = 'block';
})
reset.addEventListener('click', () => {
    timer.reset();
})