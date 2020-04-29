import { apiUrl, contentZone, handleException, limit } from "./index";
import { cleanDate } from "./tools";

export const showPlatforms = (platforms) => {
  let platformInnerHTML = "";
  platforms.forEach((el) => {
    platformInnerHTML += `
    <a href="#games/?platform=${el.platform.slug}" class="internal">
      ${el.platform.name}
    </a> `;
  });
  return platformInnerHTML;
};

export const showSameCategory = (category, categoryName) => {
  console.log(categoryName);
  let categoryInnerHTML = "";
  category.forEach((el) => {
    categoryInnerHTML += `
    <a href="#games/?${categoryName}=${el.slug}" class="internal">
      ${el.name}
    </a> `;
  });
  console.log(categoryInnerHTML);
  return categoryInnerHTML;
};

export const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const showPurchase = (stores) => {
      let innerHTML = "";
      stores.forEach((store) => {
        innerHTML += `<a href="${store.url}" target="_blank" class="external white">${store.store.name}</a>, `;
      });
      return innerHTML;
    };

    const countVotes = (ratings) => {
      let counts = ratings.map((el) => el.count);
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      return counts.reduce(reducer);
    };

    const fetchImages = (gameSlug, gameName) => {
      fetch(`${apiUrl}/${gameSlug}/screenshots`)
        .then((response) => response.json())
        .then((response) => {
          let imgs = response.results.slice(0, limit);
          let screenshotZone = document.getElementById("screenshots");
          imgs.forEach((img) => {
            screenshotZone.innerHTML += `
            <div class="col col-6 stick pr-1">
              <img class="screenshots" src=${img.image} alt="a screen shot of ${gameName}"/>
            </div>`;
          });
        })
        .catch((error) => {
          handleException(error);
        });
    };

    const fetchYoutube = (gameSlug) => {
      fetch(`${apiUrl}/${gameSlug}/youtube`)
        .then((response) => response.json())
        .then((response) => {
          let videos = response.results
            .sort((a, b) => (a.released < b.released ? 1 : -1))
            .slice(0, limit);
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

    const fetchGame = (argument) => {
      let finalURL = apiUrl + "/" + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let {
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

          pageContent.innerHTML = `
            <section class="page-detail mt-5">
              <div id="article" class="stick">
                <div class="row game_cover_image" style='background-image: url("${background_image}");'>
                  <a class="external" href="${website}" target="_blank"> <button id="game_site_btn" class="title_font red-bg white btn_input">Check Website  >> </button></a>
                </div>

                <div class="row m-0 p-0 justify-content-between">
                  <h1 class="title title_font align_to_bottom">${name}</h1>
                  <p id="rating" class="red title_font">${rating}/5 - ${countVotes(
            ratings
          )} votes</p>
                </div>
                <div class="row stick"><p>${reddit_description}</p></div> 

                <div class="row stick">
                  <h5 class="col stick_bottom col-12 title_font white">Plot</h5></div>
                  <p class="col col-12">${description}</p>
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

                <div class="row stick" >
                  <div class="col stick col-12">
                    <h3 class=" title_font red">BUY</h3>
                  </div>
                  <div id="stores" class="col stick col-12">
                    <p>${showPurchase(stores)}</p>
                  </div>
                </div>

                <div class="row stick" >
                  <div class="col stick col-12">
                    <h3 class="title_font red">TRAILER</h3>
                  </div>
                  <div id="trailer" class="col stick col-12">
                    <p class="font_title white">This game has no trailer clip</p>
                  </div>
                </div>

                <div id="screenshots" class="row stick">
                  <div class="col stick col-12">
                    <h3 class="title_font red">SCREENSHOTS</h3>
                  </div>
                </div>

                <div id="youtube" class="row stick">
                  <div class="col stick col-12">
                    <h3 class="title_font red">YOUTUBE</h3>
                  </div>
                </div>
              </div>
            </section>`;
          if (publishers.length > 0) {
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
          return { slug: slug, name: name };
        })
        .then((response) => {
          fetchImages(response.slug, response.name);
          return response.slug;
        })
        .then((response) => {
          fetchYoutube(response);
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
