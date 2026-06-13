/* =============================================================
   Hammurabi Restaurang – main.js
   Vanilla JS: mobilmeny, scrollspy, header-skugga,
   "Öppet nu / Stängt"-status och årtal i footern.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Öppettider (ENDA källan för tider) ----------
     Nyckel = veckodag enligt Date.getDay() (0 = söndag ... 6 = lördag).
     null = stängt. open/close i timmar (24h).                       */
  var HOURS = {
    0: { open: 11, close: 20 }, // Söndag
    1: null,                    // Måndag – stängt
    2: { open: 11, close: 20 }, // Tisdag
    3: { open: 11, close: 20 }, // Onsdag
    4: { open: 11, close: 20 }, // Torsdag
    5: { open: 11, close: 20 }, // Fredag
    6: { open: 11, close: 20 }  // Lördag
  };

  /* ---------- Hjälpare ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Öppet nu / Stängt ---------- */
  function getOpenState(now) {
    var day = now.getDay();
    var today = HOURS[day];
    var minutesNow = now.getHours() * 60 + now.getMinutes();

    if (today && minutesNow >= today.open * 60 && minutesNow < today.close * 60) {
      return {
        open: true,
        label: "Öppet nu",
        detail: "Stänger " + String(today.close).padStart(2, "0") + ".00"
      };
    }

    // Stängt – ta reda på nästa öppning
    for (var i = 0; i < 7; i++) {
      var d = (day + i) % 7;
      var spec = HOURS[d];
      if (!spec) continue;
      if (i === 0 && minutesNow < spec.open * 60) {
        return { open: false, label: "Stängt just nu", detail: "Öppnar idag " + String(spec.open).padStart(2, "0") + ".00" };
      }
      if (i > 0) {
        var dayNames = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
        var when = i === 1 ? "imorgon" : dayNames[d];
        return { open: false, label: "Stängt just nu", detail: "Öppnar " + when + " " + String(spec.open).padStart(2, "0") + ".00" };
      }
    }
    return { open: false, label: "Stängt just nu", detail: "" };
  }

  function renderStatus(now) {
    var state = getOpenState(now);
    var cls = state.open ? "status-open" : "status-closed";
    var html = '<span class="status-dot" aria-hidden="true"></span>' +
      "<span><strong>" + state.label + "</strong>" +
      (state.detail ? " · " + state.detail : "") + "</span>";

    var hero = $("#hero-status");
    if (hero) {
      hero.className = "hero-status " + cls;
      hero.innerHTML = html;
    }
    var hours = $("#hours-status");
    if (hours) {
      hours.className = "hours-status " + cls;
      hours.innerHTML = html;
    }

    // Markera dagens rad i öppettidslistan
    $$("#hours-list li").forEach(function (li) {
      li.classList.toggle("is-today", Number(li.getAttribute("data-day")) === now.getDay());
    });
  }

  /* ---------- Mobilmeny ---------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#main-nav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Öppna meny");
    }
    function openNav() {
      nav.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Stäng meny");
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("open")) { closeNav(); } else { openNav(); }
    });

    // Stäng menyn när en länk klickas (mobil)
    $$(".nav-link", nav).forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    // Stäng med Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Scrollspy + header-skugga ---------- */
  function initScrollSpy() {
    var header = $(".site-header");
    var links = $$(".nav-link");
    var sections = links
      .map(function (l) {
        var id = l.getAttribute("href");
        return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);

      var pos = window.scrollY + (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76) + 12;
      var currentId = null;
      sections.forEach(function (sec) {
        if (sec.offsetTop <= pos) currentId = sec.id;
      });
      links.forEach(function (l) {
        l.classList.toggle("active", l.getAttribute("href") === "#" + currentId);
      });
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { onScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    onScroll();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initScrollSpy();

    renderStatus(new Date());
    // Uppdatera statusen varje minut så den hålls aktuell
    setInterval(function () { renderStatus(new Date()); }, 60 * 1000);

    var yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
