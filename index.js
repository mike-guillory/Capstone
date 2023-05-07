// Order matters in the root index.js file. Here's a guide:

// 1. Import statements
import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
// import axios from "axios";

// 2. Declaring router 
const router = new Navigo("/");

// 3. Render function
function render(state = store.Home){
  document.querySelector("#root").innerHTML =`
    ${Header()}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}
    `;

    afterRender();

    router.updatePageLinks();
}

// 4. Event Handler function
function afterRender(){

  document.querySelector(".fa-bars").addEventListener("click", () => {
      document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });

  const date = new Date();
  const year = date.getFullYear();
  document.getElementById("date").innerHTML = year;
}

// 5. Router.hooks
router.hooks({
  before: (done, params) => {
    const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Home":
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=houston`)
        .then(response => {
          // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
          const kelvinToFahrenheit = kelvinTemp =>
          Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
          store.Home.weather = {
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
        break;
        /////////////////////////////
        /////////////////////////////
        // Additional cases as needed
        /////////////////////////////
        /////////////////////////////
    }
  },
  already: (params) => {
    const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";
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
  }
})
.resolve();
