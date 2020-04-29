var moment = require("moment");

export const cleanDate = (dateString) => {
  return moment(dateString).format("YYYY.MM.DD");
};

export const noImage = (image, defaultImg) => {
  if (image === null) {
    return defaultImg;
  } else {
    return image;
  }
};
