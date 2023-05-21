import html from "html-literal";

const titleHeading = `<h1 id="titleHeading">Bill Tracker</h1>`;

export default (weather) => html`
  <header>

    ${(() => {

      if (weather.temp) {
              return html`
                ${titleHeading}
                <p id="currentWeather">The weather in ${weather.city} is ${weather.description} and ${weather.temp}&deg F.</p>`
            }
            else{
              return html`
              <br/>${titleHeading}<br/>`
            }
    })()}
  </header>`;
