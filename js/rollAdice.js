class RollAdice{
    static alreadyCreatedCube = 0;
    #randCube;

    constructor() {
        RollAdice.alreadyCreatedCube += 1;
        this.#randCube = Math.floor(Math.random() * 6) + 1;
    }

    createCube () {
        let pic = document.createElement('img')
        pic.src = `../assets/img/dice${this.#randCube}.png`;
        pic.alt = `Dice${this.#randCube}`;
        pic.id = 'cube'
        return pic
    }

    back(){
        RollAdice.alreadyCreatedCube = 0;
        let allCube = document.querySelectorAll('#cube');
        allCube.forEach(el => {
            el.remove()
        })
    }
}
let el = new RollAdice();
let rollDice = document.querySelector('#rollDeices');
rollDice.addEventListener('click', roll);

document.addEventListener('keypress', (e) => {
    if (e.code === 'Enter') roll();
})


let restart = document.querySelector('#restart')
restart.addEventListener('click', () => {
    el.back()

})

function roll(){
    let input = document.querySelector('#roll');
    if (document.activeElement === input || document.querySelector('#rollDeices')){
        if(input.value !== 0 && input.value !== ''){
            for (let i = 0; i < input.value; i++) {
                let cube = new RollAdice();
                if (input.value > 7){
                    alert('You have get a max cubes!')
                    input.value = '';
                    break
                }
                if (RollAdice.alreadyCreatedCube < 5) {
                    document.querySelector('.firstFour').append(cube.createCube())
                } else {
                    document.querySelector('.lastTwo').append(cube.createCube())
                }
                if (RollAdice.alreadyCreatedCube > 6){
                    el.back()
                    roll()
                }
            }
            input.value = '';
        }
    }
}





