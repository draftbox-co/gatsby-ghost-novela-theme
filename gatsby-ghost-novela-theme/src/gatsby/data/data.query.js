/* eslint-disable */

// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

const GatsbyFluid_withWebp = `
  base64
  aspectRatio
  src
  srcSet
  sizes
`;

module.exports.ghost = {
  articles: `{
    articles: allGhostPost(
      sort: {fields: [featured, published_at], order: [DESC, DESC]}
      filter: { slug: { ne: "data-schema" } }
    ) {
      edges {
        node {
          id
          date: published_at(formatString: "MMMM Do, YYYY")
          slug
          title
          og_title
          og_description
          feature_image 
          featured
          twitter_title
          twitter_description
          meta_title
          meta_description
          dateForSEO: updated_at(formatString: "MMMM Do, YYYY")
          excerpt
          canonical_url
          readingTime
          body: mdx
          authors {
            name
            slug
            bio
            profile_image
          }
          tags {
            slug
            name
            visibility
            postCount
            feature_image
          }
          primary_author {
            name
            slug
          }
          published_at(formatString: "DD MMMM YYYY")
          updated_at(formatString: "DD MMMM YYYY")
          localFeatureImage {
            childImageSharp {
              fluid(maxWidth: 2000, sizes: "90") {
                src
                srcSet
                src
                srcSet
                srcWebp
                srcSetWebp
              }
            }
            extension
            publicURL
          }
          hero: localFeatureImage {
            full: childImageSharp {
              fluid(maxWidth: 944, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 100) {
                src
              }
            }
          }
        }
      }
    }
  }`,
  pages: `{
    pages: allGhostPage(
      sort: { fields: [updated_at, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          date: updated_at(formatString: "MMMM Do, YYYY")
          slug
          title
          og_title
          og_description
          feature_image 
          twitter_title
          twitter_description
          meta_title
          meta_description
          dateForSEO: updated_at(formatString: "MMMM Do, YYYY")
          excerpt
          canonical_url
          readingTime
          body: mdx
          authors {
            name
            slug
            bio
            profile_image
          }
          tags {
            slug
            name
            visibility
            postCount
            feature_image
          }
          primary_author {
            name
            slug
          }
          published_at(formatString: "DD MMMM YYYY")
          updated_at(formatString: "DD MMMM YYYY")
          localFeatureImage {
            childImageSharp {
              fluid(maxWidth: 2000, sizes: "90") {
                src
                srcSet
                src
                srcSet
                srcWebp
                srcSetWebp
              }
            }
            publicURL
            extension
          }
          hero: localFeatureImage {
            full: childImageSharp {
              fluid(maxWidth: 944, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 100) {
                ${GatsbyFluid_withWebp}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 100) {
                src
              }
            }
          }
        }
      }
    }
  }`,
  authors: `{
    authors: allGhostAuthor {
      edges {
        node {
          bio
          name
          slug
          postCount
          profile_image
          twitter 
          facebook
        }
      }
    }
  }`,
  tags: `{
    tags: allGhostTag {
      edges {
        node {
          name
          slug
          description
          postCount
          feature_image
        }
      }
    }
  }`,
  siteSettings: `{
    site {
      siteMetadata {
        siteTitle
      }
    }
  }`,
};
