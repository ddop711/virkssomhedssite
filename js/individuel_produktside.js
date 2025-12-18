///////////////////////////// INDIVIDUEL PRODUKTSIDE ///////////////////////////////
// Denne fil styrer:
// - Alle accordions (produkt + FAQ)
// - Antalsvælgeren [- 1 +]
// - FAQ “vis flere/spørgsmål”
// - "Andre købte også" slider-pilene
// - "Tjek lager i butikker" demo-panelet
////////////////////////////////////////////////////////////////////////////////////

// ==========================
// SMOOTH ACCORDIONS
// (produkt-accordions + FAQ)
// ==========================

// Finder alle elementer med klassen .accordion (både i produktkortet, grøn sektion og FAQ)
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    // Accordionens indhold er altid næste søskende-element
    const content = accordion.nextElementSibling;

    // Hvis der ikke er et content-element, eller det ikke er en accordion__content → gør ingenting
    if (!content || !content.classList.contains("accordion__content")) return;

    // Tilføj/fjern visuel "åben" klasse på knappen (kan bruges til at rotere pil osv.)
    accordion.classList.toggle("accordion--open");

    const isOpen = content.classList.contains("accordion__content--open");

    if (isOpen) {
      // LUK: sæt maxHeight til 0 og fjern "open"-klassen
      content.style.maxHeight = 0;
      content.classList.remove("accordion__content--open");
    } else {
      // ÅBN: sæt maxHeight til indholdets fulde højde, så det animerer ud
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("accordion__content--open");
    }
  });
});

// ==========================
// ANTALSVÆLGER [- 1 +]
// ==========================

const qtyNumber = document.querySelector(".qty-number"); // tallet mellem knapperne
const qtyButtons = document.querySelectorAll(".qty-btn"); // minus- og plus-knap

if (qtyNumber && qtyButtons.length) {
  qtyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let value = parseInt(qtyNumber.textContent);
      // Max 99
      if (btn.textContent === "+" && value < 99) {
        value++;
      }
      // Min 1
      else if (btn.textContent === "-" && value > 1) {
        value--;
      }

      qtyNumber.textContent = value;
    });
  });
}

// ===================================
// FAQ: Vis kun de første 3 spørgsmål
// ===================================

// Knap nederst: "Se alle spørgsmål"
const faqToggleBtn = document.querySelector(".help-all-btn");

// Alle FAQ-overskrifter (knapper)
const faqButtons = document.querySelectorAll(".product-help__faq .help-accordion");

const faqContents = document.querySelectorAll(".product-help__faq .accordion__content");

// Skjul alle FAQ'er fra nr. 4 og frem (index 3+)
// Dvs. de første 3 er synlige, resten får .faq-hidden (display:none i CSS)
faqButtons.forEach((btn, index) => {
  if (index >= 3) {
    btn.classList.add("faq-hidden");
    const content = faqContents[index];
    if (content) {
      content.classList.add("faq-hidden");
    }
  }
});

// Klik på "Se alle spørgsmål" / "Skjul spørgsmål"
if (faqToggleBtn) {
  faqToggleBtn.addEventListener("click", () => {
    // Læs state fra data-attribut (true/false som string)
    const showingAll = faqToggleBtn.dataset.open === "true";

    faqButtons.forEach((btn, index) => {
      if (index >= 3) {
        const content = faqContents[index];

        if (showingAll) {
          // Hvis vi viser alle → skjul ekstra spørgsmål igen
          btn.classList.add("faq-hidden");
          if (content) content.classList.add("faq-hidden");
        } else {
          // Hvis vi kun viser 3 → vis resten
          btn.classList.remove("faq-hidden");
          if (content) content.classList.remove("faq-hidden");
        }
      }
    });

    // Opdatér knaptekst og state
    if (showingAll) {
      faqToggleBtn.textContent = "Se alle spørgsmål";
      faqToggleBtn.dataset.open = "false";
    } else {
      faqToggleBtn.textContent = "Skjul spørgsmål";
      faqToggleBtn.dataset.open = "true";
    }
  });
  faqToggleBtn.dataset.open = "false";
}

