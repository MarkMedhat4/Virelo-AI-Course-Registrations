/**
 * Virelo Academy — script.js
 * Vanilla JS only. No external dependencies.
 *
 * SETUP: paste your Google Apps Script Web App URL below.
 * See README.md, section "Google Sheets Integration", for the full steps.
 */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzUbCwZY1mMVs5xJTY8ePkds_cM7rJr4pMAOF0-TTD0cixV3lMq9M4A8J1dScCKXlcW/exec"; // <-- paste your deployed Apps Script Web App URL here

(() => {
  "use strict";

  /* ---------------------------------------------------
     Loading screen
  --------------------------------------------------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader && loader.classList.add("is-hidden"), 350);
  });

  /* ---------------------------------------------------
     Sticky navbar + mobile menu
  --------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener(
    "scroll",
    () => navbar.classList.toggle("is-scrolled", window.scrollY > 30),
    { passive: true }
  );

  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("is-open");
    navLinks.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll(".navbar__link").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-open");
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------
     Scroll reveal
  --------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------
     Timeline reveal + progress line
  --------------------------------------------------- */
  const timelineList = document.getElementById("timelineList");
  const itemObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
    { threshold: 0.3 }
  );
  document.querySelectorAll(".timeline__item").forEach((el) => itemObserver.observe(el));

  if (timelineList) {
    const progressBar = document.createElement("div");
    progressBar.className = "timeline__progress";
    timelineList.appendChild(progressBar);

    const updateProgress = () => {
      const rect = timelineList.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const scrolled = Math.min(Math.max(start - rect.top, 0), rect.height);
      progressBar.style.height = `${(scrolled / rect.height) * 100}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------------------------------------------------
     Footer year
  --------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------
     Button ripple effect
  --------------------------------------------------- */
  document.querySelectorAll(".btn--ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  /* ---------------------------------------------------
     Registration form: validation + submit
  --------------------------------------------------- */
  const form = document.getElementById("registerForm");
  const submitBtn = document.getElementById("submitBtn");
  const modal = document.getElementById("successModal");
  const modalClose = document.getElementById("modalClose");
  const modalOk = document.getElementById("modalOk");

  const EG_PHONE_RE = /^01[0125][0-9]{8}$/;

  function setError(fieldName, message) {
    const errorEl = document.getElementById(`err-${fieldName}`);
    const wrapper = errorEl ? errorEl.closest(".form-field") : null;
    if (errorEl) errorEl.textContent = message;
    if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
  }

  function validate(data) {
    let valid = true;

    if (!data.studentName.trim()) {
      setError("studentName", "من فضلك أدخل اسم الطالب الثلاثي");
      valid = false;
    } else if (data.studentName.trim().split(/\s+/).length < 3) {
      setError("studentName", "من فضلك أدخل الاسم ثلاثيًا");
      valid = false;
    } else setError("studentName", "");

    if (!data.grade) {
      setError("grade", "من فضلك اختر الصف الدراسي");
      valid = false;
    } else setError("grade", "");

    if (!data.parentName.trim()) {
      setError("parentName", "من فضلك أدخل اسم ولي الأمر");
      valid = false;
    } else setError("parentName", "");

    if (!data.parentPhone.trim()) {
      setError("parentPhone", "من فضلك أدخل رقم الواتساب");
      valid = false;
    } else if (!EG_PHONE_RE.test(data.parentPhone.trim())) {
      setError("parentPhone", "رقم الهاتف غير صحيح (مثال: 01xxxxxxxxx)");
      valid = false;
    } else setError("parentPhone", "");

    if (!data.computerExperience) {
      setError("computerExperience", "من فضلك اختر إجابة");
      valid = false;
    } else setError("computerExperience", "");

    if (!data.hasComputer) {
      setError("hasComputer", "من فضلك اختر إجابة");
      valid = false;
    } else setError("hasComputer", "");

    return valid;
  }

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }
  modalClose.addEventListener("click", closeModal);
  modalOk.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => e.target === modal && closeModal());

  function todayISO() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      studentName: fd.get("studentName") || "",
      grade: fd.get("grade") || "",
      parentName: fd.get("parentName") || "",
      parentPhone: fd.get("parentPhone") || "",
      computerExperience: fd.get("computerExperience") || "",
      hasComputer: fd.get("hasComputer") || "",
    };

    if (!validate(data)) {
      const firstError = form.querySelector(".has-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;

    const payload = {
      student_name: data.studentName.trim(),
      grade: data.grade,
      parent_name: data.parentName.trim(),
      parent_phone: data.parentPhone.trim(),
      computer_experience: data.computerExperience,
      has_computer: data.hasComputer,
      registration_date: todayISO(),
    };

    try {
      if (SCRIPT_URL && SCRIPT_URL.trim()) {
        // Apps Script Web Apps don't send an Access-Control-Allow-Origin header,
        // so the browser blocks reading the response even though the request
        // itself reaches the script and the row gets saved. mode: "no-cors"
        // tells the browser we're not going to try to read the response, which
        // avoids it treating that as a failed request.
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      } else {
        console.warn("SCRIPT_URL is empty — fill it in js/script.js. Payload:", payload);
      }

      form.reset();
      openModal();
    } catch (err) {
      console.error("Registration submit failed:", err);
      alert("حدث خطأ أثناء إرسال البيانات. من فضلك حاول مرة أخرى.");
    } finally {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
    }
  });

  form.querySelectorAll("input, select").forEach((field) => {
    field.addEventListener("input", () => {
      const wrapper = field.closest(".form-field");
      if (wrapper) wrapper.classList.remove("has-error");
    });
  });
})();
