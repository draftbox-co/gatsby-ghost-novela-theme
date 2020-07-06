import { graphql } from "gatsby";

// Used for settings
export const ghostSettingsFields = graphql`
  fragment GhostSettingsFields on GhostSettings {
    title
    description
    logo
    icon
    cover_image
    facebook
    twitter
    lang
    timezone
    codeinjection_head
    codeinjection_foot
    codeinjection_styles
    navigation {
      label
      url
    }
  }
`;

// Used for site config
export const siteMetadataFields = graphql`
  fragment SiteMetadataFields on SiteSiteMetadata {
    siteUrl
    postsPerPage
    siteTitleMeta
    siteDescriptionMeta
    shareImageWidth
    shareImageHeight
    shortTitle
    siteIcon
    backgroundColor
    themeColor
    siteTitle
    siteDescription
    language
    logoUrl
    alternateLogoUrl
    coverUrl
    metadata {
      title
      description
    }
    twitterCard {
      title
      description
      imageUrl
      username
    }
    facebookCard {
      title
      description
      imageUrl
      appId
      height
      width
    }
  }
`;
