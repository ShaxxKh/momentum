const time = document.getElementById("time"),
  focus = document.getElementById("focus"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  fullDate = document.getElementById("fullDate"),
  prevBtn = document.getElementById("previous"),
  nextBtn = document.getElementById("next"),
  blockquote = document.querySelector("blockquote"),
  figcaption = document.querySelector("figcaption"),
  refresh = document.getElementById("refresh"),
  weatherIcon = document.querySelector(".weather-icon"),
  temperature = document.getElementById("temperature"),
  weatherDescription = document.getElementById("weather-description"),
  city = document.getElementById("city"),
  humidity = document.getElementById("humidity"),
  windSpeed = document.getElementById("wind-speed");

function showTime() {
  let today = new Date(),
    month = today.getMonth(),
    date = today.getDate(),
    weekday = today.getDay(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

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
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  fullDate.innerHTML = `${weekdays[weekday]}, ${months[month]} ${date}`;
  time.innerHTML = `${hour}<span>:<span>${addZero(min)}<span>:<span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);

  function addZero(n) {
    return parseInt(n) < 10 ? `0${n}` : `${n}`;
  }
}

function setBackgroundGreeting() {
  let today = new Date(),
    hour = today.getHours();
  /*     ${Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1)) + Math.ceil(1))} */

  document.body.style.backgroundImage = `url('images/base-${Math.floor(
    Math.random() * (Math.floor(4) - Math.ceil(1)) + Math.ceil(1)
  )}/${hour}.jpg')`;
  
  if (hour < 6) {
    greeting.textContent = "Good Night, ";
  } else if (hour < 12) {
    greeting.textContent = "Good Morning, ";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon, ";
  } else if (hour < 24) {
    greeting.textContent = "Good Evening, ";
  }
}

function clearName() {
  if (name.textContent === "[Enter Name]") {
    name.textContent = "";
  }
}

function clearFocus() {
  if (focus.textContent === "[Enter Focus]") {
    focus.textContent = "";
  }
}

function clearCity() {
  if (city.textContent === "[Enter City") {
    city.textContent = "";
  }
}
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent === "") {
        localStorage.setItem("name", localStorage.getItem("name"));
        name.textContent = localStorage.getItem("name");
        name.blur();
      } else {
        localStorage.setItem("name", e.target.innerText);
        name.blur();
      }
    } else {
      localStorage.setItem("name", e.target.innerText);
    }
  } else if (e.type === "blur") {
    if (name.textContent === "") {
      name.textContent = localStorage.getItem("name");
      localStorage.setItem("name", localStorage.getItem("name"));
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

function setFocus(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent === "") {
        localStorage.setItem("focus", localStorage.getItem("focus"));
        focus.textContent = localStorage.getItem("focus");
        focus.blur();
      } else {
        localStorage.setItem("focus", e.target.innerText);
        focus.blur();
      }
    } else {
      localStorage.setItem("focus", e.target.innerText);
    }
  } else if (e.type === "blur") {
    if (focus.textContent === "") {
      focus.textContent = localStorage.getItem("focus");
      localStorage.setItem("focus", localStorage.getItem("focus"));
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

const base = `images/base-1/`;
/* ${Math.floor(
  Math.random() * (Math.floor(4) - Math.ceil(1)) + Math.ceil(1)
)} */
const images = [
  "0.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
];

function viewBgImage(data) {
  const src = data;
  document.body.style.backgroundImage = `url(${src})`;
}

let today = new Date();
let hour = today.getHours();

function getNextImage() {
  if (hour < 23) {
    const index = hour + 1;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    hour++;
  } else {
    hour = -1;
    const index = hour + 1;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    hour++;
  }
}

function getPrevImage() {
  if (hour > 0) {
    const index = hour - 1;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    hour--;
  } else {
    hour = 24;
    const index = hour - 1;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    hour--;
  }
}

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;

  const res = await fetch(url);
  const data = await res.json();

  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=52f2100e7ac59723290701a5b1e473bd&units=metric`;

  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed}`;
  weatherDescription.textContent = data.weather[0].description;
}

function getCity() {
  if (localStorage.getItem("city") === null) {
    city.textContent = "[Enter City]";
  } else {
    city.textContent = localStorage.getItem("city");
  }
}

function setCity(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (city.textContent === "") {
        localStorage.setItem("city", localStorage.getItem("city"));
        city.textContent = localStorage.getItem("city");
        city.blur();
      } else {
        localStorage.setItem("city", e.target.innerText);
        city.blur();
      }
    } else {
      localStorage.setItem("city", e.target.innerText);
    }
  } else if (e.type === "blur") {
    if (city.textContent === "") {
      city.textContent = localStorage.getItem("city");
      localStorage.setItem("city", localStorage.getItem("city"));
    }
  } else {
    localStorage.setItem("city", e.target.innerText);
  }
  getWeather();
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener("keypress", clearName);
focus.addEventListener("keypress", clearFocus);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
nextBtn.addEventListener("click", getNextImage);
prevBtn.addEventListener("click", getPrevImage);
document.addEventListener("DOMContentLoaded", getQuote);
refresh.addEventListener("click", getQuote);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);
document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
city.addEventListener("keypress", clearCity);

showTime();
setBackgroundGreeting();
getName();
getFocus();
getCity();
