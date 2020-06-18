exports.onPreRenderHTML = ({ pathname, replacePreBodyComponents }) => {
  if (pathname.includes("/amp/")) {
    replacePreBodyComponents([]);
  }
};
