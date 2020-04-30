import { noImage } from "./tools";
import { observerAnimation, backToTop } from "./Animation";
import { apiUrl, defaultImg, contentZone, handleException } from "./index";
import {
  showSameCategory,
  showPlatforms,
  showPurchase,
  ratingInfo,
  fetchImages,
  fetchYoutube,
  fetchSimilar,
} from "./GameInfo";

export const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const fetchGame = (argument) => {
      let finalURL = apiUrl + "/" + argument;
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let game = response;
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
                  <h1 class="title white_title align_to_bottom">${name}</h1>
                  <p id="rating" class="red_title">${ratingInfo(game)}</p>
                </div>
                <div class="row stick"><p>${reddit_description}</p></div> 

                <div class="row stick">
                  <h5 class="col stick_bottom col-12 white_title">Plot</h5></div>
                  <p class="col stick col-12">${description}</p>
                </div>

                <div class="row stick justify-content-center">
                  <div class="flex_col_4 stick px-2">
                    <h5 class="stick_bottom white_title">Release Date</h5>
                    <p>${released}</p>
                  </div>

                  <div class="flex_col_4 stick px-2">
                    <h5 class="stick_bottom white_title">Developer</h5>
                    <p>${showSameCategory(developers, "developers")}</p>
                  </div>

                  <div class="flex_col_4 stick px-2">
                    <h5 class="stick_bottom white_title">Platform</h5>
                    <p>${showPlatforms(platforms)}</p>
                  </div>

                  <div id="publisher_zone" class="flex_col_4 stick px-2">
                    <h5 class="stick_bottom white_title">Publisher</h5>
                    <p id="publishers"></p>
                  </div>
                </div> 

                <div class="row stick justify-content-center">
                  <div class="flex_col_2 px-2">
                    <h5 class="stick_bottom white_title">Tags</h5>
                    <p>${showSameCategory(tags, "tags")}</p>
                  </div>

                  <div class="flex_col_2 px-2">
                    <h5 class="stick_bottom white_title">Genres</h5>
                    <p>${showSameCategory(genres, "genres")}</p>
                  </div>
                </div>

              ${showPurchase(stores)}

                <div id="trailer_zone" class="row game_attribute stick" >
                  <div class="col stick col-12">
                    <h3 class="red_title">TRAILER</h3>
                  </div>
                  <div id="trailer" class="col stick col-12">
                    <p></p>
                  </div>
                </div>

                <div id="screenshots" class="row game_attribute stick justify-content-center">
                  <div class="col stick col-12">
                    <h3 class="red_title">SCREENSHOTS</h3>
                  </div>
                </div>

                <div id="youtube" class="row game_attribute stick justify-content-center">
                  <div class="col stick col-12">
                    <h3 class="red_title">YOUTUBE</h3>
                  </div>
                </div>

                <div id="similar" class="row game_attribute stick justify-content-center">
                  <div class="col stick col-12">
                    <h3 class="red_title">SIMILAR GAMES</h3>
                  </div>
                </div>
              </div>
            </section>`;

          if (publishers !== (null || undefined)) {
            document.getElementById(
              "publishers"
            ).innerHTML = `${showSameCategory(publishers, "publishers")}`;
          } else {
            document.getElementById("publisher_zone").className.add("d-none");
          }

          if (clip) {
            document.getElementById("trailer").innerHTML = `           
              <video id="game_trailer" class="stick" controls>
                <source src="${clip.clips["320"]}" type="video/mp4">
                Your browser does not support the video tag.
              </video>`;
          } else {
            document.getElementById("trailer_zone").classList.add("d-none");
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
          return response;
        })
        .then((response) => {
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
