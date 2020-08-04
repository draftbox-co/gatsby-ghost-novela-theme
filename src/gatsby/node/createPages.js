/* eslint-disable no-console, import/no-extraneous-dependencies, prefer-const, no-shadow */

require("dotenv").config();

const fs = require("fs");

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);

const path = require("path");
const createPaginatedPages = require("gatsby-paginate");

const templatesDirectory = path.resolve(__dirname, "../../templates");
const templates = {
  articles: path.resolve(templatesDirectory, "articles.template.tsx"),
  article: path.resolve(templatesDirectory, "article.template.tsx"),
  author: path.resolve(templatesDirectory, "author.template.tsx"),
  tag: path.resolve(templatesDirectory, "tag.template.tsx"),
  page: path.resolve(templatesDirectory, "page.template.tsx"),
  ampPage: path.resolve(templatesDirectory, "article.template.amp.tsx"),
};

const query = require("../data/data.query");
const normalize = require("../data/data.normalize");

// ///////////////// Utility functions ///////////////////

function buildPaginatedPath(index, basePath) {
  if (basePath === "/") {
    return index > 1 ? `${basePath}page/${index}` : basePath;
  }
  return index > 1 ? `${basePath}/page/${index}` : basePath;
}

function slugify(string, base) {
  const slug = string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return `${base}/${slug}`.replace(/\/\/+/g, "/");
}

function getUniqueListBy(array, key) {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}

const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO);

// ///////////////////////////////////////////////////////

