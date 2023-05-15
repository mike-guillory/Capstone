import html from "html-literal";

const titleHeading = `<h1 id="titleHeading">Bill Tracker</h1>`;

export default (state) => html`
  <header>

    ${(() => {

      if (state.temp) {
        return html`
          ${titleHeading}
          <p id="currentWeather">The weather in ${state.city} is ${state.description} and ${state.temp}&deg F.</p>`
      }
      else{
        return html`
        <br/>${titleHeading}<br/>`
      }

  })()}
  </header>`;
