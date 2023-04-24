const date = new Date();
const year = date.getFullYear();
document.getElementById("date").innerHTML = year;

document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });