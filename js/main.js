import fetchData from "./fetch.js";

import {
  createWhyUsSection,
  createFeaturesSection,
  createStructureCard,
  createLoginSignUpForm,
  contactSectionLocalStorage,
  createHamburgerButton,
  blogPagination,
  createBlogSection,
  createPricingSection,
  createFaqSection,
  createContactSection,
  createNewsletterSection,
} from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {
  const faqs = await fetchData("faqs");
  const button = document.querySelector(".m-right button");

  if (button) {
    button.addEventListener("click", () => {
      alert("Buton Tıklandı");
    });
  }
  if (
    window.location.pathname.includes("index") ||
    window.location.pathname === "/" ||
    window.location.pathname === "/app-consultancy"
  ) {
    const data = await fetchData("feature-section");
    const dataServices = await fetchData("services-card");
    createWhyUsSection();
    createFeaturesSection(data);
    createHamburgerButton();
    createStructureCard(dataServices);
    createFaqSection(faqs);
    createContactSection();
    createNewsletterSection();
  } else if (window.location.pathname.includes("login")) {
    createLoginSignUpForm("login");
  } else if (window.location.pathname.includes("pricing")) {
    createHamburgerButton();
    contactSectionLocalStorage();
    const pricing = await fetchData("pricing");
    createPricingSection(pricing);
    createNewsletterSection();
    createFaqSection(faqs);
    createContactSection();
  } else if (window.location.pathname.includes("signup")) {
    createLoginSignUpForm("signup");
  } else if (window.location.pathname.includes("blog")) {
    const data = await fetchData("blog-posts");
    const blogs = await fetchData("blog-post-cards");
    createHamburgerButton();
    blogPagination(data);
    createBlogSection(blogs);
    createContactSection();
  } else if (window.location.pathname.includes("services")) {
    createFaqSection(faqs);
    createHamburgerButton();
    contactSectionLocalStorage();
    createNewsletterSection();
    createContactSection();
  }
});
