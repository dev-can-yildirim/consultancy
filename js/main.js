import { createWhyUsSection, createLoginSignUpForm } from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {
  // tüm sayfalar için gerekli kodlar buraya gelecek
  // const hamburger = document.querySelector(".hamburger");
  // const navMenu = document.querySelector(".nav-menu");
  // hamburger.addEventListener("click", () => {
  //   navMenu.classList.toggle("active");
  // });
  if (window.location.pathname.includes("home")) {
    // home sayfasında render olacak kodlar buraya gelecek
    createWhyUsSection();
  } else if (window.location.pathname.includes("login")) {
    // login sayfasında render olacak kodlar buraya gelecek
    createLoginSignUpForm("login");
  } else if (window.location.pathname.includes("signup")) {
    // signUp sayfasında render olacak kodlar buraya gelecek
    createLoginSignUpForm("signup");
  } else if (window.location.pathname.includes("pricing")) {
    // pricing sayfasında render olacak kodlar buraya gelecek
  } else if (window.location.pathname.includes("blog")) {
    // blog sayfasında render olacak kodlar buraya gelecek
  } else if (window.location.pathname.includes("services")) {
    // services sayfasında render olacak kodlar buraya gelecek
  }
});
