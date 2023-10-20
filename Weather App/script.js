const placeIntoDiv = document.getElementById("for-place");
const inputBar = document.getElementById("searchbar");
const searchbutton = document
  .getElementById("searchBtn")
  .addEventListener("click", changeName);
let cityName = "New York";

function changeName() {
  cityName = inputBar.value;
  GetweatherData();
}

function GetweatherData() {
  placeIntoDiv.innerHTML = "";
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=5TRCPC98WVTAHHNN5GYU3V2JN&contentType=json`
  )
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      const firstDiv = document.createElement("div");
      const secondDiv = document.createElement("div");
      const middleDiv = document.createElement("div");

      firstDiv.innerHTML = `
        <h3>${data.resolvedAddress}</h3>
        <p>${data.timezone}</p>
        <hr>
        <p>${data.description}</p>
        <hr>
        <div class='main-inside-div-first'>
        <div>
        <img src='./Images/latitude.png' class='weather-img' alt='flaticon image'>
        <p>Latitude: ${data.latitude}</p>
        </div>
        <div>
        <img src='./Images/longitude.png' class='weather-img' alt='flaticon image'>
        <p>Longitude: ${data.longitude}</p>
        </div>
        </div>
        `;

      secondDiv.innerHTML = `
        <h2>Current Weather Condition Of ${data.address}</h2>
        <div class='main-inside-div'>
        <div>
        <p>Condition: ${data.currentConditions.conditions}</p>
        </div>
        <div>
        <i class="fa-solid fa-smog"></i>
        <p>Humidity: ${data.currentConditions.humidity}</p>
        </div>
        <div>
        <i class="fa-solid fa-eye"></i>
        <p>Visibility: ${data.currentConditions.visibility}</p>
        </div>
        <div>
        <i class="fa-solid fa-calendar-days"></i>
        <p>Date Time: ${data.currentConditions.datetime}</p>
        </div>
        <div>
        <i class="fa-solid fa-solar-panel"></i>
        <p>Solar Energy: ${data.currentConditions.solarenergy}</p>
        </div>
        <div>
        <i class="fa-solid fa-sun"></i>
        <p>Sunrise: ${data.currentConditions.sunrise}</p>
        </div>
        <div>
        <i class="fa-solid fa-cloud-sun"></i>
        <p>Sunset: ${data.currentConditions.sunset}</p>
        </div>
        </div>
        `;

      middleDiv.innerHTML = `<h2>15 Days Weather Forecast For ${data.address}&nbsp&nbsp<i class="fa-solid fa-arrow-down"></i>`;
      placeIntoDiv.appendChild(firstDiv);
      placeIntoDiv.appendChild(secondDiv);
      placeIntoDiv.appendChild(middleDiv);
      firstDiv.classList.add("first-div");
      secondDiv.classList.add("second-div");
      middleDiv.classList.add("middle-div");

      const daysdata = data.days;
      const mainThirdDiv = document.createElement("div");
      let number = 1;
      daysdata.forEach((day) => {
        const thirdDiv = document.createElement("div");
        thirdDiv.innerHTML = `
        <h3>Day ${number++}</h3>
        <hr>
        <div class='main-inside-div-third'>
        <div class="condition">
        <p>Condition: ${day.conditions}</p>
        </div>
        <div>
        <i class="fa-solid fa-calendar-days"></i>
        <p>Date Time: ${day.datetime}</p>
        </div>
        <div>
        <i class="fa-solid fa-smog"></i>
        <p>Humidity: ${day.humidity}</p>
        </div>
        <div>
        <i class="fa-solid fa-eye"></i>
        <p>Visibility: ${day.visibility}</p>
        </div>
        <div>
        <i class="fa-solid fa-solar-panel"></i>
        <p>Solar Energy: ${day.solarenergy}</p>
        </div>
        <div>
        <i class="fa-solid fa-sun"></i>
        <p>Sunrise: ${day.sunrise}</p>
        </div>
        <div>
        <i class="fa-solid fa-cloud-sun"></i>
        <p>Sunset: ${day.sunset}</p>
        </div>
        <div>
        <i class="fa-solid fa-wind"></i>
        <p>Windspeed: ${day.windspeed}</p>
        </div>
        <div>
        <i class="fa-solid fa-snowflake"></i>
        <p>Snow: ${day.snow}</p>
        </div>
        <div>
        <i class="fa-solid fa-temperature-full"></i>
        <p>Temerature: ${day.temp}</p>
        </div>
        <div>
        <i class="fa-solid fa-temperature-low"></i>
        <p>Minimum Temerature: ${day.tempmin}</p>
        </div>
        <div>
        <i class="fa-solid fa-temperature-high"></i>
        <p>Maximum Temerature: ${day.tempmax}</p>
        </div>
        </div>
        `;
        mainThirdDiv.appendChild(thirdDiv);
        placeIntoDiv.appendChild(mainThirdDiv);
        mainThirdDiv.classList.add("main-third-div");
        thirdDiv.classList.add("third-div");
      });
    })
    .catch((error) => console.log(error));
}

GetweatherData();
