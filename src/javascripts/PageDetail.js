import {
  apiUrl,
  defaultImg,
  contentZone,
  handleException,
  visualDefault,
} from "./index";

import { cleanDate, noImage } from "./tools";
import { observerAnimation, backToTop } from "./Animation";
import { fillSingleCard } from "./PageList";

export const showPlatforms = (platforms) => {
  if (platforms == undefined || platforms == "" || platforms == "null") {
    return "";
  }
  let platformInnerHTML = "";
  platforms.forEach((el) => {
    platformInnerHTML += `
    <a href="#games/platforms=${el.platform.id}" class="internal">
      ${el.platform.name}
    </a> `;
  });
  return platformInnerHTML;
};

export const showSameCategory = (category, categoryName) => {
  if (category === null || category === undefined) {
    return "";
  }
  let categoryInnerHTML = "";
  category.forEach((el) => {
    categoryInnerHTML += `
    <a href="#games/${categoryName}=${el.slug}" class="internal">
      ${el.name}
    </a> `;
  });
  return categoryInnerHTML;
};

export const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const showPurchase = (stores) => {
      if (stores === (null || undefined)) {
        return "NO PURCHASE OPTION YET";
      }
      let innerHTML = "";
      stores.forEach((store) => {
        innerHTML += `<a href="${store.url}" target="_blank" title="go to ${store.store.name}" class="external white">${store.store.name}</a>, `;
      });
      return innerHTML;
    };

    const countVotes = (rating, ratings) => {
      if (
        rating == 0 ||
        ratings === null ||
        ratings === undefined ||
        ratings.length === 0
      ) {
        return "";
      }
      let counts = ratings.map((el) => el.count);
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      let votes = counts.reduce(reducer);
      return `${rating}/5 - ${votes} votes`;
    };

    const fetchImages = (gameSlug, gameName) => {
      fetch(
        `https://api.rawg.io/api/games/${gameSlug}/screenshots${visualDefault}`
      )
        .then((response) => response.json())
        .then((response) => {
          let screenshotZone = document.getElementById("screenshots");
          response.results.forEach((img) => {
            screenshotZone.innerHTML += `
            <div class="col col-6 stick pr-1">
              <img class="screenshots" src=${noImage(
                img.image,
                defaultImg
              )} alt="a screen shot of ${gameName}"/>
            </div>`;
          });
        })
        .catch((error) => {
          handleException(error);
        });
    };

    const fetchYoutube = (gameSlug) => {
      fetch(`${apiUrl}/${gameSlug}/youtube${visualDefault}`)
        .then((response) => response.json())
        .then((response) => {
          let videos = response.results;
          let youtubeZone = document.getElementById("youtube");
          videos.forEach((video) => {
            youtubeZone.innerHTML += `
            <div class="col col-6 stick iframe_container pr-1">
              <iframe width="640" height="360" class="stick youtube w-100" 
                 src="https://www.youtube.com/embed/${video.external_id}">
              </iframe>
              <p class="title_font white">${video.name}</p>
              <p class="title_font red">${video.channel_title} | ${cleanDate(
              video.created
            )}</p>
            </div>`;
          });
        })
        .catch((error) => {
          handleException(error);
        });
    };

    const fetchSimilar = (gameId) => {
      fetch(`${apiUrl}/${gameId}/suggested${visualDefault}`)
        .then((response) => response.json())
        .then((response) => {
          let games = response.results;
          let similarZone = document.getElementById("similar");
          games.forEach((game) => {
            similarZone.innerHTML += fillSingleCard(game);
          });
        });
    };
    const fetchGame = (argument) => {
      let finalURL = apiUrl + "/" + argument;
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let {
            id,
            slug,
            reddit_description,
            website,
            background_image,
            publishers,
            name,
            tags,
            genres,
            developers,
            clip,
            released,
            description,
            platforms,
            rating,
            ratings,
            stores,
          } = response;
          backToTop();
          contentZone.innerHTML = `
            <section class="page-detail mt-5">
              <div id="article" class="stick">
                <div class="row game_cover_image" style='background-image: url("${noImage(
                  background_image,
                  defaultImg
                )}");'>
                  <a id="game_website" class="external" href="${website}" title="go to game website" target="_blank"> <button id="game_site_btn" class="btn btn_input">Check Website  >> </button></a>
                </div>

                <div class="row m-0 p-0 justify-content-between">
                  <h1 class="title title_font align_to_bottom">${name}</h1>
                  <p id="rating" class="red title_font">${countVotes(
                    rating,
                    ratings
                  )}</p>
                </div>
                <div class="row stick"><p>${reddit_description}</p></div> 

                <div class="row stick">
                  <h5 class="col stick_bottom col-12 title_font white">Plot</h5></div>
                  <p class="col stick col-12">${description}</p>
                </div>

                <div class="row stick">
                  <div class="col stick col-3">
                    <h5 class="stick_bottom title_font white">Release Date</h5>
                    <p>${released}</p>
                  </div>

                  <div class="col stick col-3">
                    <h5 class="stick_bottom title_font white">Developer</h5>
                    <p>${showSameCategory(developers, "developers")}</p>
                  </div>

                  <div class="col stick col-3">
                    <h5 class="stick_bottom title_font white">Platform</h5>
                    <p>${showPlatforms(platforms)}</p>
                  </div>

                  <div class="col stick col-3">
                    <h5 class="stick_bottom title_font white">Publisher</h5>
                    <p id="publishers">none</p>
                  </div>
                </div> 

                <div class="row stick">
                  <div class="col col-6 stick">
                    <h5 class="stick_bottom title_font white">Tags</h5>
                    <p>${showSameCategory(tags, "tags")}</p>
                  </div>

                  <div class="col col-6 stick">
                    <h5 class="stick_bottom title_font white">Genres</h5>
                    <p>${showSameCategory(genres, "genres")}</p>
                  </div>
                </div>

                <div class="row game_attribute stick" >
                  <div class="col stick col-12">
                    <h3 class=" title_font red">BUY</h3>
                  </div>
                  <div id="stores" class="col stick col-12">
                    <p>${showPurchase(stores)}</p>
                  </div>
                </div>

                <div class="row game_attribute stick" >
                  <div class="col stick col-12">
                    <h3 class="title_font red">TRAILER</h3>
                  </div>
                  <div id="trailer" class="col stick col-12">
                    <p class="font_title white">This game has no trailer clip</p>
                  </div>
                </div>

                <div id="screenshots" class="row game_attribute stick">
                  <div class="col stick col-12">
                    <h3 class="title_font red">SCREENSHOTS</h3>
                  </div>
                </div>

                <div id="youtube" class="row game_attribute stick">
                  <div class="col stick col-12">
                    <h3 class="title_font red">YOUTUBE</h3>
                  </div>
                </div>

                <div id="similar" class="row game_attribute stick">
                  <div class="col stick col-12">
                    <h3 class="title_font red">SIMILAR GAMES</h3>
                  </div>
                </div>
              </div>
            </section>`;

          if (publishers !== (null || undefined)) {
            document.getElementById(
              "publishers"
            ).innerHTML = `${showSameCategory(publishers, "publishers")}`;
          }

          if (clip) {
            document.getElementById("trailer").innerHTML = `           
              <video id="game_trailer" class="stick" controls>
                <source src="${clip.clips["320"]}" type="video/mp4">
                Your browser does not support the video tag.
              </video>`;
          }
          if (website === null || website === undefined || website === "") {
            document.getElementById("game_website").classList.add("d-none");
          }
          return { slug: slug, name: name, id: id };
        })
        .then((response) => {
          fetchImages(response.slug, response.name);
          return response;
        })
        .then((response) => {
          fetchYoutube(response.slug);
          console.log(response);
          return response;
        })
        .then((response) => {
          console.log(response.id);
          fetchSimilar(response.id);
        })
        .then(() => {
          const observables = ".game_attribute";
          observerAnimation(observables);
        })
        .catch((error) => {
          handleException(error);
        });
    };

    fetchGame(cleanedArgument);
  };

  const render = () => {
    preparePage();
  };

  render();
};
