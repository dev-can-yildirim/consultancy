import fetchData from "./fetch.js";

const createWhyUsSection = () => {
  async function renderWhyUs() {
    try {
      const whyUsSection = document.querySelector(".why-us-section");
      if (!whyUsSection) return;

      const [content, stats] = await Promise.all([
        fetchData("why-us-textContent"),
        fetchData("why-us-stats"),
      ]);

      whyUsSection.innerHTML = `
        <div class="why-us-header">
          <h4 class="why-us-top-header">${content?.eyebrow ?? ""}</h4>
          <h2 class="why-us-bottom-header">${content?.heading ?? ""}</h2>
          <p class="why-us-text">${content?.description ?? ""}</p>
        </div>
        <div class="why-us-content"></div>
      `;

      const whyUsStats = whyUsSection.querySelector(".why-us-content");
      if (!whyUsStats) return;

      whyUsStats.innerHTML = (stats || [])
        .map(
          (item) => `
            <div class="stat-item">
              <span class="stat-value">${item.value ?? ""}</span>
              <p class="stat-text">${item.text ?? ""}</p>
            </div>
          `
        )
        .join("");
    } catch (err) {
      console.error("WhyUs JSON verisi yüklenemedi:", err);
    }
  }

  renderWhyUs();
};

const createFeaturesSection = (data) => {
  if (!Array.isArray(data)) return;
  const featuresContentLeft = document.querySelector(".features-content-left");
  if (!featuresContentLeft) return;

  featuresContentLeft.innerHTML = data
    .map(
      (item) => `
        <div class="features-content-header">
          <div class="features-content-image">
            <img src="${item.imgUrl ?? ""}" alt="" />
          </div>
          <div class="features-content-content">
            <h4 class="features-content-content-header">${item.header ?? ""}</h4>
            <p class="features-content-paragraph">${item.paragraph ?? ""}</p>
          </div>
        </div>
      `
    )
    .join("");
};

const createStructureCard = (dataServices) => {
  if (!Array.isArray(dataServices)) return;
  const structureSection = document.querySelector(".structure-content");
  if (!structureSection) return;

  structureSection.innerHTML = dataServices
    .map(
      (item) => `
        <div class="structure-card">
          <img src="${item.image ?? ""}" alt="">
          <h2>${item.title ?? ""}</h2>
          <p>${item.text ?? ""}</p>
        </div>
      `
    )
    .join("");
};

const createLoginSignUpForm = async (formType) => {
  const formContent = document.getElementById("formContent");
  if (!formContent) return;
  const config = await fetchData(formType);
  if (!config) return;

  const fieldsHTML = (config.fields || [])
    .map(
      (field) =>
        `<input class="field" type="${field.type}" placeholder="${field.placeholder}" name="${field.name}" />`
    )
    .join("");

  formContent.innerHTML = `
    <h2 class="form-title">${config.title}</h2>

    <form id="${formType}-form">
      ${fieldsHTML}

      <div class="password-wrapper">
        <input type="${config.passwordField.type}" placeholder="${config.passwordField.placeholder}" name="${config.passwordField.name}" />
        <button type="button" class="password-toggle-icon" id="togglePassword" aria-label="Toggle password">
          <img src="/images/login-signup-images/eye-vector-consulty.svg" alt="">
        </button>
      </div>

      <div class="form-options">
        <label class="remember-me">
          <span class="switch-container">
            <input type="checkbox" class="switch-checkbox" id="benimSwitch">
            <span class="switch-label"></span>
          </span>
          <p id="durum-metni">Remember Me</p>
        </label>
        <a href="#" class="forgot-link">Forgot password?</a>
      </div>

      <button type="submit" class="submit-btn">${config.submitText}</button>
    </form>

    <button class="google-btn">
      <img src="/images/login-signup-images/google-icon.svg" alt="">
      Or ${config.submitText} with Google
    </button>

    <div class="toggle-link-container">
      ${config.toggleText}
      <a href="#" class="toggle-link" data-target="${config.toggleTarget}">${config.toggleLinkText}</a>
    </div>
  `;

  // tek bir delegation ile toggle-link yönlendirmesi
  formContent.addEventListener("click", (e) => {
    const link = e.target.closest(".toggle-link");
    if (!link) return;
    e.preventDefault();
    location.href = `/pages/${link.dataset.target}/index.html`;
  });
};

