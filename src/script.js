/* Get current location 
function handlePosition(position) {
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);

	lat = position.coords.latitude;
	long = position.coords.longitude;

	let newapiURL2 = `https://api.shecodes.io/weather/v1/forecast?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;
	axios.get(newapiURL2).then(updateTemp);
}
*/

/* Add current day and time*/
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let now = new Date();
let day = days[now.getDay()];
let minutes = now.getMinutes();
let hours = now.getHours();

let sentence = `${day} ${hours}:${minutes}`;
let displayTime = document.querySelector("#display-time");
displayTime.innerHTML = `${sentence}`;

/* Add forecast day */
function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

/* Display 5-day forecast 
function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#forecastGroup");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
			<div class="col-2">
			<div class="weather-forecastDate">${formatDay(forecastDay.time)}</div>
			 <img
          src=${forecastDay.condition.icon_url}
          alt=""
          width="42"
        />
		<div class="forecast-temp-group>
			<span class="forecastGroup-temp-Max">${Math.round(
				forecastDay.temperature.maximum
			)}° </span>
			<span class="forecaseGroup-temp-Min">${Math.round(
				forecastDay.temperature.minimum
			)}°</span>
			</div>
		</div>
	`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}
*/

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector(".column-right-group");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 5) {
			forecastHTML =
				forecastHTML +
				`
                <div class="column-right-1 column width">
							<div class="card-title">${formatDay(forecastDay.time)}</div>
							<hr />
							<div class="card-body">
								<span class="Forecast-Group1-Temp-Max">${Math.round(
									forecastDay.temperature.maximum
								)}° </span>
								<span class="Forecast-Group1-Temp-Min">${Math.round(
									forecastDay.temperature.minimum
								)}°</span>
							</div>
							<div class="card-icon">
								<img
									src=${forecastDay.condition.icon_url}
									class="card-img-top"
									alt="..."
								/>
							</div>
					</div>
                `;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

/* Get forecast coordinates */
function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "b2ea4et64b5a1bff04fa67fca35a3boc";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
	axios.get(apiUrl).then(displayForecast);
}
/* Get current temp */
function displayTemp(response) {
	let temperatureElement = document.querySelector(".current-temp-value");
	temperatureElement.innerHTML = `${Math.round(
		response.data.daily[0].temperature.day
	)}`;

	let cityElement = document.querySelector(".current-city");
	cityElement.innerHTML = `${response.data.city}`;

	let descriptionElement = document.querySelector(".current-description");
	descriptionElement.innerHTML = `${response.data.daily[0].condition.description}`;

	let humidityElement = document.querySelector(".current-humidity-value");
	humidityElement.innerHTML = `${response.data.daily[0].temperature.humidity}`;

	let windElement = document.querySelector(".current-wind-value");
	windElement.innerHTML = `${response.data.daily[0].wind.speed}`;

	/*
	let iconElement = document.querySelector("#icon");
	iconElement.innerHTML = response.condition.icon_url;
*/
	getForecast(response.data.coordinates);
}

/* get city-input coordinates */
function search(city) {
	let apiKey = "b2ea4et64b5a1bff04fa67fca35a3boc";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
	axios.get(apiUrl).then(displayTemp);
}

/* handle city submit */
function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#form-input-city");
	search(cityInputElement.value);
}

let form = document.querySelector("#form-city");
form.addEventListener("submit", handleSubmit);

search("Tokyo");
