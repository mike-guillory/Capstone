import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo("/");

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

function afterRender(){

  document.querySelector(".fa-bars").addEventListener("click", () => {
      document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });

  const date = new Date();
  const year = date.getFullYear();
  document.getElementById("date").innerHTML = year;
}