// ==========================
// "ANDRE KØBTE OGSÅ" – SLIDER
// ==========================
//
// Pile-knapperne scroller den horisontale .related-track container

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".related-track");
  const prevBtn = document.querySelector(".related-arrow--left");
  const nextBtn = document.querySelector(".related-arrow--right");

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 250; //

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

// ==========================================
// TJEK LAGER I BUTIKKER – INLINE VERSION
// ==========================================

// Fake butikdata – kun til visuel demo (ingen rigtig API)
const storesInline = [
  {
    name: "Helsam Nørrebro",
    city: "København N",
    postal: "2200",
    distanceKm: 0.6,
    stock: true,
    hours: "Åbent til 18:00",
  },
  {
    name: "Helsam Frederiksberg",
    city: "Frederiksberg",
    postal: "2000",
    distanceKm: 2.1,
    stock: false,
    hours: "Åbent til 19:00",
  },
  {
    name: "Helsam Fields",
    city: "København S",
    postal: "2300",
    distanceKm: 5.4,
    stock: true,
    hours: "Åbent til 20:00",
  },
];

// DOM-elementer til lagerpanelet
const checkStoreBtn = document.querySelector(".check-store-btn");
const storePanel = document.getElementById("storeCheckInline");
const zipcodeInput = document.getElementById("zipcode-inline");
const searchInlineBtn = document.getElementById("searchStoresInline");
const storeListInline = document.querySelector(".store-list-inline");
const closeStorePanelBtn = document.querySelector(".store-check-inline__close");

// Åbn / luk panelet under knappen
checkStoreBtn.addEventListener("click", () => {
  storePanel.classList.toggle("open");

  // Når panelet åbnes, sæt fokus i postnummer-feltet
  if (storePanel.classList.contains("open")) {
    zipcodeInput.focus();
  }
});

// Luk-panelet via kryds-knappen
closeStorePanelBtn.addEventListener("click", () => {
  storePanel.classList.remove("open");
});

// Funktion der renderer butikkerne i HTML-listen
function renderStores(zip) {
  if (!storeListInline) return;

  const normalized = zip.trim();
  storeListInline.innerHTML = "";

  // Sortér:
  // 1) Butikker hvor postnummer starter med input → øverst
  // 2) Derefter efter afstand (distanceKm)
  const sorted = [...storesInline].sort((a, b) => {
    const aMatch = normalized && a.postal.startsWith(normalized) ? 0 : 1;
    const bMatch = normalized && b.postal.startsWith(normalized) ? 0 : 1;

    if (aMatch !== bMatch) return aMatch - bMatch;
    return a.distanceKm - b.distanceKm;
  });

  // Byg <li> for hver butik
  sorted.forEach((store) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${store.name}</strong>
      <div class="store-meta">📍 ${store.city} · ca. ${store.distanceKm} km</div>
      <div class="store-status">
        <span class="${store.stock ? "dot-green" : "dot-red"}"></span>
        ${store.stock ? "På lager" : "Ikke på lager"}
      </div>
      <div class="store-hours">🕒 ${store.hours}</div>
      <a href="https://maps.google.com/?q=${encodeURIComponent(store.name)}" target="_blank">Vis i Maps</a>
    `;
    storeListInline.appendChild(li);
  });
}

// Klik på “Søg”-knappen i panelet
if (searchInlineBtn && zipcodeInput) {
  searchInlineBtn.addEventListener("click", () => {
    renderStores(zipcodeInput.value);
  });
}

// Tryk ENTER i inputfeltet → også søg
if (zipcodeInput) {
  zipcodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderStores(zipcodeInput.value);
    }
  });
}

const mainImg = document.querySelector(".product-main-img");
const thumbs = document.querySelectorAll(".product-media__thumbs img");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    mainImg.src = thumb.src;
  });
});

///////////////////////////// INDIVIDUEL PRODUKTSIDE ///////////////////////////////
