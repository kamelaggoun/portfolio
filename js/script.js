/* ============================================================
   Kamel Aggoun — Portfolio
   js/script.js
   ------------------------------------------------------------
   Progressive enhancement only. Every feature below is optional:
   the site remains fully usable with JavaScript disabled
   (native <details>, checkbox navigation, CSS smooth scrolling).

   Contents:
   01. Bootstrapping (js class flag)
   02. Theme toggle (dark / light)
   03. Mobile navigation helpers
   04. Active navigation state (scroll spy)
   05. Project filtering
   06. Scroll reveal
   07. Back-to-top button
   08. Footer year
   ============================================================ */

(function () {
  "use strict";

  var doc = document;
  var html = doc.documentElement;

  /* ---------- 01. Bootstrapping ----------
     Marks the page as JS-enabled. CSS uses `html.js` to reveal
     interactive controls (theme toggle, filters, back-to-top) and to
     enable reveal animations only when they can actually run. */
  html.classList.add("js");

  /* ---------- 02. Theme toggle ---------- */
  var themeToggle = doc.getElementById("theme-toggle");

  function setThemeLabel() {
    if (!themeToggle) return;
    var dark = html.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var dark = html.getAttribute("data-theme") === "dark";
      var next = dark ? "light" : "dark";
      html.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) { /* storage unavailable — theme applies for this visit only */ }
      setThemeLabel();
    });
    setThemeLabel();
  }

  /* ---------- 03. Mobile navigation helpers ----------
     The menu itself is a pure-CSS checkbox toggle, so it works without
     JavaScript. These helpers just make it behave more like a menu. */
  var navToggle = doc.getElementById("nav-toggle");
  var navLinks = doc.querySelectorAll(".nav-links a");

  function closeMenu() {
    if (navToggle) navToggle.checked = false;
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ---------- 04. Active navigation state (scroll spy) ---------- */
  var sections = doc.querySelectorAll("main section[id]");
  var navMap = {};

  doc.querySelectorAll(".nav-link").forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") navMap[id.slice(1)] = link;
  });

  function onSectionChange(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var link = navMap[entry.target.id];
      if (!link) return;
      doc.querySelectorAll(".nav-link.active").forEach(function (active) {
        active.classList.remove("active");
      });
      link.classList.add("active");
    });
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(onSectionChange, {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0
    });
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- 05. Project filtering ---------- */
  var filterButtons = doc.querySelectorAll(".filter-btn");
  var projectCards = doc.querySelectorAll(".project-card");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter") || "all";

        filterButtons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });

        projectCards.forEach(function (card) {
          var tags = (card.getAttribute("data-tags") || "").toLowerCase().split(/\s+/);
          var match = filter === "all" || tags.indexOf(filter) !== -1;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------- 06. Scroll reveal ---------- */
  var revealItems = doc.querySelectorAll(".reveal");

  function revealAll() {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealAll();
  }

  /* ---------- 07. Back-to-top button ---------- */
  var backToTop = doc.getElementById("back-to-top");

  if (backToTop) {
    var ticking = false;

    function updateBackToTop() {
      if (window.scrollY > 480) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateBackToTop);
          ticking = true;
        }
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    updateBackToTop();
  }

  /* ---------- 08. Footer year ---------- */
  var year = doc.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
