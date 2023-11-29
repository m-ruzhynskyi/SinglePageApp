class RollAdice{
    static alreadeCreatedCube = 0;
    #randCube;

    constructor() {
        RollAdice.alreadeCreatedCube += 1;
        this.#randCube = Math.floor(Math.random() * 6) + 1;
    }

    creareCube () {
        let pic = document.createElement('img')
        pic.src = `../assets/img/dice${this.#randCube}.png`;
        pic.alt = `Dice${this.#randCube}`;
        pic.id = 'cube'
        return pic
    }

    back(){
        RollAdice.alreadeCreatedCube = 0;
        let allCube = document.querySelectorAll('#cube');
        allCube.forEach(el => {
            el.remove()
        })
    }
}

let rollDice = document.querySelector('#rollDeices');
rollDice.addEventListener('click', roll);

document.addEventListener('keypress', (e) => {
    if (e.code === 'Enter') roll();
})


let restart = document.querySelector('#restart')
restart.addEventListener('click', () => {
    let el = new RollAdice();
    el.back()

})

function roll(){
    let input = document.querySelector('#roll');
    if(input.value !== 0 && input.value !== ''){
            for (let i = 0; i < input.value; i++) {
                let cube = new RollAdice();
                if (RollAdice.alreadeCreatedCube < 7){
                    if (RollAdice.alreadeCreatedCube < 5) {
                        document.querySelector('.firstFour').append(cube.creareCube())
                    } else {
                        document.querySelector('.lastTwo').append(cube.creareCube())

                    }
                }else{
                    console.log(RollAdice.alreadeCreatedCube)
                    alert('You have get a max cubes!')
                    break
                }
            }

    }
}





