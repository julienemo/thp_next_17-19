export const fillSideBar = (thisWeek, allTimeBest) => {
  const sideBar = document.getElementById("sideBar");
  sideBar.innerHTML = `
    <a class="my-3 row side_btn" href="#games/${thisWeek}">
      <button class="btn btn_input">This week</button>
    </a>
    <a class="my-3 row side_btn" href="#games/${allTimeBest}">
      <button class="btn btn_input">All-time Best</button>
    </a>
  `;
};
