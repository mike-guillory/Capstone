// Order matters in the root index.js file. Here's a guide:

// 1. Import statements
import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

// 2. Declaring router
const router = new Navigo("/");

let weather = {};

// 3. Render function
function render(state = store.Home){
  document.querySelector("#root").innerHTML =`
    ${Header(weather)}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}
    `;

    afterRender(state);

    router.updatePageLinks();
}

// 4. Event Handler function
function afterRender(state){

  document.querySelector(".fa-bars").addEventListener("click", () => {
      document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });

    if(state === store.Data){

      document.querySelector("#payDayForm").addEventListener("submit", event => {
        event.preventDefault();

        console.log(document.querySelector("#incomeSource").value);
        console.log(document.querySelector("#payDate").value);
        console.log(document.querySelector("#payDayAmount").value);

      });

      const billDataList = document.querySelectorAll(".billData");

      billDataList.forEach(element => {
        element.addEventListener("click", () => {
          let id = element.parentNode.id;
          let thisBill = store.Data.bills.filter(bill => bill._id === id);

          document.getElementById("billName").setAttribute("value", thisBill[0].name);
          document.getElementById("billDueDate").setAttribute("value", thisBill[0].dueDate);
          document.getElementById("billAmount").setAttribute("value", thisBill[0].amount);
          document.getElementById("billPaidFrom").setAttribute("value", thisBill[0].paidFrom);

        });
      });

      const paymentSourceDataList = document.querySelectorAll(".paymentSourceData");

      paymentSourceDataList.forEach(element => {
        element.addEventListener("click", () => {
          let id = element.parentNode.id;
          let thisPaymentSource = store.Data.paymentSources.filter(source => source._id === id);

          document.getElementById("paymentSourceName").setAttribute("value", thisPaymentSource[0].name);

        });
      });

      const incomeSourceDataList = document.querySelectorAll(".incomeSourceData");

      incomeSourceDataList.forEach(element => {
        element.addEventListener("click", () => {
          let id = element.parentNode.id;
          let thisIncomeSource = store.Data.incomeSources.filter(source => source._id === id);

          document.getElementById("incomeSourceName").setAttribute("value", thisIncomeSource[0].name);
          document.getElementById("incomeSourceAmount").setAttribute("value", thisIncomeSource[0].amount);
          document.getElementById("incomeSourceFrequency").setAttribute("value", thisIncomeSource[0].frequency);
          document.getElementById("incomeSourceStartingDate").setAttribute("value", thisIncomeSource[0].startingDate);

        });
      });
      // ///////////////////////////////////////////////////////////////////
    }

  const date = new Date();
  const year = date.getFullYear();
  document.getElementById("date").innerHTML = year;
  // console.log(document.querySelector("thead > tr > th").nextElementSibling.innerHTML);
}

// 5. Router.hooks
router.hooks({
  before: (done, params) => {
    const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";

    let lat;
    let lon;
    // Get the users lat and lon to pass to the getWeather function where the axios.get now resides.
    // Since the weather is now part of the header, I need to get it no matter what page the user
    // navigates to.
    function getCoords(position){
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getWeather(lat, lon);
    };
    function errorCallback(error){
      console.log("Error:", error );
      done();
    };

    const postion = navigator.geolocation.getCurrentPosition(getCoords, errorCallback);

    function getWeather(lat, lon){
      axios
       .get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&lat=${lat}&lon=${lon}`)
       .then(response => {
          // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
          const kelvinToFahrenheit = kelvinTemp =>
          Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
            weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };
            done();
          })
          .catch((error) => {
              console.log("Error:", error );
              done();
          });
        };
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Schedule":
        axios
          .get(`${process.env.BILLS_API_URL}/bills`)
          .then(response => {
            store.Schedule.bills = response.data;
            done();
          })
          .catch((error) => {
            console.log("Error:", error);
            done();
          })
          axios
          .get(`${process.env.BILLS_API_URL}/incomeSources`)
          .then(response => {
            store.Schedule.incomeSources = response.data;
            done();
          })
          .catch((error) => {
            console.log("Error:", error);
            done();
          });
          store.Schedule.columns.splice(0, store.Schedule.columns.length);
        break;
    case "Data":
      axios
        .get(`${process.env.BILLS_API_URL}/bills`)
        .then(response => {
          store.Data.bills = response.data;
          done();
        })
        .catch((error) => {
          console.log("Error:", error);
          done();
        })
        axios
        .get(`${process.env.BILLS_API_URL}/incomeSources`)
        .then(response => {
          store.Data.incomeSources = response.data;
          done();
        })
        .catch((error) => {
          console.log("Error:", error);
          done();
        })
        axios
        .get(`${process.env.BILLS_API_URL}/paymentSources`)
        .then(response => {
          store.Data.paymentSources = response.data;
          done();
        })
        .catch((error) => {
          console.log("Error:", error);
          done();
        })
      break;
    default:
      done();
      // console.log("It puked", error);
}
},
  already: (params) => {
    const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";
    // render(store[view]);
  }
});

// 6.Router.on
router.on({
  "/": () => render(),
  ":view": params => {
    let view = capitalize(params.data.view);
    if(store.hasOwnProperty(view)){
      render(store[view]);
    }
    else{
      console.log(`View ${view} not defined.`);
    }
  },
},
)
.resolve();
