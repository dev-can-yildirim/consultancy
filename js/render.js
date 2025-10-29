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

export { createWhyUsSection };
