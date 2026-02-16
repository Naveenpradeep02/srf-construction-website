document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menuBar = document.getElementById("menu-bar");
  const overlay = document.querySelector(".nav-overlay");
  const subMenu = document.querySelector(".sub-menu");
  const subList = document.querySelector(".sub-list");

  if (!hamburger || !menuBar || !overlay || !subMenu) return;

  const openMenu = () => {
    menuBar.classList.add("open");
    overlay.classList.add("show");
    hamburger.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    menuBar.classList.remove("open");
    overlay.classList.remove("show");
    hamburger.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    menuBar.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  // ✅ PRODUCTS CLICK OPEN
  const toggleSubMenu = () => {
    const isOpen = subMenu.classList.toggle("open");
    subMenu.setAttribute("aria-expanded", isOpen);
    if (subList) subList.setAttribute("aria-hidden", !isOpen);
  };

  subMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSubMenu();
  });

  // ✅ keyboard support
  subMenu.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSubMenu();
    }
  });

  // ✅ close when clicking outside
  document.addEventListener("click", (e) => {
    if (!subMenu.contains(e.target)) {
      subMenu.classList.remove("open");
      subMenu.setAttribute("aria-expanded", "false");
      if (subList) subList.setAttribute("aria-hidden", "true");
    }
  });
});
// founder
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      }
    });
  },
  { threshold: 0.25 },
);

obs.observe(document.getElementById("founderSection"));

const storyObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      }
    });
  },
  { threshold: 0.25 },
);

storyObs.observe(document.getElementById("companyStory"));
//
const prodObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

prodObs.observe(document.getElementById("productsSection"));

const slides = document.querySelectorAll(".hero-card");
let index = 0;

function showSlide(i) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[i].classList.add("active");

  // restart content animation
  const content = slides[i].querySelector(".hero-content");
  content.style.animation = "none";
  content.offsetHeight;
  content.style.animation = "";
}

// first slide
showSlide(index);

// auto slide every 4 seconds
setInterval(() => {
  index++;
  if (index >= slides.length) index = 0;
  showSlide(index);
}, 6000);

// contact
const form = document.getElementById("quoteForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop default redirect

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Your request has been submitted successfully!");
        form.reset();
        location.reload(); // refresh page
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(() => {
      alert("Network error. Please try again.");
    });
});
