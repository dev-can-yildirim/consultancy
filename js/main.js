import fetchData from "./fetch.js";

import { createWhyUsSection, createFeaturesSection } from "./render.js";
document.addEventListener("DOMContentLoaded", async () => {
  // tüm sayfalar için gerekli kodlar buraya gelecek
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
  if (window.location.pathname.includes("home")) {
    createWhyUsSection();
    createFeaturesSection();
  } else if (window.location.pathname.includes("login")) {
    // login sayfasında render olacak kodlar buraya gelecek
  } else if (window.location.pathname.includes("pricing")) {
    // pricing sayfasında render olacak kodlar buraya gelecek
  } else if (window.location.pathname.includes("blog")) {
    // blog sayfasında render olacak kodlar buraya gelecek
  } else if (window.location.pathname.includes("services")) {
    // services sayfasında render olacak kodlar buraya gelecek
  }
});
