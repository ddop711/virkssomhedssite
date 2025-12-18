document.getElementById("burger").onclick = () => {
  document.getElementById("menu").classList.toggle("open");
};

const popoverButtons = document.querySelectorAll("[data-popover-target]");
const popoverPanels = document.querySelectorAll("[data-popover]");

if (popoverButtons.length && popoverPanels.length) {
  popoverButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.popoverTarget;
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const isOpen = panel.hasAttribute("data-open");

      // Luk alle andre popovers
      popoverPanels.forEach((p) => p.removeAttribute("data-open"));
      popoverButtons.forEach((b) => b.setAttribute("aria-expanded", "false"));

      // Hvis denne ikke var åben → åbn den
      if (!isOpen) {
        panel.setAttribute("data-open", "");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Luk popovers hvis man klikker udenfor
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-popover-target]") || event.target.closest("[data-popover]")) {
      return;
    }
    popoverPanels.forEach((p) => p.removeAttribute("data-open"));
    popoverButtons.forEach((b) => b.setAttribute("aria-expanded", "false"));
  });
}

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
