let searchWeather = document.querySelector("[searchWeather]");
let yourWeather = document.querySelector("[yourWeather]");
let city = document.querySelector(".city");
let weather = document.querySelector(".weather");
let temperature = document.querySelector(".temperature");
let tempImg = document.querySelector(".temperatureImg");
let windspeed = document.querySelector(".windPercent");
let humidity = document.querySelector(".humidPercent");
let clouds = document.querySelector(".cloudPercent");
let visibility1 = document.querySelector(".visibility1");
let visibility2 = document.querySelector(".visibility2");
let searchbtn = document.querySelector("#search");
let input = document.querySelector("input");
let weatherImg = document.querySelector(".weatherImg");
let flag = document.querySelector(".flag");
let visibility3 = document.querySelector(".visibility3");
let visibility4 = document.querySelector(".visibility4");
let city_name = "";
flag.style.display = "none";
visibility3.style.display = "none";
weatherImg.style.display = "none";

yourWeather.addEventListener("click", geoLocation);

function geoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fethchYourWeatherDetails);
  } else {
    console.log("geolocation access not provided");
  }
}

searchWeather.addEventListener("click", () => {
  visibility1.style.display = "none";
  visibility2.style.display = "flex";
  visibility4.style.display = "none";
});

yourWeather.addEventListener("click", () => {
  visibility1.style.display = "block";
  visibility2.style.display = "none";
});

searchbtn.addEventListener("click", () => {
  let value = input.value;
  if (value) {
    city_name = value;
    fethchWeatherDetails();
    visibility2.style.display = "none";
  }
});

input.addEventListener("keypress", (e) => {
  let value = input.value;
  if (e.key == "Enter") {
    city_name = value;
    fethchWeatherDetails();
    visibility2.style.display = "none";
  }
});

const API_key = "bf4f5f4c21a88203587b681896330b9d";

async function fethchYourWeatherDetails(position) {
  try {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    visibility1.style.display = "none";
    visibility3.style.display = "block";
    visibility4.style.display = "none";
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
    );
    let data = await resp.json();
    visibility1.style.display = "block";
    visibility3.style.display = "none";
    temperature.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    city.textContent = data?.name;
    humidity.textContent = `${data?.main?.humidity} %`;
    clouds.textContent = `${data?.clouds?.all} %`;
    windspeed.textContent = `${data?.wind?.speed} m/s`;
    weather.textContent = data?.weather[0]?.main;
    weatherImg.style.display = "block";
    weatherImg.src = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`;
    flag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    flag.style.display = "block";
  } catch (err) {
    visibility4.style.display = "block";
  }
}

async function fethchWeatherDetails() {
  try {
    visibility1.style.display = "none";
    visibility2.style.display = "none";
    visibility3.style.display = "block";
    visibility4.style.display = "none";
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`
    );
    let data = await resp.json();
    visibility1.style.display = "block";
    visibility3.style.display = "none";
    temperature.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    city.textContent = data?.name;
    humidity.textContent = `${data?.main?.humidity} %`;
    clouds.textContent = `${data?.clouds?.all} %`;
    windspeed.textContent = `${data?.wind?.speed} m/s`;
    weather.textContent = data?.weather[0]?.main;
    weatherImg.style.display = "block";
    weatherImg.src = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`;
    flag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    flag.style.display = "block";
  } catch (err) {
    visibility4.style.display = "block";
    visibility1.style.display = "none";
  }
  input.value = "";
}