const contactSectionLocalStorage = () => {
  const nameInput = document.getElementById("contact-input-name");
  const emailInput = document.getElementById("contact-input-email");
  const messageInput = document.getElementById("contact-message");
  const saveButton = document.getElementById("contact-button");
  const form = document.getElementById("contact-form");

  if (!nameInput || !emailInput || !messageInput || !saveButton) return;

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const formData = {
      userName: nameInput.value.trim(),
      userEmail: emailInput.value.trim(),
      userMessage: messageInput.value.trim(),
    };

    localStorage.setItem("contactData", JSON.stringify(formData));
    alert("Mesajınız yerel olarak kaydedildi!");

    if (form) {
      form.reset();
    } else {
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    }
  };

  if (form) {
    form.addEventListener("submit", handleSave);
  } else {
    saveButton.addEventListener("click", handleSave);
  }
};

const createHamburgerButton = () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
};

const blogPagination = async (data) => {
  if (!Array.isArray(data)) return;
  const blogList = document.querySelector(".blog-list");
  const pagination = document.querySelector(".pagination");
  if (!blogList || !pagination) return;

  const blogsPerPage = 6; // her sayfada 6 ürün olsun
  let currentPage = 1; // ilk sayfa
  const totalPage = Math.ceil(data.length / blogsPerPage); // toplam sayfa sayısını hesaplayıp kaç sayfa varsa o kadar sayfa butonu oluştur.

  const showBlogs = () => {
    blogList.innerHTML = "";

    const start = (currentPage - 1) * blogsPerPage;
    const end = start + blogsPerPage;

    for (let i = start; i < end && i < data.length; i++) {
      const blog = data[i];

      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");
      blogCard.innerHTML = `
         <img src="${blog.image}" alt="">
            <h5>${blog.date}</h5>
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
      `;
      blogList.appendChild(blogCard);
    }
  };

  const updatePagination = () => {
    pagination.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.className = "prev-button";
    prevButton.innerHTML = `<img class="prev-button-image" src="/images/blog-section-images/left-arrow.svg" alt=""> Previous `;
    prevButton.disabled = currentPage === 1;

    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        showBlogs();
        updatePagination();
      }
    });
    pagination.appendChild(prevButton);

    const pageButtonDiv = document.createElement("div");
    pageButtonDiv.className = "page-button-div";

    for (let i = 1; i <= totalPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("pageNumber");

      if (i === currentPage) pageButton.classList.add("active-button");
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showBlogs();
        updatePagination();
      });

      pageButtonDiv.appendChild(pageButton);
    }

    pagination.appendChild(pageButtonDiv);

    const nextButton = document.createElement("button");
    nextButton.className = "next-button";
    nextButton.innerHTML = `Next<img class="next-button-image" src="/images/blog-section-images/right-arrow.svg" alt="">  `;
    nextButton.disabled = currentPage === totalPage;

    nextButton.addEventListener("click", () => {
      if (currentPage < totalPage) {
        currentPage++;
        showBlogs();
        updatePagination();
      }
    });
    pagination.appendChild(nextButton);
  };

  showBlogs();
  updatePagination();
};

const createBlogSection = async (blogs) => {
  const container = document.querySelector(".blog-post-card");
  if (!container || !Array.isArray(blogs)) return;
  container.innerHTML = blogs
    .map(
      (blog) => `
        <div class="blog-card-post">
          <div class="blog-card-image">
            <img src="${blog.image}" alt="${blog.title}">
          </div>
          <div class="blog-card-content">
            <h4>${blog.date}</h4>
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
          </div>
        </div>`
    )
    .join("");
};

const createPricingSection = (data) => {
  const section = document.getElementById("pricing-section");
  if (!section || !Array.isArray(data)) return;

  const cardsHTML = data
    .map((item) => {
      const featuresHTML = item.features
        .map((feature) => `<p>${feature}</p>`)
        .join("");

      return `
            <div class="pricing-card">
                <h3 class="card-title">${item.title}</h3>
                <div class="price-wrapper">
                    <span class="price-amount">${item.price}</span>
                    <span class="price-period">/mth</span>
                </div>
                <p class="card-description">${item.description}</p>
                <div class="feature-list">
                    ${featuresHTML}
                </div>
                <button class="card-btn">${item.buttonText}</button>
            </div>
        `;
    })
    .join("");

  section.innerHTML = `<div class="pricing-container">${cardsHTML}</div>`;
};

