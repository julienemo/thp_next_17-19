var moment = require("moment");

export const cleanDate = (dateString) => {
  return moment(dateString).format("YYYY/MM/DD");
};
