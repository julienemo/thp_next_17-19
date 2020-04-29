// on key up, autocomplete
// on submit, redirect to search result

// search.addEventListener('submit', submitSearch)
// search.addEventListener('change', autocomplete)
import { speChars } from "./index";
import { PageList } from "./PageList";

export const submitSearch = (searchInput) => {
  console.log("in submit search");
  let keywords = searchInput.value
    .toLowerCase()
    .replace(speChars, "")
    .split(" ")
    .join(",");
  window.location.href = `#games/?search=${keywords}`;
};
