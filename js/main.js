const baseUrl = "https://api.weatherapi.com/v1/forecast.json";
const apiKey = "83923766e9194052b65122922241312";

async function displayData(city) {
  try {
    if (city.length >= 3) {
      const response = await fetch(`${baseUrl}?key=${apiKey}&q=${city}&days=3`);
      const data = await response.json();
      const forecast = data.forecast;

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      var date = new Date(forecast.forecastday[0].date);
      var currentDay = days[date.getDay()];
      var nextDay;
      var thirdDay;
      if (currentDay === "Saturday") {
        nextDay = days[0];
        thirdDay = days[1];
      } else if (currentDay === "Friday") {
        nextDay = days[date.getDay() + 1];
        thirdDay = days[0];
      } else {
        nextDay = days[date.getDay() + 1];
        thirdDay = days[date.getDay() + 2];
      }

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      var currentMonth = months[date.getMonth()];
      var blackBox = `
       <div class="col-lg-4 col-md-6 bg-dark col1">
                <div class="cart pb-4 px-4 pt-2 rounded-3">
                  <div
                    class="info-day d-flex bo align-items-center justify-content-between">
                    <span>${currentDay}</span>
                    <span>${date.getDate()}${currentMonth}</span>
                  </div>
                  <div class="location my-3">
                    <span class="display-5 fw-bolder">${
                      data.location.name
                    }</span>
                  </div>
                  <div class="degree">
                    <span class="fs-1 fw-bolder">${
                      data.current.temp_c
                    }<sup>o</sup>C</span>
                  </div>
                  <div class="icon1">
                    <img
                      src="https:${data.current.condition.icon}"
                      alt=""
                       />
                  </div>
                  <div class="state text-info my-2">${
                    data.current.condition.text
                  }</div>
                  <span class="me-3"
                    ><img
                      class="me-1"
                      src="images/icon-umberella.png"
                      alt="" />${data.current.humidity}%</span
                  >
                  <span class="me-3"
                    ><img
                      class="me-1"
                      src="images/icon-wind.png"
                      alt="" />${Math.round(data.current.wind_kph)}km/h</span
                  >
                  <span
                    ><img
                      class="me-1"
                      src="images/icon-compass.png"
                      alt="" />${data.current.wind_dir}</span
                  >
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col2" style="background-color: black">
                <div class="cart pb-4 px-4 pt-2 rounded-3">
                  <div
                    class="info-day d-flex align-items-center justify-content-between">
                    <span>${nextDay}</span>
                  </div>
                  <div class="icon my-4">
                    <img
                      src="https:${forecast.forecastday[1].day.condition.icon}"
                      alt=""
                      width="90" />
                    <div class="degree">
                      <span class="fs-1 fw-bolder">${
                        forecast.forecastday[1].day.maxtemp_c
                      }<sup>o</sup>C</span>
                    </div>
                    <div class="d-flex justify-content-center">
                      <span>${
                        forecast.forecastday[1].day.mintemp_c
                      }<sup>o</sup></span>
                    </div>
                    <div class="d-flex justify-content-center">
                      <span class="text-info">${
                        forecast.forecastday[1].day.condition.text
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col3 bg-dark">
                <div class="cart pb-4 px-4 pt-2 rounded-3">
                  <div
                    class="info-day d-flex align-items-center justify-content-between">
                    <span>${thirdDay}</span>
                  </div>
                  <div class="icon my-4">
                    <img
                      src="https:${forecast.forecastday[2].day.condition.icon}"
                      alt=""
                      width="90" />
                    <div class="degree">
                      <span class="fs-1 fw-bolder">${
                        forecast.forecastday[1].day.maxtemp_c
                      }<sup>o</sup>C</span>
                    </div>
                    <div class="d-flex justify-content-center">
                      <span>${
                        forecast.forecastday[1].day.mintemp_c
                      }<sup>o</sup></span>
                    </div>
                    <div class="d-flex justify-content-center">
                      <span class="text-info">${
                        forecast.forecastday[2].day.condition.text
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
      `;
      document.querySelector(".row").innerHTML = blackBox;
    }
  } catch (error) {
   
  }
}
var userIp;
document.addEventListener("DOMContentLoaded", async function () {
  // Fetch the IP address from the API
  const data = await fetch("https://api.ipify.org?format=json");
  const response = await data.json();
  userIp = response.ip;
  getCurrentLocation(userIp);
 
});
var currentCapital;
async function getCurrentLocation(currentip) {
  const data = await fetch(`https://apiip.net/api/check?ip=${currentip}
&accessKey=30dd9556-8884-42bb-8967-cdaeec921243`);
  const response = await data.json();
    currentCapital=response.capital;
    displayData(currentCapital);
}

let findCity = document.getElementById("find");
let inptCity = document.getElementById("cityInpt");
inptCity.addEventListener("input", function () {
  displayData(inptCity.value);
});
//or//
findCity.addEventListener("click", function () {
  displayData(inptCity.value);
});
