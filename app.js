const input = document.querySelector(".input");
const searchForm = document.querySelector(".search-container");
const temperatureE1 = document.querySelector(".temperature");
const conditionE1 = document.querySelector(".condition");
const humidityE1 = document.querySelector(".humidity strong");
const weatherIconE1 = document.querySelector(".weather-icon");
const forecastE1 = document.querySelector(".forecast");

const apiKey = "537953da19334b4099874647260611";
const baseUrl = "https://api.weatherapi.com/v1";

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchForm();
});

async function getWeatherData(city) {
    const res = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=3`);
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.Error ? data.Error.message : "Something went wrong. Try again");
    }
    return data;
}

async function search() {
    const city = input.value.trim();

    if(!city) {
        displayError("Please enter a city");
        return;
    }

    try {
        const data = await getWeatherData(city);
        displayWeatherInfo(data);
    }catch(error) {
        console.error(error);
        displayError(error.message);
    }
}