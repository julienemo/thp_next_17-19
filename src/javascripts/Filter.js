import { platformUrl, handleException } from "./index";

export const fillFilter = (platform) => {
  fetch(platformUrl)
    .then((response) => response.json())
    .then((response) => {
      const filter = document.getElementById("platform_filter");
      let results = response.results;
      let innerHTML = `<option selected="true" disabled="disabled">--See popular platforms--</option>`;
      results.forEach((result) => {
        innerHTML += `<option value="${result.id}">${result.name}</option>`;
      });

      filter.innerHTML += innerHTML;

      const actionFilter = () => {
        let currentFilters = window.location.href;
        console.log(currentFilters);
        if (currentFilters.match(/\=/) === null) {
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

      filter.addEventListener("change", actionFilter);
    })
    .catch((error) => {
      handleException(error);
    });
};
