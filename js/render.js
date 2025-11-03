import fetchData from "./fetch.js";

const createWhyUsSection = () => {
  async function renderWhyUs() {
    try {
      const [content, stats] = await Promise.all([
        fetchData("why-us-textContent"),
        fetchData("why-us-stats"),
      ]);

      const whyUsSection = document.querySelector(".why-us-section");
      whyUsSection.innerHTML = `
        <div class="why-us-header">
          <h4 class="why-us-top-header">${content.eyebrow}</h4>
          <h2 class="why-us-bottom-header">${content.heading}</h2>
          <p class="why-us-text">
            ${content.description}
          </p>
        </div>
        <div class="why-us-content"></div>
      `;

      const whyUsStats = document.querySelector(".why-us-content");

      whyUsStats.innerHTML = stats
        .map((item) => {
          return `
      <div class="stat-item">
        <span class="stat-value">${item.value}</span>
        <p class="stat-text">${item.text}</p>
      </div>
    `;
        })
        .join("");
    } catch (err) {
      console.error("JSON verisi yüklenemedi:", err);
    }
  }

  renderWhyUs();
};
const createLoginSignUpForm = async (formType) => {
  const formContent = document.getElementById("formContent");
  const config = await fetchData(formType);

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
    location.href = `./../${link.dataset.target}/index.html`;
  });
};

export { createWhyUsSection, createLoginSignUpForm };
