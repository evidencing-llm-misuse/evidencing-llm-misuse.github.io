/* =========================================================
   Evidencing LLM Misuse — KDD 2026 Tutorial
   Interactions: theme, nav, scroll-spy, reveals, copy
   ========================================================= */
(function () {
  "use strict";

  const doc = document.documentElement;

  /* ---------- Theme (persisted + system default) ---------- */
  const THEME_KEY = "kdd26-theme";
  const toggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    doc.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  const saved = (function () { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(doc.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Nav: scrolled shadow ---------- */
  const nav = document.getElementById("nav");
  function onScrollNav() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
    const toTop = document.getElementById("toTop");
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("navBurger");
  const links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      const open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll (with light stagger per group) ---------- */
  const reveals = document.querySelectorAll(".reveal");
  // give each reveal a stagger index relative to its siblings
  const seen = new Map();
  reveals.forEach(function (el) {
    const parent = el.parentElement;
    const idx = seen.get(parent) || 0;
    el.dataset.idx = idx;
    seen.set(parent, idx + 1);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = Math.min((+entry.target.dataset.idx || 0) * 70, 280);
          setTimeout(function () { entry.target.classList.add("is-in"); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Scroll-spy: active nav link ---------- */
  const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id], section[id]"));
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  const linkFor = {};
  navLinks.forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("is-active"); });
          const active = linkFor[entry.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Copy BibTeX ---------- */
  const copyBtn = document.getElementById("copyBibtex");
  const bib = document.getElementById("bibtex");
  if (copyBtn && bib) {
    copyBtn.addEventListener("click", function () {
      const text = bib.textContent;
      const done = function () {
        const original = copyBtn.textContent;
        copyBtn.textContent = "✓ Copied";
        copyBtn.classList.add("is-copied");
        setTimeout(function () { copyBtn.textContent = original; copyBtn.classList.remove("is-copied"); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else { fallback(); }
      function fallback() {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }
})();
