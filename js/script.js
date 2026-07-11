/* ==========================================================================
   Akhil Arya — Portfolio Scripts
   Vanilla JS only. Handles: theme toggle + persistence, mobile nav,
   scroll progress trail, reveal-on-scroll, hero typing animation,
   back-to-top, and lazy-loading fallback.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "akhil-theme";

  /* ---------------- Theme toggle ---------------- */
  function applyStoredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    return theme;
  }

  function initThemeToggle() {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ---------------- Mobile nav ---------------- */
  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-mobile-menu]");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function open() {
      menu.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------- Scroll progress bar ---------------- */
  function initScrollProgress() {
    var bar = document.querySelector("[data-scroll-progress]");
    if (!bar) return;
    function update() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + "%";
    }
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------------- Sticky header shadow + back-to-top ---------------- */
  function initHeaderAndBackToTop() {
    var header = document.querySelector(".site-header");
    var backToTop = document.querySelector("[data-back-to-top]");
    function update() {
      var scrolled = window.scrollY > 40;
      if (header) header.style.boxShadow = scrolled ? "var(--shadow-sm)" : "none";
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    }
    document.addEventListener("scroll", update, { passive: true });
    update();
    if (backToTop) {
      backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
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
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- Hero typing animation ---------------- */
  function initTypingAnimation() {
    var el = document.querySelector("[data-typed]");
    if (!el) return;
    var phrases;
    try {
      phrases = JSON.parse(el.getAttribute("data-typed"));
    } catch (e) {
      return;
    }
    if (!phrases || !phrases.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.textContent = phrases[0];
      return;
    }

    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var typeSpeed = 65;
    var deleteSpeed = 35;
    var holdTime = 1400;

    function tick() {
      var current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, holdTime);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }
    tick();
  }

  /* ---------------- Current year in footer ---------------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------- Lazy-load fallback ---------------- */
  function initLazyImages() {
    var imgs = document.querySelectorAll("img[loading='lazy']");
    imgs.forEach(function (img) {
      img.addEventListener("load", function () {
        img.classList.remove("lazy-img");
      });
    });
  }

  /* ---------------- Init ---------------- */
  applyStoredTheme();

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initMobileNav();
    initScrollProgress();
    initHeaderAndBackToTop();
    initReveal();
    initTypingAnimation();
    initYear();
    initLazyImages();
  });
})();
