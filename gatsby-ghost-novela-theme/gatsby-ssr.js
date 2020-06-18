const fs = require("fs");

exports.onPreRenderHTML = ({ pathname, replacePreBodyComponents }) => {
  fs.appendFileSync("pathName.txt", pathname + "\n");

  if (pathname.includes("/amp/")) {
    replacePreBodyComponents([]);
  }
};
