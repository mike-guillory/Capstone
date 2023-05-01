import html from "html-literal";

export default (state) => html`
<main>
  <h2 class="pageHeading" >${state.pageHeading}</h2>
  <div id="aboutDiv">
  </div>
</main>
`;
