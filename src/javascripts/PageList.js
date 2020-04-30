import { showPlatforms } from "./PageDetail";
import {
  apiUrl,
  handleException,
  defaultImg,
  newReleaseArgument,
  limitPerPage,
  contentZone,
} from "./index";
import { noImage, releaseIndication } from "./tools";
import { observerAnimation, pushNewContent } from "./Animation";
import { fillFilter } from "./Filter";
import { ratingInfo, showSameCategory } from "./GameInfo";

export const fillSingleCard = (game) => {
  let text = `<a href="#game/${game.slug || game.id}"><div id="${
    game.slug || game.id
  }" class="card game_card">
        <img class="card-img-top card_head" src="${noImage(
          game.background_image,
          defaultImg
        )}" alt="cover_image_${game.slug}">
        
        <div class="card-img-top card-tail white_title p-5">
          <p class="text">${releaseIndication(game.released)}:${
    game.released
  }</p>
          <p class="text">${ratingInfo(game)}</p>
          <p class="text">Genres: ${showSameCategory(game.genre, "genre")}</p>

        </div></a>
        <div class="card-body">
          <h5 class="card-title m-0 p-0 white_title">${game.name}</h5>
          <p class="platform_info card-text">${showPlatforms(
            game.platforms
          )}</p>
        </div>
      </div>`;
  return text;
};

export const PageList = (argument = "", platformSpecified) => {
  console.log(`platform ${platformSpecified}`);
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
      finalURL = apiUrl + newReleaseArgument + "&" + argument;
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

          return platformSpecified;
        })
        .then((response) => {
          console.log(`response ${response}`);
          fillFilter(response);
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
