import { showPlatforms } from "./PageDetail";
import {
  apiUrl,
  handleException,
  defaultImg,
  newReleaseArgument,
  limitPerPage,
  contentZone,
} from "./index";
import { noImage, reallyExists, releaseIndication } from "./tools";
import { observerAnimation } from "./Animation";
import { fillFilter } from "./Filter";
import { ratingInfo, showSameCategory } from "./GameInfo";

export const fillSingleCard = (game) => {
  let text = `<a href="#game/${game.slug || game.id}"><div id="${
    game.slug || game.id
  }" class="card game_card col-4">
        <img class="card-img-top card_head" src="${noImage(
          game.background_image,
          defaultImg
        )}" alt="cover_image_${game.slug}">
        
        <div class="card-img-top card-tail title_font white p-5">
          <p class="text">${releaseIndication(game.released)}:${
    game.released
  }</p>
          <p class="text">${ratingInfo(game)}</p>
          <p class="text">Genres: ${showSameCategory(game.genre, "genre")}</p>

        </div></a>
        <div class="card-body white">
          <h5 class="card-title m-0 p-0 game_title">${game.name}</h5>
          <p class="platform_info card-text">${showPlatforms(
            game.platforms
          )}</p>
        </div>
      </div>`;
  return text;
};

export const PageList = (argument = "", platformSpecified) => {
  console.log(`platform ${platformSpecified}`);
  const welcome = `<div id="welcome_section" class="mx-0 my-3 p-0"><h1 id="welcome_title" class="title_font">Welcome,</h1><p class="welcome_text">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
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

          const showMore = () => {
            i += limitPerPage;
            document.getElementById("game_gallery").innerHTML += showNine(
              i,
              result
            );
            if (i >= limitPerPage * 2) {
              seeMore.classList.add("d-none");
            }
          };

          document.querySelector(".page-list .articles").innerHTML = `
            ${welcome}
            <div class="row stick">
              <select id="platform_filter" class="custom-select btn_input red-bg white my-4 w-100">
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
