import { showPlatforms } from "./PageDetail";
import { apiUrl, handleException } from "./index";

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
      if (argument) {
        finalURL = apiUrl + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let result = response.results;
          result.sort((a, b) => (a.released < b.released ? 1 : -1));
          result.forEach((article) => {
            articles += `
              <div class="card game_card col-4">
                <a href="#game/${
                  article.slug
                }"><img class="card-img-top" src="${
              article.background_image
            }" alt="cover_image_${article.slug}"></a>
                <div class="card-body">
                  <h5 class="card-title m-0 p-0 game_title">${article.name}</h5>
                  <p class="card-text">${showPlatforms(article.platforms)}</p>
                  <p class="card-text">${article.released}</p>
                </div>
              </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = `
            ${welcome}
            <div class="row stick">
              <select id="plateform_filter" class="custom-select btn_input red-bg white my-4 w-25">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div id="game_gallery" class="row">
              ${articles}
            </div>
          `;
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
