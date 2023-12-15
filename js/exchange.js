class Currency {
    #API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    #currencyObj = []
    constructor() {
        fetch(this.#API_URL)
            .then(response => response.json())
            .then(json =>  json.forEach(
                val => this.#currencyObj.push({
                    abb: val['cc'],
                    rate: val['rate'],
                    txt: val['txt'],
                })
            ))
            .then(this.init)
            .then(this.displayChange)
    }

    init = () =>{
        let selectOut = document.querySelector('#outCountry')

        this.#currencyObj.forEach(obj => {
            let option = document.createElement('option');
            option.value = obj.abb;
            option.textContent = `${obj.abb}   ${obj.txt}`;

            if (obj.abb === 'USD'){
                option.selected = true;
                document.querySelector('#outerValue').value = this.change(document.querySelector('#inputValue').value, obj.rate, selectOut.value==='UAH')
            }
            selectOut.append(option)
        });
    }

    displayChange = () =>{
        let selectInput = document.querySelector('#inCountry')
        let selectOut = document.querySelector('#outCountry')

        let inputValue = document.querySelector('#inputValue')
        let outerValue = document.querySelector('#outerValue')

        inputValue.addEventListener('change', () => {
            let tempObj = this.#currencyObj.find(abbreviation => abbreviation.abb === selectOut.value)
            outerValue.value = this.change(inputValue.value, tempObj.rate, selectOut.value==='UAH')
        })

        outerValue.addEventListener('change', () => {
            let tempObj = this.#currencyObj.find(abbreviation => abbreviation.abb === selectOut.value)
            inputValue.value = this.change(outerValue.value, tempObj.rate, selectOut.value==='UAH')
        })

        selectOut.addEventListener('change', () => {
            let tempObj = this.#currencyObj.find(abbreviation => abbreviation.abb === selectOut.value)
            console.log(selectOut.value==='UAH')
            outerValue.value = this.change(inputValue.value, tempObj.rate, selectOut.value==='UAH')
        })
    }

    change(currentValue, currentRate, method){
        switch (method){
            case true:
                console.log(555)
                return (Math.round((currentValue / currentRate) * 100) / 100).toString()
            case false:
                return (Math.round((currentValue * currentRate) * 100) / 100).toString()
        }
    }
}

let a = new Currency()