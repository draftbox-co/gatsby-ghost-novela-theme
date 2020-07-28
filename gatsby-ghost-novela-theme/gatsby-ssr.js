import React from "react";

export const onPreRenderHTML = ({ pathname, replacePreBodyComponents }) => {
  if (pathname.includes("/amp/")) {
    replacePreBodyComponents([]);
  }
};