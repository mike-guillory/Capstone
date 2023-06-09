import html from "html-literal";

export default (state) => html`
<main>
<h2 class="pageHeading" >${state.pageHeading}</h2>
<div id="contactDiv">
  <form id="contactForm" action="https://formspree.io/f/mvondwrz" method="POST">
    <label for="fname">First Name: </label><input name="fname" id="fname" type="text"><br><br>
    <label for="lname">Last Name: </label><input name="lname" id="lname" type="text"><br><br>
    <label for="email">Email: </label><input name="email" id="email" type="email"><br><br>
    <label for="reason" id="areaLable">Reason for contacting us:</label><br>
    <textarea name="reason"></textarea><br><br>
    <input id="reason" type="submit" value="Submit">
  </form>
</div>
</main>`;
