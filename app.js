const input = document.querySelector(".input");
const searchForm = document.querySelector(".search-container");
const temperatureEl = document.querySelector(".temperature");
const conditionEl = document.querySelector(".condition");
const humidityEl = document.querySelector(".humidity strong");
const weatherIconEl = document.querySelector(".weather-icon");
const forecastEl = document.querySelector(".forecast");

const apiKey = "537953da19334b4099874647260611";
const baseUrl = "https://api.weatherapi.com/v1";

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    search();
});

async function getWeatherData(city) {
    const res = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=3`);
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.error ? data.error.message : "Something went wrong. Try again");
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

function displayWeatherInfo(data) {
    temperatureEl.textContent = Math.round(data.current.temp_c) + "°";
    conditionEl.textContent = data.current.condition.text;
    humidityEl.textContent = data.current.humidity + "%";
    weatherIconEl.src = `https:${data.current.condition.icon}`;
    weatherIconEl.alt = data.current.condition.text;

    displayForecast(data.forecast.forecastday);
}

function displayForecast(days) {
    forecastEl.innerHTML = "";

    days.forEach(day => {
        const dayName = new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {weekday:"long"});

        const card = document.createElement("div");
        card.className = "forecast-day";
        card.innerHTML = `
            <p>${dayName}</p>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°</p>
         `;
         forecastEl.appendChild(card);
    });
}

function displayError(message) {
    alert(message);
}