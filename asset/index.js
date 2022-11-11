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

var displayWeather = function (currentWeather, dailyWeather, city) {
  weatherContainer.innerHTML = "";

  var currentDay = document.createElement("div");
  currentDay.classList = "current-day card col-11";

  var forecast = document.createElement("div");
  forecast.classList = "row";

  var unixTimestamp = currentWeather.dt;

  var milliseconds = unixTimestamp * 1000;

  var dateObject = new Date(milliseconds);

  var humanDateFormat = dateObject.toLocaleString();

  var date = document.createElement("h3");
  date.textContent = city + " - " + humanDateFormat;

  var icon = document.createElement("img");
  icon.classList = "icon";
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`
  );

  var forecastHeading = document.createElement("h3");
  forecastHeading.textContent = "5 Day Forecast";

  var temp = document.createElement("p");
  temp.textContent = "Temperature: " + currentWeather.temp + "C";

  var humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + currentWeather.humidity + "%";

  var wind = document.createElement("p");
  wind.textContent = "Wind Speed: " + currentWeather.wind_speed + "km/h";

  var uv = document.createElement("p");
  uv.textContent = "UV Index: " + currentWeather.uvi;

  if (currentWeather.uvi < 3) {
    uv.style.color = "green";
  } else if (currentWeather.uvi < 7) {
    uv.style.color = "yellow";
  } else {
    uv.style.Color = "red";
  }

  weatherContainer.appendChild(currentDay);
  currentDay.appendChild(date);
  currentDay.appendChild(icon);
  currentDay.appendChild(temp);
  currentDay.appendChild(humidity);
  currentDay.appendChild(wind);
  currentDay.appendChild(uv);
  weatherContainer.appendChild(forecast);
  forecast.appendChild(forecastHeading);

  for (var i = 1; i < 6; i++) {
    var futContainer = document.createElement("div");
    futContainer.classList = "future-day card col-2";

    var unixFutTimestamp = dailyWeather[i].dt;

    var milliseconds = unixFutTimestamp * 1000;

    var dateObject = new Date(milliseconds);

    var humanFutDateFormat = dateObject.toLocaleString("en-US", {
      weekday: "long",
    });

    var futdate = document.createElement("h4");
    futdate.textContent = humanFutDateFormat;

    var futicon = document.createElement("img");
    futicon.classList = "futureIcon";
    futicon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${dailyWeather[i].weather[0].icon}.png`
    );

    var futtemp = document.createElement("p");
    futtemp.textContent = "Temperature: " + dailyWeather[i].temp.max + "C";

    var futhumidity = document.createElement("p");
    futhumidity.textContent = "Humidity: " + dailyWeather[i].humidity + "%";

    var futwind = document.createElement("p");
    futwind.textContent = "Wind Speed: " + dailyWeather[i].wind_speed + "km/h";

    var futuv = document.createElement("p");
    futuv.textContent = "UV Index: " + dailyWeather[i].uvi;

    forecast.appendChild(futContainer);
    futContainer.appendChild(futdate);
    futContainer.appendChild(futicon);
    futContainer.appendChild(futtemp);
    futContainer.appendChild(futhumidity);
    futContainer.appendChild(futwind);
    futContainer.appendChild(futuv);
  }
};

var searchHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityCords(city);
    saveCity(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City to view that City's weather");
  }
};

var saveCity = function (city) {
  cityNameBtn = document.createElement("button");
  cityNameBtn.classList = "col-12 btn btn-secondary";
  cityNameBtn.textContent = city;

  historyContainer.appendChild(cityNameBtn);

  cityNameBtn.addEventListener("click", function (event) {
    getCityCords(event.target.innerHTML);
  });
};

searchBtn.addEventListener("click", searchHandler);