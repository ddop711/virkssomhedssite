///////////////////////////// INDIVIDUEL PRODUKTSIDE ///////////////////////////////
// SMOOTH ACCORDIONS (gælder både produkt-accordions og FAQ)
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const content = accordion.nextElementSibling;
    if (!content || !content.classList.contains("accordion__content")) return;

    accordion.classList.toggle("accordion--open");

    const isOpen = content.classList.contains("accordion__content--open");

    if (isOpen) {
      // luk
      content.style.maxHeight = 0;
      content.classList.remove("accordion__content--open");
    } else {
      // åbn – højde følger indholdet
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("accordion__content--open");
    }
  });
});

// antal i kurv knap funktion
const qtyNumber = document.querySelector(".qty-number");
const qtyButtons = document.querySelectorAll(".qty-btn");

if (qtyNumber && qtyButtons.length) {
  qtyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let value = parseInt(qtyNumber.textContent);

      if (btn.textContent === "+" && value < 99) {
        value++;
      } else if (btn.textContent === "-" && value > 1) {
        value--;
      }

      qtyNumber.textContent = value;
    });
  });
}

// faq menu sektion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("open");

    const content = item.nextElementSibling;
    content.classList.toggle("open");
  });
});

// FAQ: vis kun de første 3 spørgsmål som standard
const faqToggleBtn = document.querySelector(".help-all-btn");
const faqButtons = document.querySelectorAll(
  ".product-help__faq .help-accordion"
);
const faqContents = document.querySelectorAll(
  ".product-help__faq .accordion__content"
);

// Skjul alle FAQ'er fra nr. 4 og frem (index 3+)
faqButtons.forEach((btn, index) => {
  if (index >= 3) {
    btn.classList.add("faq-hidden");
    const content = faqContents[index];
    if (content) {
      content.classList.add("faq-hidden");
    }
  }
});

// Når man klikker på "Se alle spørgsmål"
if (faqToggleBtn) {
  faqToggleBtn.addEventListener("click", () => {
    const showingAll = faqToggleBtn.dataset.open === "true";

    faqButtons.forEach((btn, index) => {
      if (index >= 3) {
        const content = faqContents[index];

        if (showingAll) {
          // Skjul ekstra spørgsmål
          btn.classList.add("faq-hidden");
          if (content) content.classList.add("faq-hidden");
        } else {
          // Vis ekstra spørgsmål
          btn.classList.remove("faq-hidden");
          if (content) content.classList.remove("faq-hidden");
        }
      }
    });

    // Opdatér knap-tekst og state
    if (showingAll) {
      faqToggleBtn.textContent = "Se alle spørgsmål";
      faqToggleBtn.dataset.open = "false";
    } else {
      faqToggleBtn.textContent = "Skjul spørgsmål";
      faqToggleBtn.dataset.open = "true";
    }
  });

  // start state
  faqToggleBtn.dataset.open = "false";
}

// "Andre købte også" slider
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".related-track");
  const prevBtn = document.querySelector(".related-arrow--left");
  const nextBtn = document.querySelector(".related-arrow--right");

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 250; // hvor meget der scrolles pr. klik

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

///////////////////////////// INDIVIDUEL PRODUKTSIDE ///////////////////////////////
