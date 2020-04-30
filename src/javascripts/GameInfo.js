import { noImage, reallyExists } from "./tools";
import { visualLimit } from "./index";

export const ratingInfo = (game) => {
  console.log(game.rating);
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
