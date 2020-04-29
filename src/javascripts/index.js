import "bootstrap";
import "../styles/style.scss";

import { routes } from "./Routes";
import { cleanDate } from "./tools";
import { submitSearch } from "./Search";
import { flyingPage } from "./Animation";

var moment = require("moment");
const now = new Date();
const timeFrom = cleanDate(now);
const timeTo = cleanDate(moment(now).add(1, "year"));
const timeWeek = cleanDate(moment(now).add(7, "days"));

const visualLimit = 4; // show not more than 4 screenshots and 4 videos
const entryLimit = 27; // show not more than 27 games per query

export const apiUrl = `https://api.rawg.io/api/games`;
export const newReleaseArgument = `?dates=${timeFrom},${timeTo}&ordering=-released&page=1&page_size=${entryLimit}`;
export const thisWeekArgument = `?dates=${timeFrom},${timeWeek}&ordering=-released&page=1&page_size=${entryLimit}`;
export const allTimeBestArgument = `?ordering=-rating&page=1&page_size=${entryLimit}`;
export const visualDefault = `?page=1&page_size=${visualLimit}`;

export const quickLink = {
  "this-week": thisWeekArgument,
  "all-time-best": allTimeBestArgument,
};
export const defaultImg = "src/images/no_image.jpg";

export const contentZone = document.getElementById("pageContent");
export const observationThreshold = 0.2;

export const speChars = /[^a-zA-Z0-9\-\s ]/g;

export const handleException = (error) => {
  console.log(error);
  contentZone.innerHTML =
    "<p class='white title_font'>Sorry, an error occurred. Your games can't load. Please verify spelling and retry, or contact the Progame organizer.</p>";
};

let pageArgument;

const searchForm = document.getElementById("search_form");
const searchInput = document.getElementById("search_input");

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  var pageContent = document.getElementById("pageContent");
  console.log(pageArgument);
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
document.getElementById("page_title").addEventListener("click", () => {
  window.location = "index.html";
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault;
  submitSearch(searchInput);
});
