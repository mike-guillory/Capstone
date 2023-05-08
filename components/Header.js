import html from "html-literal";

export default (state) => html`
<header>
  <h1 id="titleHeading">Bill Tracker</h1>
  <p id="currentWeather">The weather in ${state.city} is ${state.description} and ${state.temp}&deg F.</p>
</header>`;
