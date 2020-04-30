export const fillSideBar = () => {
  const sideBar = document.getElementById("sideBar");
  sideBar.innerHTML = `
    <a class="my-3 row side_btn" href="#games/this-week">
      <button class="btn btn_input">This week</button>
    </a>
    <a class="my-3 row side_btn" href="#games/all-time-best">
      <button class="btn btn_input">All-time Best</button>
    </a>
  `;
};
