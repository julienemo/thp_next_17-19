var moment = require("moment");

import { timeFrom } from "./index";

export const cleanDate = (dateString) => {
  return moment(dateString).format("YYYY-MM-DD");
};

export const noImage = (image, defaultImg) => {
  if (image === null) {
    return defaultImg;
  } else {
    return image;
  }
};

export const reallyExists = (thing) => {
  return !(thing == 0 || thing === null || thing === undefined || thing === 0);
};

export const releaseIndication = (date) => {
  console.log(timeFrom);
  console.log(date);
  if (timeFrom > date) {
    return "RELEASED";
  } else {
    return "TO BE RELEASED";
  }
};
