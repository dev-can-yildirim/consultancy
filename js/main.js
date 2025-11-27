import fetchData from "./fetch.js";

import {
  createWhyUsSection,
  createFeaturesSection,
  createStructureCard,
  createLoginSignUpForm,
  contactSectionLocalStorage,
  createHamburgerButton,
  blogPagination,
  createFaqSection,
} from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {
  // get-started adında ki buton tıklanınca alert
  const faqs = await fetchData("faqs");
  const button = document.querySelector(".m-right button");

  if (button) {
    button.addEventListener("click", () => {
      alert("Buton Tıklandı");
    });
  }
  if (window.location.pathname.includes("home")) {
    const data = await fetchData("feature-section");
    const dataServices = await fetchData("services-card");
    createWhyUsSection();
    createFeaturesSection(data);
    createHamburgerButton();
    createStructureCard(dataServices);

    createFaqSection(faqs);
    
    
  } else if (window.location.pathname.includes("login")) {
    // login sayfasında render olacak kodlar buraya gelecek
    createLoginSignUpForm("login");
  
  } else if (window.location.pathname.includes("pricing")) {
  
    createHamburgerButton();
    contactSectionLocalStorage();
    createFaqSection(faqs);

  } else if (window.location.pathname.includes("signup")) {
    // signUp sayfasında render olacak kodlar buraya gelecek
    createLoginSignUpForm("signup");
  } else if (window.location.pathname.includes("blog")) {
    const data = await fetchData("blog-posts");

    createHamburgerButton();
    blogPagination(data);
    // blog sayfasında render olacak kodlar buraya gelecek
  } else if (window.location.pathname.includes("services")) {
    createFaqSection(faqs);
    // services sayfasında render olacak kodlar buraya gelecek
    createHamburgerButton();
    contactSectionLocalStorage();
  }
});
