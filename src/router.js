 
import  Home  from "./pages/HomePage.js";
import  Services from "./pages/Services.js";
import  Pricing from "./pages/Pricing.js";
import  Blog from "./pages/Blog.js"
import  Login from "./pages/Login.js";


const routes = {
  "/": Home,
  "/services": Services,
  "/pricing": Pricing,
  "/blog": Blog,
  "/login": Login,
};


export function router() {
  const path = window.location.pathname;
  const app = document.getElementById("app");

  app.innerHTML = ""; 
  const Page = routes[path] || Home; 
  app.append(Page()); 
  
const header = document.querySelector("header"); 
const footer = document.querySelector("footer"); 
  if (path === "/login") {
    header.style.display = "none";
    footer.style.display = "none";
  } else {
    header.style.display = "block";
    footer.style.display = "block";
  }
}
