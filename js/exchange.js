class Currency {
    #API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    static currencyObj = []
    static start = false
    constructor() {
        fetch(this.#API_URL)
            .then(response => response.json())
            .then(json =>  json.forEach(
                val => Currency.currencyObj.push({
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
        let selectInput = document.querySelector('#inCountry')

        Currency.currencyObj.forEach(obj => {
            let option = document.createElement('option');
            option.value = obj.abb;
            option.textContent = `${obj.abb}   ${obj.txt}`;

            selectInput.append(option.cloneNode(true))

            if (obj.abb === 'USD'){
                option.selected = true;
                document.querySelector('#outerValue').value = exchangeValues.prototype.changing(document.querySelector('#inputValue').value, obj.rate, 0,selectOut.value==='UAH')
            }
            selectOut.append(option)
        });
    }

    displayChange = () =>{
        let selectInput = document.querySelector('#inCountry')
        let selectOut = document.querySelector('#outCountry')

        let inputValue = document.querySelector('#inputValue')
        let outerValue = document.querySelector('#outerValue')

        exchangeValues.prototype.changeToUUAH(selectOut, selectInput, inputValue, outerValue)

        selectInput.addEventListener('change', () =>{
            if (selectInput.value === 'UAH'){
                exchangeValues.prototype.changeToUUAH(selectOut, selectInput, inputValue, outerValue)
            }else {
                exchangeValues.prototype.changeForeign(selectOut, selectInput, inputValue, outerValue)
                Currency.start = true
            }
        })

    }

    get currencyList (){
        return Currency.currencyObj;
    }

    get start (){
        return Currency.start
    }
}

class exchangeValues extends Currency{

    changeToUUAH (selectOut, selectInput, inputValue, outerValue) {
        if (super.start){
            let tempObj = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
            inputValue.value = this.changing(outerValue.value, tempObj.rate, 0, selectInput.value==='UAH')        }

        inputValue.addEventListener('change', () => {
            let tempObj = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
            outerValue.value = this.changing(inputValue.value, tempObj.rate, 0, selectOut.value==='UAH')
        })

        outerValue.addEventListener('change', () => {
            let tempObj = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
            inputValue.value = this.changing(outerValue.value, tempObj.rate, 0, selectInput.value==='UAH')
        })

        selectOut.addEventListener('change', () => {
            let tempObj = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
            outerValue.value = this.changing(inputValue.value, tempObj.rate, 0, selectOut.value==='UAH')
        })
    }

    changeForeign(selectOut, selectInput, inputValue, outerValue){

        let tempObjOut = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
        let tempObjIn = super.currencyList.find(abbreviation => abbreviation.abb === selectInput.value)
        inputValue.value = this.changing(outerValue.value, tempObjIn.rate, tempObjOut.rate, null)

        inputValue.addEventListener('change', () => {
            if (selectInput.value !== 'UAH'){
                let tempObjOut = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
                let tempObjIn = super.currencyList.find(abbreviation => abbreviation.abb === selectInput.value)
                outerValue.value = this.changing(inputValue.value, tempObjOut.rate, tempObjIn.rate, null)
            }
        })

        outerValue.addEventListener('change', () => {
            if (selectInput.value !== 'UAH') {
                let tempObjOut = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
                let tempObjIn = super.currencyList.find(abbreviation => abbreviation.abb === selectInput.value)
                inputValue.value = this.changing(outerValue.value, tempObjIn.rate, tempObjOut.rate, null)
            }
        })

        selectOut.addEventListener('change', () => {
            if (selectInput.value !== 'UAH') {
                let tempObjOut = super.currencyList.find(abbreviation => abbreviation.abb === selectOut.value)
                let tempObjIn = super.currencyList.find(abbreviation => abbreviation.abb === selectInput.value)
                outerValue.value = this.changing(inputValue.value, tempObjOut.rate, tempObjIn.rate, null)
            }
        })
    }

    changing(currentValue, currentRate, convertTo, methodUAH){
        function UAHtoForeign(currentValue, currentRate) {
            return (Math.round((currentValue / currentRate) * 100) / 100).toString()
        }
        function toUAH(currentValue, currentRate){
            return (Math.round((currentValue * currentRate) * 100) / 100).toString()
        }
        function toForeign (){
            let inUAH = currentValue * currentRate
            return Math.round((inUAH / convertTo) * 100) / 100
        }

        switch (methodUAH){
            case true:
                return UAHtoForeign(currentValue, currentRate)
            case false:
                return toUAH(currentValue, currentRate)
            case null:
                return toForeign()
        }
    }

}

let a = new exchangeValues()