import "bootstrap";
import "../styles/style.scss";

import { routes } from "./Routes";
import { cleanDate } from "./tools";
import { submitSearch } from "./Search";
import { fillSideBar } from "./Sidebar";

var moment = require("moment");

const now = new Date();
export const timeFrom = cleanDate(now);
const timeTo = cleanDate(moment(now).add(1, "year"));
const timeWeek = cleanDate(moment(now).add(7, "days"));

export const visualLimit = 4; // show not more than 4 screenshots, 4 videos, 4 similar games
const entryLimit = 27; // show not more than 27 games per query
const platformLimit = 7; // show only 7 platforms with most games in filter

export const limitPerPage = 9; // show 9 games per "page"
export const apiUrl = `https://api.rawg.io/api/games`;
export const platformUrl = `https://api.rawg.io/api/platforms?ordering=-games_count&page=1&page_size=${platformLimit}`;
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

const searchForm = document.getElementById("search_form");
const searchInput = document.getElementById("search_input");

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  let platformSpecified;
  let platform = window.location.hash.match(/platforms=(\w*)/);
  if (platform === null) {
    platformSpecified = false;
  } else {
    platformSpecified = platform[1];
  }
  let pageArgument = path[1] || "";
  routes[path[0]](pageArgument, platformSpecified);
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

fillSideBar(thisWeekArgument, allTimeBestArgument);
