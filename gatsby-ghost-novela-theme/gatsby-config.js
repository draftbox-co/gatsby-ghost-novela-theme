/* eslint-disable */

const siteConfigDefaults = require(`./src/utils/siteConfig`);
const ghostConfigDefaults = require(`./src/utils/.ghost.json`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);
const path = require("path");

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
      `gatsby-plugin-mdx`,
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-force-trailing-slashes`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `images`),
          name: `images`,
        },
      },
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
      {
        resolve: require.resolve(`./plugins/gatsby-plugin-ghost-manifest`),
        options: {
          short_name: siteConfig.shortTitle,
          start_url: `/`,
          background_color: siteConfig.backgroundColor,
          theme_color: siteConfig.themeColor,
          display: `minimal-ui`,
          icon: `static/${siteConfig.siteIcon}`,
          legacy: true,
          query: `{
            site {
              siteMetadata {
                siteTitle
                siteDescription
              }
            }
          }`,
        },
      },
      {
        resolve: `@draftbox-co/gatsby-plugin-amp`,
        options: {
          canonicalBaseUrl: siteConfig.siteUrl,
          components: [`amp-form`],
          excludedPaths: [`/404*`, `/`, `/offline*`],
          pathIdentifier: `amp/`,
          relAmpHtmlPattern: `{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}`,
          useAmpClientIdApi: true,
          dirName: __dirname,
          themePath: `src/amp-styles/post.amp.css`,
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `{
            allGhostSettings {
              edges {
                node {
                  title
                  description
                }
              }
            }
          }`,
          feeds: [generateRSSFeed(siteConfig)],
        },
      },
      {
        resolve: `gatsby-plugin-advanced-sitemap`,
        options: {
          query: `{
            allGhostPost {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostPage {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostTag {
              edges {
                node {
                  id
                  slug
                  feature_image
                }
              }
            }
            allGhostAuthor {
              edges {
                node {
                  id
                  slug
                  profile_image
                }
              }
            }
          }
          `,
          mapping: {
            allGhostPost: {
              sitemap: `posts`,
            },
            allGhostTag: {
              sitemap: `tags`,
            },
            allGhostAuthor: {
              sitemap: `authors`,
            },
            allGhostPage: {
              sitemap: `pages`,
            },
          },
          exclude: [
            `/dev-404-page`,
            `/404`,
            `/404.html`,
            `/offline-plugin-app-shell-fallback`,
            "/offline",
            "/offline.html",
          ],
          createLinkInHead: true,
          addUncaughtPages: true,
        },
      },
      `gatsby-plugin-theme-ui`,
      {
        resolve: `gatsby-plugin-remove-generator`,
        options: {
          content: `Draftbox`,
        },
      },
      {
        resolve: `@draftbox-co/gatsby-plugin-webfonts`,
        options: {
          fonts: {
            google: [
              {
                family: "Merriweather",
                variants: ["400", "400i", "600", "700"],
                //subsets: ['latin']
                //text: 'Hello'
                fontDisplay: "swap",
                strategy: "selfHosted", // 'base64' || 'cdn'
              },
            ]
          },
          formats: ["woff2", "woff"],
          useMinify: true,
          usePreload: true,
          usePreconnect: true,
          blacklist: ["/amp"],
        },
      },
      {
        resolve: `@draftbox-co/gatsby-plugin-css-variables`,
        options: {
          variables: [
            { varName: "--accent-color", value: "#6166DC" },
            { varName: "--accent-color-dark", value: "#E9DAAC" },
            { varName: "--success-color", value: "#46B17B" },
            { varName: "--success-color-dark", value: "#46B17B" },
            {
              varName: "--merriweather-font",
              value: `'Merriweather', Georgia, Serif`,
            },
            {
              varName: "--merriweather-font-semibold",
              value: `600`,
            },
            {
              varName: "--merriweather-font-bold",
              value: `700`,
            },
            {
              varName: "--system-font",
              value: `'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif`,
            },
            {
              varName: "--monospace-font",
              value: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
            },
          ],
        },
      },
    ],
  };
};
