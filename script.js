async function getWeatherDataPromise(location) {
  let response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=VZSM7Q9XMW6W2UM6G695K9JFL`,
    { mode: "cors" }
  );
  if (response.status === 400) {
    return "locationError";
  } else {
    let responseJSON = await response.json();
    return responseJSON;
  }
}
function temperatureBasedOnUnit(unit, temperature) {
  switch (unit) {
    case "fahrenheit":
      return [temperature, "F"];
    case "celsius":
      return [Math.round((temperature - 32) * (5 / 9) * 100) / 100, "C"];
  }
}
function main() {
  let locationInput = document.querySelector("#location-input");
  let unit = document.querySelector("#unit");
  let locationDisplay = document.querySelector("#location");
  let rainChanceDisplay = document.querySelector("span.rainChance");
  let temperatureDisplay = document.querySelector("span.temperature");
  let humidityDisplay = document.querySelector("span.humidity");
  let windSpeedDisplay = document.querySelector("span.wind-speed");
  let mainFunction = async (event) => {
    if (event.keyCode === 13) {
      let weatherData = await getWeatherDataPromise(locationInput.value);
      if (weatherData === "locationError") {
        locationDisplay.innerText = "enter correct location";
        temperatureDisplay.innerText = "";
        rainChanceDisplay.innerText = "";
        humidityDisplay.innerText = "";
        windSpeedDisplay.innerText = "";
      } else {
        let humidity = weatherData.days[0].humidity;
        let chanceOfRain = `${weatherData.days[0].cloudcover} %`;
        let temperature = `${
          temperatureBasedOnUnit(unit.value, weatherData.days[0].temp)[0]
        } ${temperatureBasedOnUnit(unit.value, weatherData.days[0].temp)[1]}`;
        let windSpeed = weatherData.days[0].windspeed;
        locationDisplay.innerText = locationInput.value;
        temperatureDisplay.innerText = temperature;
        rainChanceDisplay.innerText = chanceOfRain;
        humidityDisplay.innerText = humidity;
        windSpeedDisplay.innerText = windSpeed;
      }
    }
  };
  document.addEventListener("keypress", mainFunction);
}
main();
