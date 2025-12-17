///////////////////////////// BURGER MENU ///////////////////////////////
document.getElementById("burger").onclick = () => {
  document.getElementById("menu").classList.toggle("open");
};

///////////////////////////// BURGER MENU ///////////////////////////////
const searchBtn = document.querySelector(".cta_btn3");
const searchDropdown = document.getElementById("searchDropdown");

searchBtn.addEventListener("click", dropdown);

function dropdown() {
  if (searchDropdown.style.display === "flex") {
    searchDropdown.style.display = "none";
  } else {
    searchDropdown.style.display = "flex";
  }
}
