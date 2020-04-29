import { showPlatforms } from "./PageDetail";
import {
  apiUrl,
  handleException,
  defaultImg,
  newReleaseArgument,
  limitPerPage,
} from "./index";
import { noImage } from "./tools";
import { observerAnimation } from "./Animation";

import { quickLink } from "./index";

export const PageList = (argument = "") => {
  const welcome = `<div id="welcome_section" class="mx-0 my-3 p-0"><h1 id="welcome_title" class="title_font">Welcome,</h1><p class="welcome_text">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p></div>`;

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (argument) => {
      let finalURL = apiUrl;
      if (quickLink[argument] == undefined) {
        finalURL = apiUrl + newReleaseArgument + "&" + argument;
      } else {
        finalURL = apiUrl + quickLink[argument];
      }
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let result = response.results;
          let i = 0;

          const showNine = (i, result) => {
            let page = result.slice(i, i + 9);
            console.log(page);
            let innerHTML = "";
            page.forEach((article) => {
              innerHTML += `
              <div id="${
                article.slug || article.id
              }" class="card game_card col-4">
                <a href="#game/${
                  article.slug || article.id
                }"><img class="card-img-top" src="${noImage(
                article.background_image,
                defaultImg
              )}" alt="cover_image_${article.slug}"></a>
                <div class="card-body">
                  <h5 class="card-title m-0 p-0 game_title">${article.name}</h5>
                  <p class="card-text">${showPlatforms(article.platforms)}</p>
                  <p class="card-text">${article.released}</p>
                </div>
              </div>
                `;
            });
            return innerHTML;
          };

          const showMore = () => {
            i += 9;
            document.getElementById("game_gallery").innerHTML += showNine(
              i,
              result
            );
            console.log(i);
            if (i >= 18) {
              seeMore.classList.add("d-none");
            }
          };

          document.querySelector(".page-list .articles").innerHTML = `
            ${welcome}
            <div class="row stick">
              <select id="platform_filter" class="custom-select btn_input red-bg white my-4 w-25">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div id="game_gallery" class="row">
              ${showNine(0, result)}
            </div>
            <div class="row justify-content-center">
              <button id="see_more" class="btn btn_input col col-3"><h4>See More</h4></button>
            </div>
          `;

          const seeMore = document.getElementById("see_more");
          seeMore.addEventListener("click", showMore);
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
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};
