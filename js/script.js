// ===== 1. Automatic copyright year =====
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== 2. Responsive hamburger menu =====
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// ===== 3. Highlight the current page in the nav =====
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("#nav-links a").forEach(function (link) {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// ===== 4. Greeting based on time of day =====
const greeting = document.getElementById("greeting");
if (greeting) {
  const hour = new Date().getHours();
  let text;
  if (hour < 12) {
    text = "Good morning";
  } else if (hour < 18) {
    text = "Good afternoon";
  } else {
    text = "Good evening";
  }
  greeting.textContent = text + ", welcome to my portfolio!";
}

// ===== 5. Typing effect (array + loop + timer) =====
const typing = document.getElementById("typing");
if (typing) {
  const words = ["Industrial Automation Technologist", "PLC & HMI Programmer", "Engineering Technologist"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(type, 1500);   // pause when the word is complete
        typing.textContent = word;
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    typing.textContent = word.substring(0, charIndex);
    setTimeout(type, deleting ? 50 : 100);
  }
  type();
}

// ===== 6. "Read more" toggle (About page) =====
const readBtn = document.getElementById("read-more-btn");
const moreText = document.getElementById("more-text");
if (readBtn && moreText) {
  readBtn.addEventListener("click", function () {
    moreText.classList.toggle("hidden");
    readBtn.textContent = moreText.classList.contains("hidden") ? "Read more" : "Read less";
  });
}

// ===== 7. Accordion (About page) =====
document.querySelectorAll(".accordion-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.nextElementSibling.classList.toggle("hidden");
  });
});

// ===== 8. Tabs (Skills page) =====
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    tabButtons.forEach(function (b) { b.classList.remove("active"); });
    tabContents.forEach(function (c) { c.classList.add("hidden"); });
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.remove("hidden");
    animateBars();
  });
});

// ===== 9. Animated skill bars (Skills page) =====
function animateBars() {
  document.querySelectorAll(".bar-fill").forEach(function (bar) {
    bar.style.width = "0";
    setTimeout(function () {
      bar.style.width = bar.dataset.level + "%";
    }, 50);
  });
}
animateBars();

// ===== 10. Project filter (Projects page) =====
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");
filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    const filter = btn.dataset.filter;
    cards.forEach(function (card) {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ===== 11. Project modal (Projects page) =====
const modal = document.getElementById("modal");
if (modal) {
  document.querySelectorAll(".details-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("modal-title").textContent = btn.dataset.title;
      document.getElementById("modal-info").textContent = btn.dataset.info;
      modal.classList.remove("hidden");
      document.getElementById("close-modal").focus();
    });
  });
  const closeModal = function () {
    modal.classList.add("hidden");
  };
  document.getElementById("close-modal").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
}

// ===== 12. Contact form validation (compulsory) =====
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();                        // stop the page reloading
    let valid = true;

    const fields = ["name", "email", "subject", "message"];
    fields.forEach(function (id) {
      document.getElementById(id + "-error").textContent = "";
    });
    document.getElementById("success-msg").classList.add("hidden");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
      document.getElementById("name-error").textContent = "Please enter your name.";
      valid = false;
    }
    if (email === "") {
      document.getElementById("email-error").textContent = "Please enter your email.";
      valid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      valid = false;
    }
    if (subject === "") {
      document.getElementById("subject-error").textContent = "Please enter a subject.";
      valid = false;
    }
    if (message.length < 10) {
      document.getElementById("message-error").textContent = "Message must be at least 10 characters.";
      valid = false;
    }

    if (valid) {
      document.getElementById("success-msg").classList.remove("hidden");
      form.reset();
    }
  });
}