let navDialog = document.getElementById("nav-dialog");
const nav = document.getElementById("navigation-menu");
const logo = document.getElementsByClassName("logo")[0];
const menu = document.getElementsByClassName("menu-button")[0];

const backToTopButton = document.getElementById("back-to-top");
const firstSection = document.getElementById("hero");

function handleMenu() {
  navDialog.classList.toggle("hidden");
  console.log(nav);
  nav.classList.toggle("backdrop-blur-md");
  logo.classList.toggle("hidden");
  menu.classList.toggle("hidden");
}

document.querySelectorAll("div a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > firstSection.offsetHeight / 5) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});
