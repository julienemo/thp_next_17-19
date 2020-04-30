import {
  apiUrl,
  handleException,
  defaultImg,
  newReleaseArgument,
  thisWeekArgument,
  orderByDate,
  orderByRating,
  limitToEntry,
  limitPerPage,
  contentZone,
} from "./index";
import { reallyExists } from "./tools";
import { observerAnimation, pushNewContent, backToTop } from "./Animation";
import { fillFilter } from "./Filter";
import { fillSingleCard } from "./GameInfo";

export const PageList = (argument = "") => {
  const welcome = `<div id="welcome_section" class="mx-0 my-3 p-0"><h1 id="welcome_title" class="white_title">Welcome,</h1><p class="welcome_text">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p></div>`;

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (argument) => {
      let finalURL = "";
      if (!reallyExists(argument)) {
        finalURL =
          apiUrl +
          "?" +
          newReleaseArgument +
          "&" +
          orderByDate +
          "&" +
          limitToEntry;
      } else if (argument === "this-week") {
        finalURL =
          apiUrl +
          "?" +
          thisWeekArgument +
          "&" +
          orderByDate +
          "&" +
          limitToEntry;
      } else if (argument === "all-time-best") {
        finalURL = apiUrl + "?" + orderByRating + "&" + limitToEntry;
      } else {
        finalURL =
          apiUrl + "?" + argument + "&" + orderByDate + "&" + limitToEntry;
      }
      fetch(finalURL)
        .then((response) => response.json())
        .then((response) => {
          let result = response.results;
          let i = 0;

          const showNine = (i, result) => {
            let page = result.slice(i, i + limitPerPage);
            let innerHTML = "";
            page.forEach((article) => {
              innerHTML += fillSingleCard(article);
            });
            return innerHTML;
          };
          backToTop();

          document.querySelector(".page-list .articles").innerHTML = `
            ${welcome}
            <div class="row stick_bottom justify-content-center">
              <select id="platform_filter" class="btn btn_input my-4">
              </select>
            </div>
            <div id="game_gallery" class="row justify-content-center">
              ${showNine(0, result)}
            </div>
            <div class="row justify-content-center">
              <button id="see_more" class="btn btn_input">See More</button>
            </div>
          `;

          const seeMore = document.getElementById("see_more");
          const showMore = () => {
            i += limitPerPage;
            document.getElementById("game_gallery").innerHTML += showNine(
              i,
              result
            );
            pushNewContent();
            if (i >= limitPerPage * 2) {
              seeMore.classList.add("d-none");
            }
          };
          seeMore.addEventListener("click", showMore);
        })
        .then(() => {
          fillFilter(thisWeekArgument, orderByRating);
        })
        .then(() => {
          const observables = ".game_card";
          observerAnimation(observables);
        })
        .catch((error) => {
          handleException(error);
        });
    };

    fetchList(cleanedArgument);
  };

  const render = () => {
    contentZone.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};
