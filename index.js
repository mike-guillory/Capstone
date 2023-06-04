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

  // IF DATA PAGE //////////////////////////////////////////////////
  if(state === store.Data){

    function setSeletedInList(id, valueToSelect) {
      let element = document.getElementById(id);
      element.value = valueToSelect;
     };

    // Populate Edit Bills Form with values of Bill clicked in Edit Bills Table /////////////
    const billDataList = document.querySelectorAll(".billData");

    billDataList.forEach(element => {
      element.addEventListener("click", () => {
        let id = element.parentNode.id;
        let thisBill = store.Data.bills.filter(bill => bill._id === id);

        document.getElementById("billId").setAttribute("value", id);
        document.getElementById("billName").setAttribute("value", thisBill[0].name);
        document.getElementById("billDueDate").setAttribute("value", thisBill[0].dueDate);
        document.getElementById("billAmount").setAttribute("value", thisBill[0].amount);
        document.getElementById("billPaidFrom").setAttribute("value", thisBill[0].paidFrom);

        setSeletedInList("billPaidFrom", thisBill[0].paidFrom);

      });
    });

    // Set value of billPaidFrom Select List when item selected in list
    document.getElementById("billPaidFrom").addEventListener("change", (Event) => {

      document.getElementById("billPaidFrom").setAttribute("value", Event.target.value);

    });
    // ///////////////////////////////////////////////////////////////////////////////////////

    // Populate Edit Paydays Form with values of PayDay clicked in Edit Paydays Table ////////
    const payDayDataList = document.querySelectorAll(".payDayData");
    payDayDataList.forEach(element => {
      element.addEventListener("click", () => {

      let id = element.parentNode.id;

      let thisPayDay = store.Data.payDays.filter(day => day._id === id);

      let payDate = new Date(thisPayDay[0].date).toISOString().substring(0, 10);

      document.getElementById("payDayId").setAttribute("value", id);
      document.getElementById("incomeSource").setAttribute("value", thisPayDay[0].paySource);
      document.getElementById("payDate").setAttribute("value", payDate);
      document.getElementById("payDayAmount").setAttribute("value", thisPayDay[0].amount);

      setSeletedInList("incomeSource", thisPayDay[0].paySource);
      setSeletedInList("payDate", payDate);

      });
    });

    // Set value of billPaidFrom Select List when item selected in list
    document.getElementById("incomeSource").addEventListener("change", (Event) => {
       document.getElementById("incomeSource").setAttribute("value", Event.target.value);

    });

   // Populate Edit Payment Source Form with values of Payment Source clicked in Edit Payment Sources Table ////////
   const paymentSourceDataList = document.querySelectorAll(".paymentSourceData");

   paymentSourceDataList.forEach(element => {
     element.addEventListener("click", () => {
       let id = element.parentNode.id;
       let thisPaymentSource = store.Data.paymentSources.filter(source => source._id === id);

       document.getElementById("paymentSourceId").setAttribute("value", id);
       document.getElementById("paymentSourceName").setAttribute("value", thisPaymentSource[0].name);

     });
   });

   // Populate Edit Income Source Form with values of Income Source clicked in Edit Income Sources Table ////////
   const incomeSourceDataList = document.querySelectorAll(".incomeSourceData");

   incomeSourceDataList.forEach(element => {
     element.addEventListener("click", () => {
       let id = element.parentNode.id;
       let thisIncomeSource = store.Data.incomeSources.filter(source => source._id === id);

       document.getElementById("incomeSourceId").setAttribute("value", id);
       document.getElementById("incomeSourceName").setAttribute("value", thisIncomeSource[0].name);
       document.getElementById("incomeSourceAmount").setAttribute("value", thisIncomeSource[0].amount);
      //  document.getElementById("incomeSourceFrequency").setAttribute("value", thisIncomeSource[0].frequency);
      //  document.getElementById("incomeSourceStartingDate").setAttribute("value", thisIncomeSource[0].startingDate);

     });
   });
 }

    // Add, Update, Delete ////////////////////////////////////////////////////////////////
    const buttons = Array.from(document.getElementsByClassName("button"));

    buttons.forEach(element => {
      element.addEventListener("click", () => {

      if(element.parentNode.id === "editBillsForm"){

        switch(element.value){
          case "Add":

            const addBill = element.parentNode.elements;

            const addBillData = {
              name: addBill.billName.value,
              amount: addBill.billAmount.value,
              dueDate: addBill.billDueDate.value,
              paidFrom: addBill.billPaidFrom.value
            }

            addData("bills", addBillData);

          break;
          case "Update":

            const updateBill = element.parentNode.elements;
            let billId = element.parentNode.firstElementChild.value;

            const billData = {
              name: updateBill.billName.value,
              amount: updateBill.billAmount.value,
              dueDate: updateBill.billDueDate.value,
              paidFrom: updateBill.billPaidFrom.value,
            }

            updateData("bills", billId, billData)

          break;
          case "Delete":

            let id = element.parentNode.firstElementChild.value;
            deleteData("bills", id);

          break;
        default:
        };
      };

      if(element.parentNode.id === "EditPayDaysForm"){
        switch(element.value){
          case "Add":

          const inputList = element.parentNode.elements;

          const requestData = {
            paySource: inputList.incomeSource.value,
            amount: inputList.payDayAmount.value,
            date: inputList.payDate.value
          }

          addData("payDays", requestData);

          break;
          case "Update":

            const updatedPayDay = element.parentNode.elements;
            let payId = element.parentNode.firstElementChild.value;

            const payData = {
              paySource: updatedPayDay.incomeSource.value,
              amount: updatedPayDay.payDayAmount.value,
              date: updatedPayDay.payDate.value
            }


            // console.log(`id = ${payId}`)
            // console.log(payData)
            updateData("payDays", payId, payData)

          break;
          case "Delete":

            let payDayId = element.parentNode.firstElementChild.value;
            deleteData("payDays", payDayId);

          break;
        default:
        };
      };

      if(element.parentNode.id === "editPaymentSourcesForm"){
        switch(element.value){
          case "Add":

          const inputList = element.parentNode.elements;

          const requestData = {
            name: inputList.paymentSourceName.value
          }

          addData("paymentSources", requestData);

          break;
          case "Update":

            const updatedPaymentSources = element.parentNode.elements;
            let paymentSourceId = element.parentNode.firstElementChild.value;

            const PaymentSourcesData = {
              name:  updatedPaymentSources.paymentSourceName.value
            }

            updateData("paymentSources", paymentSourceId, PaymentSourcesData)

          break;
          case "Delete":

            let id = element.parentNode.firstElementChild.value;
            deleteData("paymentSources", id);

          break;
        default:
        };
      };
      if(element.parentNode.id === "editIncomeSourcesForm"){
        switch(element.value){
          case "Add":

            const inputList = element.parentNode.elements;

            const requestData = {
              name: inputList.incomeSourceName.value,
              amount: inputList.incomeSourceAmount.value
            }

            addData("incomeSources", requestData);

          break;
          case "Update":

            console.log(element.parentNode.elements);
            const updatedIncomeSources = element.parentNode.elements;
            let incomeSourceId = element.parentNode.firstElementChild.value;

            const PaymentSourcesData = {
              name:  updatedIncomeSources.incomeSourceName.value,
              amount:  updatedIncomeSources.incomeSourceAmount.value
            }

            updateData("incomeSources", incomeSourceId, PaymentSourcesData)


          break;
          case "Delete":

            let id = element.parentNode.firstElementChild.value;
            deleteData("incomeSources", id);

          break;
        default:
        };
      };

      function addData(data, requestData){
        axios
        .post(`${process.env.BILLS_API_URL}/${data}`, requestData)
        .then(response => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      };

      function updateData(data, id, requestData){
        axios
        .put(`${process.env.BILLS_API_URL}/${data}/${id}`, requestData)
        .then(response => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      };
      function deleteData(data, id){
        axios
          .delete(`${process.env.BILLS_API_URL}/${data}/${id}`)
          .then(response => {
            window.location.reload();
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      };

    })});

    const date = new Date();
    const year = date.getFullYear();
    document.getElementById("date").innerHTML = year;
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
        Promise.allSettled([
          axios.get(`${process.env.BILLS_API_URL}/bills`),
          axios.get(`${process.env.BILLS_API_URL}/incomeSources`),
          axios.get(`${process.env.BILLS_API_URL}/payDays`)
        ])
        .then(responses => {
          const [bills, incomeSources, payDays] = responses;
          store.Schedule.bills = bills.value.data;
          store.Schedule.incomeSources = incomeSources.value.data;
          store.Schedule.payDays = payDays.value.data;

          // Empty columns array
          store.Schedule.columns.splice(0, store.Schedule.columns.length);

          store.Schedule.payDays.sort((a, b) => {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            else{
              return 0;
            }
          });

          store.Schedule.bills.sort((a, b) => {
            if (a.dueDate < b.dueDate) {
               return -1;
            }
            else if (a.dueDate > b.dueDate) {
              return 1;
            }
            else{
              return 0;
            }
          });

          function getMonthName(number){
            const date = new Date();
            date.setMonth(number - 1);
            return date.toLocaleString("en-US", {month: "short"});
          }

          // Convert payday dates "YYYY-MM-DDT00:00:00.000Z" to Epoc date
          // to compare with bill due date
          const pDays = store.Schedule.payDays.map((date) => {
            let shortDate = date.date.substring(0, 10)
            let epocDate = new Date(shortDate).getTime() + 60000000;
            return  epocDate;
          });
          let uniquePayDates = [...new Set(pDays)];

          // Sometimes need pay periods in yyyy-mm-dd
          const payPeriods = uniquePayDates.map((date) => {
            return new Date(date).toISOString().substring(0, 10);
          });
          let uniquePayPeriods = [...new Set(payPeriods)];
          store.Schedule["uniquePayPeriods"] = uniquePayPeriods;

          const schedule = [];
          const billsDue = [];

          // payMonths will be used to convert bill due dates from 1 or 2 digit
          // day of the month to yyyy-mm-dd for each month where there
          // are paydays
          const payMonths = uniquePayPeriods.map(period => {

            let year = parseInt(period.substring(0, 4));
            let month = parseInt(period.substring(5, 7));
            return `${year}-${month}`;
          });
          const uniquePayMonths = [...new Set(payMonths)];

          const billsDueByMonth = uniquePayMonths.map(date => {

              return store.Schedule.bills.map(bill => {

                let day = `${date.substring(0, 4)}-${date.substring(5, 7)}-${bill.dueDate}`;
                let epocDate = new Date(day).getTime() + 42000000;
                let monthName = getMonthName(date.substring(5, 7));
                return {
                  id: bill._id,
                  name: bill.name,
                  amount: bill.amount,
                  dueDate: `${monthName}-${bill.dueDate}`,
                  dueDateEpoc: epocDate,
                  paidFrom: bill.paidFrom
                };
              });
          });



          billsDueByMonth.map(bill => {
            bill.map(b => {
              billsDue.push(b);
            });
          });

          uniquePayDates.map((payDay, i, array) => {

              let payTotal = 0;
              let billTotal = 0;

              let month = getMonthName(uniquePayPeriods[i].substring(5, 7));
              let day = parseInt(uniquePayPeriods[i].substring(8, 10));
              let thisPayDate = `${month}-${day}`;

              store.Schedule.payDays.map(payday => {

                if(payday.date.substring(0, 10) === uniquePayPeriods[i]){

                  payTotal += payday.amount;
                };
              });

              let nextPayDay = array[i + 1];
              const thisPayPeriod = [];

              billsDue.map((bill, i, index) => {

                if(bill.dueDateEpoc >= payDay && !(bill.dueDateEpoc >= nextPayDay)){
                  thisPayPeriod.push(bill);
                  billTotal += bill.amount;
                  thisPayPeriod["payTotal"] = payTotal;
                  thisPayPeriod["billTotal"] = billTotal;
                  thisPayPeriod["left"] = payTotal - billTotal;
                }
                else{
                  thisPayPeriod["payTotal"] = payTotal;
                  thisPayPeriod["billTotal"] = billTotal;
                  thisPayPeriod["left"] = payTotal - billTotal;
                  thisPayPeriod["date"] = thisPayDate;
                };
              });
              schedule.push(thisPayPeriod);
          });

          store.Schedule["schedule"] = schedule;
          store.Schedule["index"] = 0;

          done();
        })
        .catch((error) => {
          console.log("Error:", error);
          done();
        });
        break;
      case "Data":
        Promise.allSettled([
          axios.get(`${process.env.BILLS_API_URL}/bills`),
          axios.get(`${process.env.BILLS_API_URL}/incomeSources`),
          axios.get(`${process.env.BILLS_API_URL}/paymentSources`),
          axios.get(`${process.env.BILLS_API_URL}/payDays`)
        ])
        .then(responses => {
          const [bills, incomeSources, paymentSources, payDays] = responses;
          store.Data.bills = bills.value.data;
          store.Data.incomeSources = incomeSources.value.data;
          store.Data.paymentSources = paymentSources.value.data;
          store.Data.payDays = payDays.value.data;

          store.Data.bills.sort((a, b) => {
            if (a.dueDate < b.dueDate) {
              return -1;
            }
            if (a.dueDate > b.dueDate) {
              return 1;
            }
            else{
              return 0;
            }
          })

          store.Data.payDays.sort((a, b) => {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            else{
              return 0;
            }
          })

          done();
        })
        .catch((error) => {
          console.log("Error:", error);
          done();
          });
        break;
      default:
      done();
    }
},
  already: (params) => {
    const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";
    render(store[view]);
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
