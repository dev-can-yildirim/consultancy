import { router } from "./../src/router.js";
import  Header  from "./../src/components/header.js";
import  Footer  from "./../src/components/Footer.js";
const root = document.getElementById("root");
const header = Header();
const footer = Footer();

root.append(header);

root.insertAdjacentHTML("beforeend", '<div id="app"></div>'); // sayfa içeriği buraya gelecek
root.append(footer);
router();


document.addEventListener("click", (e) => {
  if (e.target.matches("a[data-link]")) {
    e.preventDefault();
    history.pushState(null, "", e.target.href);
    router();
  }
});

window.addEventListener("popstate", router);
