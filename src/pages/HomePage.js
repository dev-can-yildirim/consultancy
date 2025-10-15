import "./../style.css";
import Example from "../components/Example";
const Home = () => {
  const homePage = document.createElement("div");
  homePage.append(Example());  

  
 
  return homePage;
}
export default Home;