const createNewsletterSection = () => {
  const target =
    document.querySelector(".newsletter-section") || document.createElement("section");
  target.classList.add("newsletter-section");

  target.innerHTML = `
    <div class="newsletter-container">
      <div class="newsletter-content">
        <h2 class="newsletter-title">Subcribe to our Newsletter</h2>
        <p class="newsletter-desc">
          Subscribe for Updates: Stay informed about the latest investor updates,
          financial results, and announcements by subscribing to our newsletter.
        </p>
      </div>

      <div class="newsletter-form-wrapper">
        <form class="newsletter-form">
          <input type="email" class="newsletter-input" placeholder="Enter your email" required />
          <button type="submit" class="newsletter-button">Subscribe</button>
        </form>
      </div>
    </div>
  `;

  const form = target.querySelector(".newsletter-form");
  const input = target.querySelector(".newsletter-input");
  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!email) return;
      alert("Subscribed: " + email);
      form.reset();
    });
  }

  if (!target.isConnected) {
    document.body.appendChild(target);
  }
};

const createFaqSection = (faqs) => {
  if (!faqs || !Array.isArray(faqs)) return;
  const faqsSection =
    document.querySelector(".faq-section") || document.createElement("section");
  faqsSection.classList.add("faq-section");

  faqsSection.innerHTML = "";

  faqsSection.innerHTML += `
    <div class="faq-header">
      <span class="faq-subtitle">FAQ</span>
      <h2 class="faq-title">Do you have any questions?</h2>
    </div>
  `;

  const faqList = document.createElement("div");
  faqList.classList.add("faq-list");

  faqs.forEach((faq) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    faqItem.innerHTML = `
      <button class="faq-question">
        <span class="faq-question-text">${faq.question}</span>
        <span class="faq-icon">
          <img src="/images/faq-section/arrow1.svg">
        </span>
      </button>
      <div class="faq-answer hidden">
        <p>${faq.answer}</p>
      </div>
    `;

    const btn = faqItem.querySelector(".faq-question");
    const answer = faqItem.querySelector(".faq-answer");
    const icon = faqItem.querySelector(".faq-icon");

    btn.addEventListener("click", () => {
      answer.classList.toggle("hidden");
      answer.classList.toggle("faq-answer-highlight");
      icon.classList.toggle("icon-rotated");
    });

    faqList.appendChild(faqItem);
  });

  faqsSection.appendChild(faqList);

  if (!faqsSection.isConnected) {
    document.body.appendChild(faqsSection);
  }
};

const createContactSection = () => {
  const container =
    document.querySelector(".contact-section") || document.createElement("section");

  // Sayfada zaten dolu bir contact-section varsa (ör. pricing sayfasındaki form), dokunma.
  if (container.childElementCount > 0) return;

  container.classList.add("contact-section");

  container.innerHTML = `
    <div class="container">
      <div class="contact-header">
        <span class="sub-title">Contact Info</span>
        <h2 class="main-title">We are always happy to assist you</h2>
      </div>

      <div class="contact-info-grid">
        <div class="info-box">
          <h3 class="info-label">Email Address</h3>
          <div class="line"></div>
          <a href="mailto:help@info.com" class="info-value">help@info.com</a>
          <div class="info-hours">
            <p>Assistance hours:</p>
            <p>Monday - Friday 6 am to 8 pm EST</p>
          </div>
        </div>

        <div class="info-box">
          <h3 class="info-label">Number</h3>
          <div class="line"></div>
          <a href="tel:80899834256" class="info-value">(808) 998-34256</a>
          <div class="info-hours">
            <p>Assistance hours:</p>
            <p>Monday - Friday 6 am to 8 pm EST</p>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!container.isConnected) {
    document.body.appendChild(container);
  }
};

export {
  createWhyUsSection,
  createFeaturesSection,
  createStructureCard,
  createHamburgerButton,
  createLoginSignUpForm,
  contactSectionLocalStorage,
  blogPagination,
  createBlogSection,
  createPricingSection,
  createNewsletterSection,
  createFaqSection,
  createContactSection,
};
