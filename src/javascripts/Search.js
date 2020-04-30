import { speChars } from "./index";

export const submitSearch = (searchInput) => {
  let keywords = searchInput.value
    .toLowerCase()
    .replace(speChars, "")
    .replace(/\s/, "-");
  window.location.href = `#games/search=${keywords}`;
};
