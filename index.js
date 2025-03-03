function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#windspeed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let weathericonElement = document.querySelector("#icon");



    console.log(response.data);

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}mph`;
    weathericonElement.innerHTML = `<img src="${response.data.condition.icon_url}" class = "weather-icon" />`;
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes} `;
}

function searchCity(city) {
    let apiKey = "830tadf938b91ae8c48d5c76b1b7f01o";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Buffalo");