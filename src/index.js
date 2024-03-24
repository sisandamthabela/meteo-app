function updateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  let currentTime = `${day} ${hour}:${minute.toString().padStart(2, "0")},`;
  let formattedTime = document.querySelector("#formatted-time");
  formattedTime.innerHTML = currentTime;
}
setInterval(updateTime, 1000);
//

//

function updateWeather(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  console.log(response);
  let icon = document.querySelector("#icon");
  icon.innerHTML = `
    <img
      src="${response.data.condition.icon_url}"/>`;
}

function searchCity(city) {
  let apiKey = "7a60d36485to64ac27f9bab0d1cc4ca3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
searchCity("Johannesburg");
