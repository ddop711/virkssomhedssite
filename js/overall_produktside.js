///////////////////////////// BURGER MENU ///////////////////////////////
document.getElementById("burger").onclick = () => {
  document.getElementById("menu").classList.toggle("open");
};

///////////////////////////// BURGER MENU ///////////////////////////////

//Test
const sword = document.getElementById("hotspotSword-2");
const overskrift = document.querySelector(".info-text > h2");
const underrubrik = document.querySelector(".placeholder");
const tekst1 = document.querySelector("#efficiency");
const tekst2 = document.querySelector("#requirement");

sword.addEventListener("mouseover", hoverSword);
function hoverSword() {
  sword.style.fill = "red";
}

sword.addEventListener("mouseout", outSword);
function outSword() {
  sword.style.fill = "white";
}

sword.addEventListener("click", clickSword);
function clickSword() {
  overskrift.textContent = "Sværd";
  underrubrik.textContent = "For at skade Enderdragen skal vi bruge våben. Få fat i et sværd, gerne af netherite, men diamant er også fint.";
  tekst1.innerHTML = `<img src="img/sword.png" alt="sword";">`;
}
