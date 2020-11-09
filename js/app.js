const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".detail");
const time = document.querySelector(".Time");
const icons = document.querySelector(".icon img");

//updating ui

const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;

  details.innerHTML = `
                <h3>${cityDets.EnglishName}</h5>
                <div>${weather.WeatherText}</div>
                <div class="cond">
                    <span class="temp">${weather.Temperature.Metric.Value}</span>
                    <span class="temp">&deg;C</span>
                </div>`;

  // change image according to the time.
  let timeimg = null;
  if (weather.IsDayTime) {
    timeimg = "images/day.svg";
  } else {
    timeimg = "images/night.svg";
  }
  time.setAttribute("src", timeimg);

  // setting icons

  const iconimg = `images/icons/${weather.WeatherIcon}.svg`;
  icons.setAttribute("src", iconimg);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getweather(cityDets.Key);

  return {
    cityDets: cityDets,
    weather: weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("place", city);
});

if (localStorage.getItem("place")) {
  updateCity(localStorage.getItem("place"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
