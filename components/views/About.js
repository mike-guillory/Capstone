import html from "html-literal";

export default (state) => html`
<main>
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  <div id="aboutDiv">
    <p>This Bill Tracker is designed to help you get a quick, big-picture look at your bills and income situation from week to week.</p>
    <p>Once you’ve added your bill, income and payment sources into the Data page, as you enter each payday into the app, it will
      create a Bill Payment Schedule and display how much of your pay is left once the bills for that period have been paid.</p>
  </div>
</main>
`;
