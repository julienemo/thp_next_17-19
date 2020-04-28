import "bootstrap";
import "../styles/style.scss";

import { routes } from "./Routes";

export const apiUrl = "https://api.rawg.io/api/games";
export const contentZone = document.getElementById("pageContent");
export const limit = 4; // show not more than 4 screenshots and 4 videos
export const handleException = (error) => {
  console.log(error);
  contentZone.innerHTML =
    "<p class='white title_font'>Sorry, an error occurred. Your games can't load. Please verify spelling and retry, or contact the Progame organizer.</p>";
};

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  var pageContent = document.getElementById("pageContent");

  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
