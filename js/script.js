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
   05. Project filtering (incl. featured / more groups)
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
        active.removeAttribute("aria-current");
      });
      link.classList.add("active");
      link.setAttribute("aria-current", "true");
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

  /* ---------- 05. Project filtering ----------
     Cards are filtered by their data-tags. Each group (featured /
     more) is hidden when none of its cards match, so no empty
     heading is left behind. Status is announced for screen readers. */
  var filterButtons = doc.querySelectorAll(".filter-btn");
  var projectCards = doc.querySelectorAll(".project-card");
  var projectGroups = doc.querySelectorAll(".projects-group");
  var filterStatus = doc.getElementById("filter-status");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter") || "all";
        var visible = 0;

        filterButtons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });

        projectCards.forEach(function (card) {
          var tags = (card.getAttribute("data-tags") || "").toLowerCase().split(/\s+/);
          var match = filter === "all" || tags.indexOf(filter) !== -1;
          card.classList.toggle("is-hidden", !match);
          if (match) visible++;
        });

        projectGroups.forEach(function (group) {
          var anyVisible = group.querySelector(".project-card:not(.is-hidden)");
          group.classList.toggle("is-hidden", !anyVisible);
        });

        if (filterStatus) {
          filterStatus.textContent = visible + (visible === 1 ? " project" : " projects") +
            " shown" + (filter === "all" ? "." : " for " + filter.replace(/-/g, " ") + ".");
        }
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

  /* ---------- 09. Print helper ----------
     Browsers do not print the contents of a closed <details>, so a
     printed or "Save as PDF" copy of the page would lose every project
     detail. Open the project cards before printing and restore the
     previous state afterwards. The certifications expander is left
     closed on purpose: it is an 80-entry archive, not page content. */
  var projectDetails = doc.querySelectorAll(".project-details");
  var openedForPrint = [];

  function openDetailsForPrint() {
    /* Note: openedForPrint is *not* reset here. Both the print media
       query and the beforeprint event can fire for the same print
       action, and resetting would lose track of the cards to restore. */
    projectDetails.forEach(function (d) {
      if (!d.open && openedForPrint.indexOf(d) === -1) {
        d.open = true;
        openedForPrint.push(d);
      }
    });
  }

  function restoreDetailsAfterPrint() {
    openedForPrint.forEach(function (d) {
      d.open = false;
    });
    openedForPrint = [];
  }

  if (projectDetails.length) {
    window.addEventListener("beforeprint", openDetailsForPrint);
    window.addEventListener("afterprint", restoreDetailsAfterPrint);

    if (window.matchMedia) {
      var printQuery = window.matchMedia("print");
      var onPrintChange = function (mql) {
        if (mql.matches) openDetailsForPrint();
        else restoreDetailsAfterPrint();
      };
      if (printQuery.addEventListener) {
        printQuery.addEventListener("change", onPrintChange);
      } else if (printQuery.addListener) {
        printQuery.addListener(onPrintChange); /* Safari < 14 */
      }
    }
  }
})();
