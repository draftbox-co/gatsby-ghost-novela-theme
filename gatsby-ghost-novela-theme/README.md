[![Draftbox](https://res.cloudinary.com/thinkcdnimages/image/upload/v1589291053/Draftbox/draftbox-for-github.svg)](https://draftbox.co)

# gatsby-ghost-novela-theme

A Gatsby theme plugin for creating blogs from headless Ghost CMS.

Turn your Ghost blog into a lightning fast static website. This Gatsby theme is a frontend replacement of the Ghost handlebars engine featuring Novela theme skin and functionality. All content is sourced from a headless Ghost CMS.

> This theme is being used at [Draftbox](https://draftbox.co). Get lightning fast, secure front-end for your WordPress or Ghost blog, in 5 minutes or less, without coding. For our fellow devs, we also provide code export feature.

## Demo

Play with the [Demo](https://ghost-novela-preview.draftbox.co/) to get a first impression.

## Features

- Novela theme by Narrative
- SEO optimized
- Fully responsive
- Gatsby images
- Styled 404 page
- RSS Feed
- AMP Pages
- Sitemap
- Contact Form
- Subscribe Form
- Social Sharing
- Composable and extensible

## Installation

> Head over to the [starter repo](https://github.com/draftbox-co/gatsby-ghost-novela-starter) to get up and running quickly!

If you want to add this blog theme to an existing site, follow these instructions:

1. Install the blog theme

   ```bash
   yarn add @draftbox-co/gatsby-ghost-novela-theme
   # or
   npm install @draftbox-co/gatsby-ghost-novela-theme --save
   ```

2. Add the following configuration to your `gatsby-config.js` file

   ```js
   // gatsby-config.js
   module.exports = {
     plugins: [
       {
         resolve: `@draftbox-co/gatsby-ghost-novela-theme`,
         options: {
           siteConfig: {
             siteUrl: "https://ghost-novela-preview.draftbox.com",
             postsPerPage: 12,
             siteTitleMeta: "Built with Draftbox",
             siteDescriptionMeta:
               "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding.",
             shareImageWidth: 1000,
             shareImageHeight: 523,
             shortTitle: "Built with Draftbox",
             siteIcon: "favicon.png",
             backgroundColor: "#e9e9e9",
             themeColor: "#15171A",
             apiUrl: "https://ghost.theasdfghjkl.com",
             header: {
               navigation: [
                 {
                   label: "Home",
                   url: "https://ghost-novela-preview.draftbox.co/",
                 },
                 {
                   label: "Contact",
                   url: "https://ghost-novela-preview.draftbox.co/contact",
                 },
               ],
             },
             footer: {
               copyright: "Built with Draftbox",
               navigation: [
                 {
                   label: "Home",
                   url: "https://ghost-novela-preview.draftbox.co/",
                 },
                 {
                   label: "Sitemap",
                   url: "https://ghost-novela-preview.draftbox.co/sitemap.xml",
                 },
                 {
                   label: "RSS",
                   url: "https://ghost-novela-preview.draftbox.co/rss.xml",
                 },
                 {
                   label: "Contact",
                   url: "https://ghost-novela-preview.draftbox.co/contact",
                 },
                 {
                   label: "External Link",
                   url: "https://spectrum.chat/gatsby-js/themes?tab=posts",
                 },
               ],
             },
             subscribeWidget: {
               title: "Subscribe to Built with Draftbox",
               helpText: "Get the latest posts delivered right to your inbox.",
               successMessage: "Thanks for subscribing to Built with Draftbox.",
             },
             socialLinks: {
               twitter: "https://twitter.com/draftboxhq",
               facebook: "https://facebook.com/",
               instagram: "https://www.instagram.com/",
               linkedin: "https://linkedin.com",
               github: "https://github.com/draftbox-co",
             },
             contactWidget: {
               title: "Contact Built with Draftbox",
               successMessage: "We’ll get in touch with you soon.",
             },
           },
           ghostConfig: {
             development: {
               apiUrl: "http://localhost:2368",
               contentApiKey: "9fcfdb1e5ea5b472e2e5b92942",
             },
             production: {
               apiUrl: "https://your-ghost-cms.com",
               contentApiKey: "9fcfdb1e5ea5b472e2e5b92942",
             },
           },
         },
       },
     ],
   };
   ```

3. Update siteConfig

   In the configuration shown above, the most important fields to be changed are `siteUrl`, `siteTitleMeta` and `siteDescriptionMeta`. Update at least those to fit your needs. Also make sure your `favicon.png` can be found in folder `static` of your working directory.

4. Ghost Content API Keys

   Change the `apiUrl` value to the URL of your Ghost CMS site. Next, update the `contentApiKey` value to a key associated with the Ghost CMS site. A key can be provided by creating an integration within Ghost Admin. Navigate to Integrations and click "Add new integration". Name the integration appropriately and click create.

## Running

Start the development server. You now have a Gatsby site pulling content from headless Ghost.

```bash
gatsby develop
```

## Optimizing

You can disable the default Ghost Handlebars Theme front-end by enabling the `Make this site private` flag within your Ghost settings. This enables password protection in front of the Ghost install and sets `<meta name="robots" content="noindex" />` so your Gatsby front-end becomes the source of truth for SEO.

## Authors

- Arun Priyadarshi ([@Gunnerforlife](https://github.com/Gunnerforlife)) – [Draftbox](https://draftbox.co)
- Keyur Raval ([@thandaanda](https://github.com/thandaanda)) – [Draftbox](https://draftbox.co)
- Shyam Lohar ([@shyamlohar](https://github.com/shyamlohar)) – [Draftbox](https://draftbox.co)
- Tanmay Desai ([@tanmaydesai89](https://github.com/tanmaydesai89)) – [Draftbox](https://draftbox.co)

## Contributions

PRs are welcome! Consider contributing to this project if you are missing feature that is also useful for others.

# Copyright & License

Copyright (c) 2020 [Draftbox](https://draftbox.co) - Released under the [MIT license](LICENSE).
