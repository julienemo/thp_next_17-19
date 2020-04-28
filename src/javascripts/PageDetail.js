export const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    let articleContent = "";

    const showPublishers = (publishers) => {
      return publishers.map((el) => `${el.name}, ${el.slug}(${el.id})`);
    };

    const countVotes = (ratings) => {
      let counts = ratings.map((el) => el.count);
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      return counts.reduce(reducer);
    };
    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let {
            website,
            background_image,
            publishers,
            name,
            released,
            description,
            rating,
            ratings,
          } = response;

          pageContent.innerHTML = `
            <section class="page-detail">
              <div class="article container m-0 p-0">
                <div class="row  m-0 p-0">
                  <img class="game_cover" src="${background_image}" alt="cover_photo_${name}">
                </div>
                <div class="row m-0 p-0 justify-content-between">
                  <h1 class="title title_font">${name}</h1>
                  <p class="rating">${rating}/5 - ${countVotes(
            ratings
          )} votes</p>
                </div>
                <div class="row m-0 p-0" >
                  <a href="${website}" target="_blank"> <button class="game_site_btn">Check Website</button></a>
                </div>
                <p class="release-date">Release date:${released} <span></span></p>
                <p class="description">${description}</p>
                <p class="publishers">${showPublishers(publishers)}</p>
              </div>
            </section>
          `;
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    preparePage();
  };

  render();
};
