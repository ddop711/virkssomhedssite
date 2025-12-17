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
const faqButtons = document.querySelectorAll(".product-help__faq .help-accordion");
const faqContents = document.querySelectorAll(".product-help__faq .accordion__content");

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

class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    }); //apparently slots only work with the shadow dom?
  }
  connectedCallback() {
    this.html = `<style>
      /****** LOGIN MODAL ******/
      #login-modal {
          background:black;
          position:fixed;
          width:100vw;
          height:100vh;
      }
      .loginmodal-container {
        padding: 30px;
        max-width: 350px;
        width: 100% !important;
        background-color: #F7F7F7;
        margin: 0 auto;
        border-radius: 2px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue", Arial, sans-serif;
      }
      .loginmodal-container h1 {
        text-align: center;
        font-size: 1.8em;
      }
      .loginmodal-container input[type=submit] {
        width: 100%;
        display: block;
        margin-bottom: 10px;
        position: relative;
      }
      input[type=password] {
        height: 44px;
        font-size: 16px;
        width: 100%;
        margin-bottom: 10px;
        -webkit-appearance: none;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-top: 1px solid #c0c0c0;
        padding: 0 8px;
        box-sizing: border-box;
      }
      input[type=password]:hover {
        border: 1px solid #b9b9b9;
        border-top: 1px solid #a0a0a0;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
      }
      .loginmodal {
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        height: 36px;
        padding: 0 8px;
      }
      .loginmodal-submit {
        border: 0px;
        color: #fff;
        text-shadow: 0 1px rgba(0,0,0,0.1); 
        background-color: #4d90fe;
        padding: 17px 0px;
        font-size: 14px;
      }
      .loginmodal-submit:hover {
        border: 0px;
        text-shadow: 0 1px rgba(0,0,0,0.3);
        background-color: #357ae8;
      }
    </style>
    <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="loginmodal-container">
          <h1>Login</h1><br>
          <p>This is a school project</p>
          <p>The password is <code>ek</code></p>
          <form>
            <input type="password" name="pass" placeholder="Password">
            <input type="submit" name="login" class="login loginmodal-submit" value="Login">
          </form>
        </div>
      </div>
    </div>`;
    this.render();

    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.shadowRoot.querySelector("input[name=pass]").value === "ek") {
        document.querySelector("#totally-delete-me").remove();
        localStorage.setItem("iform-totally-logged-in", true);
      }
    });
  }
  render() {
    this.shadowRoot.innerHTML = this.html;
  }
}
customElements.define("iform-login", Login);
window.addEventListener("load", () => {
  if (!localStorage.getItem("iform-totally-logged-in")) {
    const div = document.createElement("div");
    div.id = "totally-delete-me";
    div.style.width = "100vw";
    div.style.height = "100vh";
    div.style.position = "fixed";
    div.style.zIndex = "9999";

    div.innerHTML = "<iform-login />";
    document.body.prepend(div);
  }
});