module.exports = async ({ actions: { createPage }, graphql }, themeOptions) => {
  const {
    rootPath,
    basePath = "/",
    authorsPath = "/authors",
    authorsPage = true,
    // pageLength = 6,
    sources = {},
    mailchimp = "",
  } = themeOptions;

  const { data } = await graphql(`
    query siteQuery {
      site {
        siteMetadata {
          siteUrl
          postsPerPage
        }
      }
    }
  `);

  const pageLength = data.site.siteMetadata.postsPerPage;

  // Defaulting to look at the local MDX files as sources.
  const { local = true, contentful = false } = sources;

  let authors;
  let articles;
  let tags;
  let pages;
  let ghostSettings;

  const dataSources = {
    ghost: { authors: [], articles: [], tags: [], pages: [] },
  };

  if (rootPath) {
    log("Config rootPath", rootPath);
  } else {
    log("Config rootPath not set, using basePath instead =>", basePath);
  }

  log("Config basePath", basePath);
  if (authorsPage) log("Config authorsPath", authorsPath);

  // ghost posts
  try {
    const ghostArticles = await graphql(query.ghost.articles);
    const ghostAuthors = await graphql(query.ghost.authors);
    const ghostTags = await graphql(query.ghost.tags);
    const ghostPages = await graphql(query.ghost.pages);
    const ghostSettingsData = await graphql(query.ghost.siteSettings);

    dataSources.ghost.articles = ghostArticles.data.articles.edges.map(
      normalize.ghost.articles
    );

    // Normalize author here if required
    dataSources.ghost.authors = ghostAuthors.data.authors.edges.map(
      (author) => author.node
    );

    dataSources.ghost.pages = ghostPages.data.pages.edges.map(
      normalize.ghost.articles
    );

    dataSources.ghost.tags = ghostTags.data.tags.edges.map((tag) => tag.node);

    websiteTitle = ghostSettingsData.data.site.siteMetadata.siteTitle;
  } catch (error) {
    console.log(error);
  }

  // Combining together all the articles from different sources
  articles = [...dataSources.ghost.articles].sort(byDate);

  authors = [...dataSources.ghost.authors];

  tags = [...dataSources.ghost.tags];

  pages = [...dataSources.ghost.pages];

  const articlesThatArentSecret = articles.filter((article) => !article.secret);

  log("Creating", "articles page");
  createPaginatedPages({
    edges: articlesThatArentSecret,
    pathPrefix: basePath,
    createPage,
    pageLength,
    pageTemplate: templates.articles,
    buildPath: buildPaginatedPath,
    context: {
      // authors,
      basePath,
      skip: pageLength,
      limit: pageLength,
    },
  });

  // /**
  //  * Once the list of articles have bene created, we need to make individual article posts.
  //  * To do this, we need to find the corresponding authors since we allow for co-authors.
  //  */
  articles.forEach((article, index) => {
    //   /**
    //    * We need a way to find the next artiles to suggest at the bottom of the articles page.
    //    * To accomplish this there is some special logic surrounding what to show next.
    //    */
    let next = articlesThatArentSecret.slice(index + 1, index + 3);
    // If it's the last item in the list, there will be no articles. So grab the first 2
    if (next.length === 0) next = articlesThatArentSecret.slice(0, 2);
    // If there's 1 item in the list, grab the first article
    if (next.length === 1 && articlesThatArentSecret.length !== 2)
      next = [...next, articlesThatArentSecret[0]];
    if (articlesThatArentSecret.length === 1) next = [];

    createPage({
      path: article.slug,
      component: templates.article,
      context: {
        article,
        // authors: authorsThatWroteTheArticle,
        basePath,
        permalink: `${data.site.siteMetadata.siteUrl}${article.slug}/`,
        slug: article.slug,
        id: article.id,
        title: article.title,
        canonicalUrl: article.canonical_url,
        mailchimp,
        next,
      },
    });
  });

  // Generation of Amp Pages

  articles.forEach((article) => {
    createPage({
      path: `${article.slug}/amp`,
      component: templates.ampPage,
      context: {
        slug: article.slug,
        title: websiteTitle,
        amp: true,
      },
    });
  });

  // Genration of pages

  pages.forEach((article, index) => {
    //   /**
    //    * We need a way to find the next artiles to suggest at the bottom of the articles page.
    //    * To accomplish this there is some special logic surrounding what to show next.
    //    */
    createPage({
      path: article.slug,
      component: templates.page,
      context: {
        article,
        basePath,
        permalink: `${data.site.siteMetadata.siteUrl}${article.slug}/`,
        slug: article.slug,
        id: article.id,
        title: article.title,
        canonicalUrl: article.canonical_url,
      },
    });
  });

  // /**
  //  * By default the author's page is not enabled. This can be enabled through the theme options.
  //  * If enabled, each author will get their own page and a list of the articles they have written.
  //  */
  // if (authorsPage) {
  //   log('Creating', 'authors page');
  // }

  // Authors Pages builder

  const articlesWithFlatAuthorNames = articles.map((article) => ({
    ...article,
    authors: [...article.authors.map((author) => author.slug)],
  }));

  authors.forEach((author) => {
    // const articlesTheAuthorHasWritten = articlesThatArentSecret.filter(
    //   (article) =>
    //     article.author.toLowerCase().includes(author.name.toLowerCase())
    // );

    const articlesTheAuthorHasWritten = articlesWithFlatAuthorNames.filter(
      (article) => article.authors.includes(author.slug)
    );

    let modifiedAuthor = Object.keys(author).reduce(
      (acc, dec) => {
        if (dec === "twitter" && author[dec]) {
          return {
            ...acc,
            social: [
              ...acc.social,
              {
                name: "twitter",
                url: `https://twitter.com/${author[dec]}`,
              },
            ],
            [dec]: author[dec],
          };
        }
        if (dec === "facebook" && author[dec]) {
          return {
            ...acc,
            social: [
              ...acc.social,
              {
                name: "facebook",
                url: `https://facebook.com/${author[dec]}`,
              },
            ],
            [dec]: author[dec],
          };
        }
        return { ...acc, social: [...acc.social], [dec]: author[dec] };
      },
      { social: [] }
    );

    const path = slugify(author.slug, authorsPath);

    createPaginatedPages({
      edges: articlesTheAuthorHasWritten,
      pathPrefix: "author/" + author.slug,
      createPage,
      pageLength,
      pageTemplate: templates.author,
      buildPath: buildPaginatedPath,
      context: {
        author: modifiedAuthor,
        originalPath: path,
        // originalPath: author.slug,
        skip: pageLength,
        limit: pageLength,
      },
    });
  });

  const articlesWithFlatTagNames = articles.map((article) => ({
    ...article,
    flatTags: [...article.tags.map((tag) => tag.slug)],
  }));

  tags.forEach((tag) => {
    const articlesWithTag = articlesWithFlatTagNames.filter((article) =>
      article.flatTags.includes(tag.slug)
    );

    const path = slugify(tag.slug, "/tags");

    createPaginatedPages({
      edges: articlesWithTag,
      pathPrefix: "tag/" + tag.slug,
      createPage,
      pageLength,
      pageTemplate: templates.tag,
      buildPath: buildPaginatedPath,
      context: {
        tag: tag,
        originalPath: path,
        // originalPath: author.slug,
        skip: pageLength,
        limit: pageLength,
      },
    });
  });
};
