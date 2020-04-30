import { noImage, reallyExists, cleanDate, releaseIndication } from "./tools";
import {
  apiUrl,
  visualLimit,
  visualDefault,
  handleException,
  defaultImg,
} from "./index";

export const ratingInfo = (game) => {
  if (!reallyExists(game.rating)) {
    return "NO RATING YET";
  }
  let counts = game.ratings.map((el) => el.count);
  let reducer = (accumulator, currentValue) => accumulator + currentValue;
  let votes = counts.reduce(reducer);
  return `${game.rating}/5 - ${votes} votes`;
};

export const showSameCategory = (category, categoryName) => {
  if (!reallyExists(category)) {
    return "TO BE ADDED";
  }
  let text = "";
  category.slice(0, visualLimit).forEach((el) => {
    text += `
    <a href="#games/${categoryName}=${el.slug}" class="internal">
      ${el.name}
    </a> `;
  });
  return text;
};

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

export const showPurchase = (stores) => {
  if (!reallyExists(stores)) {
    return "";
  }
  let innerHTML = "";
  stores.forEach((store) => {
    innerHTML += `<a href="${store.url}" target="_blank" title="go to ${store.store.name}" class="external white">${store.store.name}</a>, `;
  });
  return `
    <div id="purchase_zone" class="row game_attribute stick">
      <div class="col stick col-12">
        <h3 class="red_title">BUY</h3>
      </div>
      <div id="stores" class="col stick col-12">
        <p>${innerHTML}</p>
      </div>
    </div>`;
};

export const fetchImages = (gameSlug, gameName) => {
  fetch(`https://api.rawg.io/api/games/${gameSlug}/screenshots${visualDefault}`)
    .then((response) => response.json())
    .then((response) => {
      let screenshotZone = document.getElementById("screenshots");
      let imgs = response.results;
      if (reallyExists(imgs)) {
        imgs.forEach((img) => {
          screenshotZone.innerHTML += `
            <div class="flex_col_2 stick pr-1">
              <img class="screenshots" src=${noImage(
                img.image,
                defaultImg
              )} alt="a screen shot of ${gameName}"/>
            </div>`;
        });
      } else {
        document.getElementById("screenshots").classList.add("d-none");
      }
    })
    .catch((error) => {
      handleException(error);
    });
};

export const fetchYoutube = (gameSlug) => {
  fetch(`${apiUrl}/${gameSlug}/youtube${visualDefault}`)
    .then((response) => response.json())
    .then((response) => {
      let videos = response.results;
      let youtubeZone = document.getElementById("youtube");
      if (!reallyExists(videos)) {
        youtubeZone.classList.add("d-none");
      }
      videos.forEach((video) => {
        youtubeZone.innerHTML += `
            <div class="flex_col_2 stick iframe_container pr-1">
              <iframe width="640" height="360" class="stick youtube w-100" 
                 src="https://www.youtube.com/embed/${video.external_id}">
              </iframe>
              <p class="white_title">${video.name}</p>
              <p class="red_title">${video.channel_title} | ${cleanDate(
          video.created
        )}</p>
            </div>`;
      });
    })
    .catch((error) => {
      handleException(error);
    });
};

export const fetchSimilar = (gameId) => {
  fetch(`${apiUrl}/${gameId}/suggested${visualDefault}`)
    .then((response) => response.json())
    .then((response) => {
      let games = response.results;
      let similarZone = document.getElementById("similar");

      if (reallyExists(games)) {
        games.forEach((game) => {
          similarZone.innerHTML += fillSingleCard(game);
        });
      } else {
        similarZone.classList.add("d-none");
      }
    });
};

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
          <p class="text">Genres: ${showSameCategory(game.genres, "genre")}</p>

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
