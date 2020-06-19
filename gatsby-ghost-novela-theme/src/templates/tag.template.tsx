import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import { Template } from "@types";
import TagHero from "../sections/tag/Tag.Hero";
import TagArticles from "../sections/tag/Tag.Articles";
import { MetaData } from "@components/meta";

const TagPage: Template = ({ location, pageContext }) => {
  const tag = pageContext.additionalContext.tag;
  const articles = pageContext.group;

  return (
    <Layout>
      <MetaData data={{ ghostTag: tag }} location={location} />
      {/* <SEO
        pathname={location.pathname}
        title={author.name}
        description={author.bio}
      /> */}
      <Section narrow>
        <TagHero tag={tag} />
        <TagArticles articles={articles} />
        <AuthorPaginator>
          <Paginator {...pageContext} />
        </AuthorPaginator>
      </Section>
      <TagGradient />
    </Layout>
  );
};

export default TagPage;

const TagGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${(p) => p.theme.colors.gradient};
  transition: ${(p) => p.theme.colorModeTransition};
`;

const AuthorPaginator = styled.div`
  text-align: center;
`;
