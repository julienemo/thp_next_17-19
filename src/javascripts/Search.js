import { speChars } from "./index";

export const submitSearch = (searchInput) => {
  console.log("in submit search");
  let keywords = searchInput.value
    .toLowerCase()
    .replace(speChars, "")
    .split(" ")
    .join(",");
  window.location.href = `#games/search=${keywords}`;
};
