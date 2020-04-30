import { platformUrl, handleException } from "./index";

export const fillFilter = (thisWeekArgument, orderByRating) => {
  fetch(platformUrl)
    .then((response) => response.json())
    .then((response) => {
      const filter = document.getElementById("platform_filter");
      let results = response.results;
      let innerHTML = `<option selected="true" disabled="disabled">--See popular platforms--</option>`;
      results.forEach((result) => {
        innerHTML += `<option value="${result.id}">${result.name}</option>`;
      });
      const actionFilter = (thisWeek, best) => {
        let currentFilters = window.location.href;
        if (currentFilters.match(/this-week/)) {
          window.location.href = window.location.href.replace(
            /this-week/,
            `${thisWeek}&platforms=${filter.value}`
          );
        } else if (currentFilters.match(/all-time-best/)) {
          window.location.href = window.location.href.replace(
            /all-time-best/,
            `${best}&platforms=${filter.value}`
          );
        } else if (currentFilters.match(/\=/) === null) {
          window.location.href += `#games/platforms=${filter.value}`;
        } else if (currentFilters.match(/platforms/) === null) {
          window.location.href += `&platforms=${filter.value}`;
        } else if (currentFilters.match(/platforms=\w*\&/) === null) {
          window.location.href = window.location.href.replace(
            /platforms=\w*/,
            `platforms=${filter.value}`
          );
        } else {
          window.location.href = window.location.href.replace(
            /platforms=\w*\&/,
            `platforms=${filter.value}&`
          );
        }
      };
      filter.innerHTML += innerHTML;

      filter.addEventListener("change", () => {
        actionFilter(thisWeekArgument, orderByRating);
      });
    })
    .catch((error) => {
      handleException(error);
    });
};
