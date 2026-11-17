// Idrees Travels — site scripts
(function () {
  var WHATSAPP_NUMBER = "923329409133";

  // Mobile navigation
  var body = document.body;
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Pre-select a service when arriving from a package button (contact.html?service=...)
  var serviceSelect = document.getElementById("service");
  if (serviceSelect) {
    var wanted = new URLSearchParams(window.location.search).get("service");
    if (wanted) {
      Array.prototype.forEach.call(serviceSelect.options, function (opt) {
        if (opt.value === wanted) serviceSelect.value = wanted;
      });
    }
  }

  // Contact form: sends the enquiry to WhatsApp (no server needed)
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var lines = [
        "Assalam o Alaikum Idrees Travels,",
        "",
        "Name: " + data.get("name"),
        "Phone: " + data.get("phone"),
        "Service: " + data.get("service"),
      ];
      if (data.get("travellers")) lines.push("Travellers: " + data.get("travellers"));
      if (data.get("date")) lines.push("Preferred date: " + data.get("date"));
      if (data.get("message")) lines.push("", data.get("message"));
      var url =
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }
})();
