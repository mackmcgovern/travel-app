const tripData = {};

// Global Variables
const overlay = document.querySelector(".overlay");
const userInputs = document.getElementById("user-inputs");
const tripInfo = document.querySelector(".trip-info");
const tripDisplay = document.getElementById("location");
const datesDisplay = document.getElementById("dates");
const weatherUI = document.getElementById("weather");
const destinationPic = document.querySelector("#destination-pic");
const locationErr = document.getElementById("locationErr");
const location = document.createElement("h2");
const dateHeader = document.createElement("h3");
const dateInfo = document.createElement("p");
const saveBtn = document.getElementById("save");
const deleteBtn = document.getElementById("delete");
const generateBtn = document.getElementById("generate");
const weatherHeader = document.createElement("h3");
const weatherInfoUI = document.createElement("p");

// get current date
let date = new Date();
let day = date.getUTCDate();
let month = date.getUTCMonth() + 1;
let year = date.getUTCFullYear();
let today = `${year}-${month}-${day}`;

const savedTrip = JSON.parse(localStorage.getItem("tripData"));

if (savedTrip) {
  const {
    arriveDate,
    arrival,
    departure,
    tripLength,
    city,
    state,
    country,
    maxTemp,
    minTemp,
    averageTemp,
    image,
  } = savedTrip;

  overlay.classList.remove("hidden");
  userInputs.classList.add("hidden");

  const count = Date.parse(arriveDate) - Date.parse(today);
  const countdown = Math.ceil(count / (1000 * 3600 * 24));

  if (city !== state) {
    location.innerHTML = `${city}, ${state}, ${country}`;
  } else {
    location.innerHTML = `${city}, ${country}`;
  }
  tripDisplay.append(location);

  saveBtn.classList.remove("hidden");
  saveBtn.textContent = "Edit Trip";

  dateHeader.textContent = `Trip details:`;
  dateInfo.innerHTML = `Arrival: ${arrival}<br>Departure: ${departure}<br>Trip Length: ${tripLength} days.<br>${countdown} Days away.`;
  datesDisplay.append(dateHeader, dateInfo);

  weatherHeader.textContent = `Weather Forcast:`;
  weatherInfoUI.textContent = `The predicted weather is a high of ${maxTemp}°F, a low of ${minTemp}°F and an average of ${averageTemp}°F`;
  weatherUI.append(weatherHeader, weatherInfoUI);

  destinationPic.setAttribute("src", image);
}

const handleSubmit = async (e) => {
  e.preventDefault();

  // input variables
  const cityInput = document.querySelector("#city").value;
  const arrive = document.querySelector("#arrival").value;
  const depart = document.querySelector("#departure").value;

  // create date variables
  console.log(`Today: ${today} arrive: ${arrive} depart: ${depart}`);
  console.log(Client.checkDates(arrive, today));
  console.log(Client.checkDates(depart, arrive));

  const lengthOfTrip = Client.dayCount(depart, arrive);
  console.log(length + " days long");
  const count = Client.dayCount(arrive, today);
  console.log(count + " days until trip");
  const arrival = Client.formatDate(arrive);
  // console.log(arrivalUI);
  const departure = Client.formatDate(depart);
  // console.log(departureUI);

  // verify user inputs
  let inputTest;

  if (!cityInput) {
    alert("Please enter a destination");
    inputTest = false;
  } else if (!arrive || !depart) {
    alert("Please enter your planned trip dates");
    inputTest = false;
  } else if (Client.checkDates(arrival, today) !== true) {
    alert(`Cannot select an arrival date before today's date`);
    inputTest = false;
  } else if (Client.checkDates(departure, arrival) !== true) {
    alert(`Cannot select a departure date earlier than arrival date`);
    inputTest = false;
  } else {
    inputTest = true;
  }

  if (inputTest != true) {
    saveBtn.disabled = true;
  }

  if (inputTest != false) {
    saveBtn.disabled = false;
    const userCity = {
      city: cityInput,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCity),
    };

    const response = await fetch("http://localhost:8082/api", options);
    const data = await response.json();

    // reset values
    tripDisplay.replaceChildren();
    datesDisplay.replaceChildren();
    weatherUI.replaceChildren();
    locationErr.replaceChildren();
    destinationPic.removeAttribute("src");

    if (data.geo === undefined) {
      const locationErrNote = document.createElement("p");
      locationErrNote.textContent =
        "Unable to retrieve data on the location entered. Please enter a new location.";
      locationErr.append(locationErrNote);
      // alert('Unable to retrieve data on the location entered. Please enter a new location.');
    } else {
      tripData.arriveDate = arrive;
      tripData.arrival = Client.formatDate(arrive);
      tripData.departure = Client.formatDate(depart);
      tripData.tripLength = lengthOfTrip;
      tripData.countdown = count;
      tripData.city = data.geo.toponymName;
      tripData.state = data.geo.adminName1;
      tripData.country = data.geo.countryName;
      tripData.maxTemp = data.weatherData.data[0].max_temp;
      tripData.minTemp = data.weatherData.data[0].min_temp;
      tripData.averageTemp = data.weatherData.data[0].temp;
      tripData.image = data.pixData.hits[0].largeImageURL;

      const {
        arriveDate,
        arrival,
        departure,
        tripLength,
        countdown,
        city,
        state,
        country,
        maxTemp,
        minTemp,
        averageTemp,
        image,
      } = tripData;

      if (city !== state) {
        location.innerHTML = `${city}, ${state}, ${country}`;
      } else {
        location.innerHTML = `${city}, ${country}`;
      }
      tripDisplay.append(location);

      dateHeader.textContent = `Trip details:`;
      dateInfo.innerHTML = `Arrival: ${arrival}<br>Departure: ${departure}<br>Trip Length: ${tripLength} days.<br>${countdown} Days away.`;

      datesDisplay.append(dateHeader, dateInfo);

      weatherHeader.textContent = `Weather Forcast:`;
      weatherInfoUI.textContent = `The predicted weather is a high of ${maxTemp}°F, a low of ${minTemp}°F and an average of ${averageTemp}°F`;
      weatherUI.append(weatherHeader, weatherInfoUI);

      destinationPic.setAttribute("src", image);

      overlay.classList.remove("hidden");

      console.log(tripData);

      saveBtn.classList.remove("hidden");
      deleteBtn.classList.remove("hidden");

      return tripData;
    }
  }
};

// functionality for saving, editing, or deleting a trip
saveBtn.addEventListener("click", () => {
  localStorage.setItem("tripData", JSON.stringify(tripData));
  const initialText = "Save Trip";
  if (saveBtn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    saveBtn.textContent = "Edit Trip";
  } else {
    saveBtn.textContent = initialText;
  }
  userInputs.classList.toggle("hidden");
  deleteBtn.classList.toggle("hidden");
  generateBtn.textContent = "Update Trip";
});

deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  deleteBtn.classList.add("hidden");
  saveBtn.classList.add("hidden");
  userInputs.classList.remove("hidden");
  overlay.classList.add("hidden");
  generateBtn.textContent = "Add Trip";

  tripDisplay.replaceChildren();
  datesDisplay.replaceChildren();
  weatherUI.replaceChildren();
  locationErr.replaceChildren();
  destinationPic.removeAttribute("src");

  tripData = {};
  return tripData;
});

export { handleSubmit };
