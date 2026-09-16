(function () {
  "use strict";

  // Mobile nav
  var navToggle = document.getElementById("navToggle");
  var nav = document.querySelector(".nav");
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Scroll-spy nav: highlight the nav link for the section in view
  var navLinks = document.querySelectorAll(".nav a[href*='#']");
  var sectionMap = [];
  navLinks.forEach(function (link) {
    var hash = link.getAttribute("href").split("#")[1];
    var section = hash ? document.getElementById(hash) : null;
    if (section) sectionMap.push({ link: link, section: section });
  });
  if (sectionMap.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var match = sectionMap.filter(function (m) { return m.section === entry.target; })[0];
          if (!match) return;
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          match.link.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sectionMap.forEach(function (m) { spy.observe(m.section); });
  }

  // Case study password gate
  var lockForm = document.querySelector(".case-lock-card");
  if (lockForm) {
    var CASE_STUDY_PASSWORD = "springhill43";
    var lockInput = lockForm.querySelector(".case-lock-input");
    var lockError = lockForm.querySelector(".case-lock-error");
    lockForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (lockInput.value === CASE_STUDY_PASSWORD) {
        try { sessionStorage.setItem("cs_unlocked", "yes"); } catch (err) {}
        document.documentElement.classList.remove("cs-locked");
      } else {
        lockError.hidden = false;
        lockInput.value = "";
        lockInput.focus();
      }
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
