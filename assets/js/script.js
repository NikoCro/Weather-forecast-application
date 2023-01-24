const searchBtnEl = document.getElementById("search-btn");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const city = document.getElementById("title");
const temp = document.getElementById("temperatureToday");
const wind = document.getElementById("windToday");
const hum = document.getElementById("humidityToday");
const descript = document.getElementById("descriptionToday");
let currentDate = document.querySelector(".date");

let dailyWeather = [];
const apiKey = "a44b30a2ad958821dc48b2b37277f900";

displayDate();

document.addEventListener("DOMContentLoaded", () => {
  searchBtnEl.addEventListener("click", getLatLong);
  let today = JSON.parse(localStorage.getItem("today"));
  let week = JSON.parse(localStorage.getItem("forecast"));
  if (today) {
    document
      .querySelectorAll(".todayWrapper>p")
      .forEach((x) => x.classList.remove("hide"));
    city.textContent = localStorage.getItem("city");
    temp.textContent = today.temp;
    hum.textContent = today.humidity;
    wind.textContent = today.wind_speed;
    descript.textContent = today.weather[0].description;
    if (week) {
      forecast(week);
    }
  }
});

function getLatLong() {
  const cityName = cityInput.value;
  const stateCode = stateInput.value;
  const url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "," +
    stateCode +
    ",USA" +
    "&limit=3&appid=" +
    apiKey;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      city.textContent = data[0].name;
      localStorage.setItem("city", data[0].name);
      lat = data[0].lat;
      lon = data[0].lon;
    })
    .then(function () {
      getWeather();
    });
}

function displayDate() {
  let date = dayjs().format("dddd, MMMM D, YYYY");
  currentDate.textContent = date;
}

function getWeather() {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=minutely,hourly,alert `;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dailyWeather = data.daily;
      document
        .querySelectorAll(".todayWrapper>p")
        .forEach((x) => x.classList.remove("hide"));
      temp.textContent = data.current.temp;
      hum.textContent = data.current.humidity;
      wind.textContent = data.current.wind_speed;
      descript.textContent = data.current.weather[0].description;
      localStorage.setItem("today", JSON.stringify(data.current));
      localStorage.setItem("forecast", JSON.stringify(dailyWeather));
      forecast(dailyWeather);
    });
}

function forecast(daily) {
  for (let i = 0; 1 < daily.length; i++) {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let temperature = document.createElement("p");
    let humidity = document.createElement("p");
    let windSpeed = document.createElement("p");
    let description = document.createElement("p");
    let section = document.getElementById("forecast");
    div.classList.add("forecastWrapper");
    temperature.classList.add("temperature");
    humidity.classList.add("humidity");
    windSpeed.classList.add("wind");
    description.classList.add("description");
    let today = dayjs();
    h2.innerText = today.add(i + 1, "d").format("dddd");
    temperature.textContent = daily[i].temp.day;
    humidity.textContent = daily[i].humidity;
    windSpeed.textContent = daily[i].wind_speed;
    description.textContent = daily[i].weather[0].description;
    div.appendChild(h2);
    div.appendChild(temperature);
    div.appendChild(humidity);
    div.appendChild(windSpeed);
    div.appendChild(description);
    section.appendChild(div);
  }
}
