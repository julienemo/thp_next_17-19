export const PageList = (argument = "") => {
  const welcome = `<div id="welcome_section" class="mx-0 my-3 p-0"><h1 id="welcome_title" class="title_font">Welcome,</h1><p class="welcome_text">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p></div>`;

  const filter = ``;

  const showPlatforms = (article) => {
    return article.platforms.map((el) => el.platform.slug);
  };

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
              <div class="card game_card col col-4">
                <a href="#pagedetail/${
                  article.id
                }"><img class="card-img-top" src="${
              article.background_image
            }" alt="cover_image_${article.slug}"></a>
                <div class="card-body">
                  <h5 class="card-title m-0 p-0 game_title">${article.name}</h5>
                  <p class="card-text">${article.released}</p>
                  <p class="card-text">plateforms: ${showPlatforms(
                    article
                  )} </p>
                  <p class="card-text">rated ${article.rating} by ${
              article.ratings_count
            }</p>
                </div>
              </div>
                `;
          });
          document.querySelector(
            ".page-list .articles"
          ).innerHTML = `${welcome}<div id="game_gallery" class="row mx-0 mt-5">${articles}</div>`;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
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
