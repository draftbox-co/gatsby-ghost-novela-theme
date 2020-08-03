import React from "react";

export interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
}

interface IGatsbyImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface IGatsbyImageFluid extends IGatsbyImage {
  maxHeight: number;
  maxWidth: number;
}

interface IGatsbyImageFixed extends IGatsbyImage {
  height: number;
  width: number;
}

// export interface IAuthor {
//   authorsPage?: boolean;
//   featured?: boolean;
//   name: string;
//   slug: string;
//   bio: string;
//   avatar: {
//     image: IGatsbyImageFluid;
//     full: IGatsbyImageFluid;
//   };
// }

export interface IAuthor {
  name: string;
  slug: string;
  bio: string;
  profile_image: string;
  twitter: string;
  facebook: string;
  social: { name: string; url: string }[];
}

export interface ITag {
  name: string;
  slug: string;
  description: string;
  visibility: boolean;
  postCount: number;
  feature_image: string;
}

export interface IArticle {
  title: string;
  html?: string;
  mdx: string;
  og_title: string;
  featured: boolean;
  og_description: string;
  feature_image: string;
  twitter_title: string;
  twitter_description: string;
  meta_title: string;
  meta_description: string;
  primary_author: {
    name: string;
    slug: string;
  };
  published_at: string;
  updated_at: string;
  slug: string;
  authors: IAuthor[];
  tags: ITag[];
  excerpt: string;
  body: string;
  id: string;
  localFeatureImage: {
    childImageSharp: any;
    publicURL: string;
  };
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    seo: string;
  };
  readingTime: string;
  date: string;
}

interface IArticleQuery {
  edges: {
    node: IArticle;
  }[];
}

export interface IProgress {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
}

export type Icon = React.FC<{
  fill: string;
}>;

export type Template = React.FC<{
  pageContext: {
    article: IArticle;
    authors: IAuthor[];
    mailchimp: boolean;
    next: IArticle[];
  };
  location: Location;
}>;
