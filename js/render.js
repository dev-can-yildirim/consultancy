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

const createFeaturesSection = () => {
  async function renderFutureSection() {
    try {
      const [data] = await Promise.all([fetchData("feature-section")]);
      console.log(data);

      const featuresContentLeft = document.querySelector(
        ".features-content-left"
      );
      featuresContentLeft.innerHTML = data.map((item) => {
       return `
         <div class="features-content-header">
              <div class="features-content-image"><img src="${item.imgUrl}" alt="" /></div>
              <div class="features-content-content">
                <h4 class="features-content-content-header">${item.header}</h4>
                <p class="features-content-paragraph">${item.paragraph}</p>
              </div>
          </div>
        `;
      }).join("");
    } catch (err) {
      console.error("JSON verisi yüklenemedi:", err);
    }
  }

  renderFutureSection();
};

export { createWhyUsSection, createFeaturesSection };
