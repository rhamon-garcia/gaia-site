/* ==========================================================================
   Gaia Tecnologias e Geosistemas
   Navegação, revelações e formulário de contato
   ========================================================================== */

(function () {
  "use strict";

  /* Email usado pelo formulário de contato. */
  var CONTACT_EMAIL = "gaia.tecnologias1@gmail.com";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------------ */

  var toggle = document.querySelector(".nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var main = document.querySelector("main");
  var footer = document.querySelector(".footer");

  function setMenu(open) {
    if (!toggle || !mobileMenu) return;

    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    mobileMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);

    if (main) main.inert = open;
    if (footer) footer.inert = open;

    if (open) {
      window.setTimeout(function () {
        if (!mobileMenu.classList.contains("is-open")) return;
        var firstLink = mobileMenu.querySelector("a");
        if (firstLink) firstLink.focus();
      }, 60);
    } else if (document.activeElement && mobileMenu.contains(document.activeElement)) {
      toggle.focus();
    }
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        setMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1020 && mobileMenu.classList.contains("is-open")) {
        setMenu(false);
      }
    });
  }
  /* ------------------------------------------------------------------------
     Link ativo na navegação
     ------------------------------------------------------------------------ */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var navSections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (navSections.length) {
    var navTicking = false;

    function updateNavActive() {
      var marker = window.innerHeight * 0.4;
      var current = null;

      navSections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= marker) current = section;
      });

      navLinks.forEach(function (link) {
        if (current && link.getAttribute("href") === "#" + current.id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      navTicking = false;
    }

    function requestNavUpdate() {
      if (navTicking) return;
      navTicking = true;
      window.requestAnimationFrame(updateNavActive);
    }

    window.addEventListener("scroll", requestNavUpdate, { passive: true });
    window.addEventListener("resize", requestNavUpdate);
    updateNavActive();
  }

  /* ------------------------------------------------------------------------
     Revelação de seções no scroll
     ------------------------------------------------------------------------ */

  var reveals = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     Declaração com revelação palavra por palavra
     ------------------------------------------------------------------------ */

  var statement = document.querySelector("[data-statement]");

  if (statement && !prefersReduced) {
    var statementText = statement.textContent.trim();
    var words = statementText.split(/\s+/);

    statement.textContent = "";

    words.forEach(function (word, index) {
      var span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      statement.appendChild(span);
      if (index < words.length - 1) {
        statement.appendChild(document.createTextNode(" "));
      }
    });

    var wordEls = statement.querySelectorAll(".word");
    var statementTicking = false;

    function paintStatement() {
      var rect = statement.getBoundingClientRect();
      var start = window.innerHeight * 0.9;
      var end = window.innerHeight * 0.35;
      var progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      var lit = Math.ceil(progress * wordEls.length);

      wordEls.forEach(function (word, index) {
        word.classList.toggle("is-lit", index < lit);
      });

      statementTicking = false;
    }

    function requestStatementPaint() {
      if (statementTicking) return;
      statementTicking = true;
      window.requestAnimationFrame(paintStatement);
    }

    window.addEventListener("scroll", requestStatementPaint, { passive: true });
    window.addEventListener("resize", requestStatementPaint);
    paintStatement();
  }

  /* ------------------------------------------------------------------------
     Formulário de contato
     ------------------------------------------------------------------------ */

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form) {
    var validators = {
      name: function (value) {
        return value.trim().length >= 2 ? "" : "Informe seu nome.";
      },
      email: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
          ? ""
          : "Informe um email válido.";
      },
      company: function () {
        return "";
      },
      phone: function (value) {
        return value.replace(/\D/g, "").length >= 10
          ? ""
          : "Informe um telefone com DDD.";
      }
    };

    function fieldError(input, message) {
      var error = document.getElementById(input.id + "-error");
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (error) error.textContent = message;
      return !message;
    }

    function validateField(input) {
      var validator = validators[input.name];
      if (!validator) return true;
      return fieldError(input, validator(input.value));
    }

    var inputs = Array.prototype.slice.call(
      form.querySelectorAll("input[name='name'], input[name='email'], input[name='company'], input[name='phone']")
    );

    inputs.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value.trim() !== "") validateField(input);
      });

      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validateField(input);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var honeypot = form.querySelector("#website");
      if (honeypot && honeypot.value !== "") return;

      var firstInvalid = null;

      inputs.forEach(function (input) {
        var valid = validateField(input);
        if (!valid && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var data = {
        name: form.querySelector("[name='name']").value.trim(),
        email: form.querySelector("[name='email']").value.trim(),
        company: form.querySelector("[name='company']").value.trim(),
        phone: form.querySelector("[name='phone']").value.trim()
      };

      var subject = "Contato pelo site: " + data.name;
      var body = [
        "Nome: " + data.name,
        "Email: " + data.email,
        "Empresa: " + (data.company || "não informada"),
        "Telefone: " + data.phone,
        "",
        "Mensagem enviada pelo site da Gaia."
      ].join("\r\n");

      window.location.href =
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      if (status) {
        status.classList.remove("is-error");
        status.textContent =
          "Seu aplicativo de email deve abrir com a mensagem pronta. Se nada abrir, escreva para ";
        var statusLink = document.createElement("a");
        statusLink.href = "mailto:" + CONTACT_EMAIL;
        statusLink.textContent = CONTACT_EMAIL;
        status.appendChild(statusLink);
        status.appendChild(document.createTextNode("."));
      }
    });
  }

  /* ------------------------------------------------------------------------
     Ano no rodapé
     ------------------------------------------------------------------------ */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

