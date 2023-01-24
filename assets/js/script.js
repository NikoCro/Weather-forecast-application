const searchBtnEl = document.getElementById("search-btn");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const cityName = document.getElementById("title");
const temp = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const descript = document.getElementById("description");
const apiKey = "a44b30a2ad958821dc48b2b37277f900";
console.log(cityName);
console.log(temp);
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
      console.log(data[0]);
      console.log(city);
      city.textContent = data[0].name;
      lat = data[0].lat;
      lon = data[0].lon;
    })
    .then(function () {
      getWeather();
    });
}
var date = new Date();
const currentDate = document.querySelector(".date");
const currentDay = document.querySelector(".day");
let week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function displayDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  currentDate.innerHTML = day + "/" + month + "/" + year;
}
displayDate();

function getWeather() {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      temperature.textContent = data[0].temperature;
      console.log(data[0]);
    });
}

searchBtnEl.addEventListener("click", getLatLong);
