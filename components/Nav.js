import html from "html-literal";

export default (links) => html`
<nav>
<i class="fas fa-bars fa-xl"></i>
<ul class="hidden--mobile nav-links">
${links.map((link) =>
  `<li><a href="${link.title}" title"${link.title}" data-navigo>${link.text}<span class="pipes"> &nbsp; &nbsp;|</span></a></li>`).join("")}
</ul>
</nav>`;
