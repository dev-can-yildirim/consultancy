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
  const path = window.location.pathname;
  const isHome =
    path.includes("/pages/homePage") || path === "/" || path === "/index.html";
  const isLogin = path.includes("/login");
  const isPricing = path.includes("/pricing");
  const isSignup = path.includes("/signup");
  const isBlog = path.includes("/blog");
  const isServices = path.includes("/services");

  const faqs = await fetchData("faqs");
  const button = document.querySelector(".m-right button");

  if (button) {
    button.addEventListener("click", () => {
      alert("Buton Tıklandı");
    });
  }

  if (isHome) {
    const features = await fetchData("feature-section");
    const services = await fetchData("services-card");
    createWhyUsSection();
    createFeaturesSection(Array.isArray(features) ? features : []);
    createHamburgerButton();
    createStructureCard(Array.isArray(services) ? services : []);
    createFaqSection(Array.isArray(faqs) ? faqs : []);
    createContactSection();
    createNewsletterSection();
  } else if (isLogin) {
    createLoginSignUpForm("login");
  } else if (isPricing) {
    createHamburgerButton();
    contactSectionLocalStorage();
    const pricing = await fetchData("pricing");
    createPricingSection(Array.isArray(pricing) ? pricing : []);
    createNewsletterSection();
    createFaqSection(Array.isArray(faqs) ? faqs : []);
    createContactSection();
  } else if (isSignup) {
    createLoginSignUpForm("signup");
  } else if (isBlog) {
    const posts = await fetchData("blog-posts");
    const cards = await fetchData("blog-post-cards");
    createHamburgerButton();
    blogPagination(Array.isArray(posts) ? posts : []);
    createBlogSection(Array.isArray(cards) ? cards : []);
    createContactSection();
  } else if (isServices) {
    createFaqSection(Array.isArray(faqs) ? faqs : []);
    createHamburgerButton();
    contactSectionLocalStorage();
    createNewsletterSection();
    createContactSection();
  }
});
