"use strict";

let loader = document.querySelector('#loader');
let weatherCard = document.querySelector('#weatherCard');

function onCityChange() {
  let cityName;
  cityName = document.querySelector('#cityFormControl').value;
  if (cityName) {
    showLoader();
    getWeatherData(cityName);
  } else {
    removeWeatherCard();
  }
}

function getWeatherData(cityName) {
  let http = new XMLHttpRequest();
  let method = 'GET';
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=ad1fbda76cdc139e86e018fbc6c3ca75';

  http.open(method, url);
  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      let weatherData = JSON.parse(http.responseText);
      updateViewContent(cityName, weatherData);
    } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
      console.error('Error in calling api');
    }
  };
  http.send();
}

function updateViewContent(cityName, weatherData) {
  let weatherTemperature = document.querySelector('#weatherTemperature');
  let weatherCity = document.querySelector('#weatherCity');
  let weatherImage = document.querySelector('#weatherDescription').firstChild;
  let weatherDescription = document.querySelector('#weatherDescription').lastChild;
  weatherTemperature.textContent = (weatherData.main.temp).toFixed() + '℃';
  weatherCity.textContent = cityName == 'Vishakhapatnam' ? 'Visakhapatnam' : cityName;
  weatherDescription.textContent = weatherData.weather[0].description;
  weatherImage.src = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '.png';
  removeLoader();
}

function showLoader() {
  loader.setAttribute('style', 'display:flex !important');
  weatherCard.setAttribute('style', 'display:none !important');
}

function removeLoader() {
  setTimeout(() => {
    loader.setAttribute('style', 'display:none !important');
    weatherCard.setAttribute('style', 'display:flex !important');
  }, 500);
}

function removeWeatherCard() {
  weatherCard.setAttribute('style', 'display:none !important');
}