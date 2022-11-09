var searchBtn = document.querySelector(".btn-primary");
var cityInputEl = document.querySelector("#city");
var weatherContainer = document.querySelector("#weather-container");
var historyContainer = document.querySelector("#search-history");

var getCityCords = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=e9d7a3675952ed36817b457db72d2540";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var name = data.name;
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getCityWeather(lat, lon, name);
      });
    }
  });
};

var getCityWeather = function (lat, lon, name) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&exclude=minutely,hourly,alerts&appid=e9d7a3675952ed36817b457db72d2540";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data.current, data.daily, name);
      });
    } else {
      alert("unable to find this City");
    }
  });
};