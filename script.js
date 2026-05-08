/* ===========================================
   RUBEL ROY – PORTFOLIO SCRIPTS
   =========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     0. LOADER
  ======================================== */
  const loader = document.getElementById("loader");
  setTimeout(() => {
    if (loader) {
      loader.classList.add("hidden");
      document.body.classList.add("ready");
    }
  }, 1900);


  /* ========================================
     1. CUSTOM CURSOR
  ======================================== */
  const dot  = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll("a, button, .btn, .project-card, .timeline-card, .ed-card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        ring.style.width  = "60px";
        ring.style.height = "60px";
        ring.style.borderColor = "rgba(0,212,255,0.7)";
      });
      el.addEventListener("mouseleave", () => {
        ring.style.width  = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(0,212,255,0.5)";
      });
    });
  } else {
    // Hide cursors on touch devices
    if (dot)  dot.style.display  = "none";
    if (ring) ring.style.display = "none";
  }


  /* ========================================
     2. HEADER: SCROLL & ACTIVE LINKS
  ======================================== */
  const header    = document.getElementById("header");
  const navLinks  = document.querySelectorAll(".nav-link");
  const sections  = document.querySelectorAll("section[id]");

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function setActiveLink() {
    let current = "";
    sections.forEach(section => {
      const sTop = section.offsetTop - 120;
      if (window.scrollY >= sTop) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", () => {
    updateHeader();
    setActiveLink();
  }, { passive: true });

  updateHeader();
  setActiveLink();


  /* ========================================
     3. HAMBURGER / MOBILE NAV
  ======================================== */
  const hamburger  = document.getElementById("hamburger");
  const nav        = document.getElementById("nav");
  const overlay    = document.getElementById("nav-overlay");

  function openNav() {
    nav.classList.add("open");
    overlay.classList.add("active");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    nav.classList.remove("open");
    overlay.classList.remove("active");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger?.addEventListener("click", () => {
    nav.classList.contains("open") ? closeNav() : openNav();
  });

  overlay?.addEventListener("click", closeNav);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });


  /* ========================================
     4. TYPING ANIMATION
  ======================================== */
  const words = [
    "Data Scientist Student.",
    "Machine Learning Enthusiast.",
    "AI Explorer.",
    "Physics Graduate.",
  ];
  let wordIdx = 0, charIdx = 0, deleting = false;
  const typeTarget = document.querySelector(".typing-animation");

  function type() {
    if (!typeTarget) return;
    const word = words[wordIdx];

    if (!deleting) {
      typeTarget.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) {
        setTimeout(() => { deleting = true; type(); }, 2000);
        return;
      }
      setTimeout(type, 90);
    } else {
      typeTarget.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    }
  }
  setTimeout(type, 1200);


  /* ========================================
     5. SCROLL REVEAL (Intersection Observer)
  ======================================== */
  const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Trigger skills when skills section enters
        if (entry.target.classList.contains("skills-section")) {
          animateSkillBars();
          animateCircles();
        }
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "-5% 0px -5% 0px"
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ========================================
     6. SKILL BARS
  ======================================== */
  function animateSkillBars() {
    document.querySelectorAll(".progress-fill").forEach(bar => {
      const target = bar.getAttribute("data-width");
      setTimeout(() => {
        bar.style.width = target + "%";
      }, 200);
    });
  }


  /* ========================================
     7. CIRCULAR SKILLS (SVG)
  ======================================== */
  // Inject gradient into first SVG
  const firstSvg = document.querySelector(".circle-skill svg");
  if (firstSvg) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#00d4ff"/>
        <stop offset="100%" stop-color="#0077ff"/>
      </linearGradient>`;
    firstSvg.prepend(defs);
  }

  function animateCircles() {
    document.querySelectorAll(".circle-skill").forEach(circle => {
      const percent = parseInt(circle.getAttribute("data-percent"), 10);
      const fill    = circle.querySelector(".fill");
      if (!fill) return;
      const circumference = 2 * Math.PI * 40; // r=40
      const offset = circumference * (1 - percent / 100);
      setTimeout(() => {
        fill.setAttribute("stroke-dasharray", `${circumference - offset} ${circumference}`);
        fill.setAttribute("stroke", "url(#circleGradient)");
      }, 300);
    });
  }


  /* ========================================
     8. VANTA.JS BACKGROUND
  ======================================== */
  function initVanta() {
    if (typeof VANTA !== "undefined" && typeof THREE !== "undefined") {
      VANTA.NET({
        el: "#vanta-canvas",
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00d4ff,
        backgroundColor: 0x020912,
        points: window.innerWidth < 768 ? 10 : 18,
        maxDistance: 22,
        spacing: 18,
      });
    }
  }

  // Wait for scripts to fully load
  if (typeof VANTA !== "undefined") {
    initVanta();
  } else {
    window.addEventListener("load", initVanta);
  }


  /* ========================================
     9. CONTACT FORM
  ======================================== */
  const form       = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    const origText = btn.innerHTML;

    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending…';
    btn.disabled  = true;

    // Simulate submission (replace with Formspree / EmailJS etc. for real deployment)
    setTimeout(() => {
      formStatus.textContent = "✓ Message sent! I'll get back to you soon.";
      formStatus.className   = "form-status success";
      form.reset();
      btn.innerHTML = origText;
      btn.disabled  = false;

      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.className   = "form-status";
      }, 5000);
    }, 1800);
  });


  /* ========================================
     10. FOOTER YEAR
  ======================================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ========================================
     11. SMOOTH SCROLL FOR ANCHOR LINKS
  ======================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerH = header?.offsetHeight ?? 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });


  /* ========================================
     12. PAGE ENTRANCE ANIMATION TRIGGER
  ======================================== */
  // Reveal hero content immediately after load
  setTimeout(() => {
    document.querySelectorAll(".hero .reveal-left, .hero .reveal-right").forEach(el => {
      el.classList.add("active");
    });
  }, 2100);

});
