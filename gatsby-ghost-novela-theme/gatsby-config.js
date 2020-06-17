/* eslint-disable */

const siteConfigDefaults = require(`./src/utils/siteConfig`);
const ghostConfigDefaults = require(`./src/utils/.ghost.json`);

module.exports = (themeOptions) => {
  const siteConfig = themeOptions.siteConfig || siteConfigDefaults;
  const ghostConfig = themeOptions.ghostConfig || ghostConfigDefaults;
  const finalConfig =
    process.env.NODE_ENV === `development`
      ? ghostConfig.development
      : ghostConfig.production;

  siteConfig.apiUrl = finalConfig.apiUrl;

  return {
    pathPrefix: "",
    siteMetadata: siteConfig,
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-image`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-transformer-remark`,
      `gatsby-transformer-yaml`,
      `gatsby-plugin-theme-ui`,
      `gatsby-plugin-mdx`,
      {
        resolve: `gatsby-plugin-emotion`,
        options: {
          displayName: process.env.NODE_ENV === `development`,
        },
      },
      {
        resolve: `gatsby-source-ghost`,
        options:
          process.env.NODE_ENV === `development`
            ? ghostConfig.development
            : ghostConfig.production,
      },
    ],
  };
};
