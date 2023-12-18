class GetWeather {
    #APIKEY = 'df9c74ff1a47dcb48aab814fa5500429';
    static weatherList = [];
    static alreadyExist = false;
    #lat;
    #lon;
    _transferList;
    constructor(cityName) {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${this.#APIKEY}`)
            .then(obj => obj.json())
            .then(json => {
                this.#lon = json[0]['lon'];
                this.#lat = json[0]['lat'];
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.#lat }&lon=${this.#lon}&exclude=dayli&appid=${this.#APIKEY}&units=metric&lang=uk`);
            })
            .then(obj => obj.json())
            .then(json => {
                GetWeather.weatherList.push({
                    tempNow: json['main']['temp'],
                    icon: `https://openweathermap.org/img/wn/${json['weather'][0]['icon']}@2x.png`,
                    minTemp: json['main']['temp_min'],
                    feelsLike: json['main']['feels_like'],
                    humidity: json['main']['humidity'],
                })
            })
            .then(this.init)
    }
    init = () =>{
        if (GetWeather.alreadyExist){
            document.querySelector('.weatherBlock div').remove()
            GetWeather.alreadyExist = false
        }
        WeatherBuilt.prototype.built()
    }
}
class WeatherBuilt extends GetWeather{
    built(){
        let mainDiv = document.createElement('div')
        mainDiv.style.display = 'flex'
        mainDiv.style.justifyContent = 'space-between'

        let weatherDiv = document.createElement('div')
        weatherDiv.style.marginRight = '14%'

        let weatherImage, feelsLike, minTemp, humidity, tempNow;

        GetWeather.weatherList.forEach(el => {

            let temp = document.createElement('p')
            temp.innerHTML = `Temperature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${Math.round(el['tempNow'])} °C`
            temp.classList.add('weatherText')
            tempNow = temp

            let img = new Image()
            img.src = el['icon']
            weatherImage = img

            let feels = document.createElement('p')
            feels.innerHTML = `Feels like &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${Math.round(el['feelsLike'])} °C`
            feels.classList.add('weatherText')
            feelsLike = feels

            let min = document.createElement('p')
            min.innerHTML = `Min temperature &nbsp;&nbsp;&nbsp; ${Math.round(el['minTemp'])} °C`
            min.classList.add('weatherText')
            minTemp = min

            let hum = document.createElement('p')
            hum.innerHTML = `Humidity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${el['humidity']} %`
            hum.classList.add('weatherText')
            humidity = hum
        })

        weatherDiv.append(tempNow,feelsLike, minTemp, humidity)
        mainDiv.append(weatherImage, weatherDiv)
        document.querySelector('.weatherBlock').append(mainDiv)
        GetWeather.alreadyExist = true
    }
}

function startWeather() {
    let city = document.querySelector('#cityName').value
    if (city){
        new WeatherBuilt(city)
    }
}
window.addEventListener('load',startWeather );
document.querySelector('#submitCity').addEventListener('click', startWeather)
document.querySelector('#cityName').addEventListener('keypress', (e) => {
    let city = document.querySelector('#cityName').value
    if (city){
        if (e.key === 'Enter') startWeather()
    }
})