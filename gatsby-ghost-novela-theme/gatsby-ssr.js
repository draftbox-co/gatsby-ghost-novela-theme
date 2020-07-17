import React from "react";

export const onPreRenderHTML = ({ pathname, replacePreBodyComponents }) => {
  if (pathname.includes("/amp/")) {
    replacePreBodyComponents([]);
  }
};

export const onRenderBody = ({ pathname, setHeadComponents }) => {
  setHeadComponents([
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: `import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';`,
      }}
    ></script>,
    <style
      dangerouslySetInnerHTML={{
        __html: `pwa-update {
      display: none;
    }`,
      }}
    ></style>,
    <pwa-update showOfflineToast="false"></pwa-update>,
  ]);
};
