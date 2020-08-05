import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Progress from "@components/Progress";
import Section from "@components/Section";
import Subscription from "@components/Subscription";

import mediaqueries from "@styles/media";
import { debounce } from "@utils";

import ArticleAside from "../sections/article/Article.Aside";
import ArticleControls from "../sections/article/Article.Controls";
import ArticleShare from "../sections/article/Article.Share";

import { Template } from "@types";
import { MetaData } from "@components/meta";

import Icons from "@icons";
import CopyLink from "@components/Misc/CopyLink";
import ArticleHero from "../sections/article/Article.Hero";

const icons = {
  linkedin: Icons.LinkedIn,
  twitter: Icons.Twitter,
  facebook: Icons.Facebook,
  mailto: Icons.Mailto,
};

const LinkedInIcon = Icons.LinkedIn;
const FacebookIcon = Icons.Facebook;
const TwitterIcon = Icons.Twitter;
const MailToIcon = Icons.Mailto;
const CopyIcon = Icons.Copy;
const PinterestIcon = Icons.Pinterest;
const WhatsappIcon = Icons.Whatsapp;

const Page: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const { article } = pageContext;

  const [href, sethref] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      sethref(window.location.href);
      setOrigin(window.location.origin);
    }
  }, []);

  const twitterShareUrl = `https://twitter.com/share?text=${article.title}&url=${href}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${href}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${href}&title=${article.title}`;

  const mailShareUrl = `mailto:?subject=${article.title}&body=${href}`;

  let pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${href}&description=${article.title}`;

  if (article.localFeatureImage && article.localFeatureImage.publicURL) {
    pinterestShareUrl += `&media=${origin +
      article.localFeatureImage.publicURL}`;
  }

  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(
    article.title + "\n" + href
  )}`;

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll("img");

        $imgs.forEach(($img) => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
    }, 20);

    calculateBodySize();
    window.addEventListener("resize", calculateBodySize);

    return () => window.removeEventListener("resize", calculateBodySize);
  }, []);

  return (
    <Layout>
      <MetaData data={{ ghostPage: article }} location={location} />
      <ArticleHero article={article} authors={article.authors} />
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight} />
      </ArticleAside>
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      {/* <div dangerouslySetInnerHTML={{__html: article.body}}></div> */}
      <ArticleBody
        className={Object.keys(article.hero.full).length === 0 ? "no-hero" : ""}
        ref={contentSectionRef}
      >
        <MDXRenderer content={article.body}>
          <ArticleShare />
        </MDXRenderer>
        <SocialShareContainer>
          <ShareLabel>Share:</ShareLabel>
          <ShareButtonsContainer>
            <ShareButton
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Share"
            >
              <FacebookIcon fill="#73737D" />
            </ShareButton>
            <ShareButton
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Share"
            >
              <TwitterIcon fill="#73737D" />
            </ShareButton>
            <ShareButton
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin Share"
            >
              <LinkedInIcon fill="#73737D" />
            </ShareButton>
            <ShareButton
              href={pinterestShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest Share"
            >
              <PinterestIcon fill="#73737D" />
            </ShareButton>
            <ShareButton
              href={whatsAppShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest Share"
            >
              <WhatsappIcon fill="#73737D" />
            </ShareButton>
            <ShareButton
              href={mailShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mail Share"
            >
              <MailToIcon fill="#73737D" />
            </ShareButton>
            <ShareButton>
              <CopyLink textToCopy={href} fill="#73737D" />
            </ShareButton>
          </ShareButtonsContainer>
        </SocialShareContainer>
      </ArticleBody>
      <Subscription />
    </Layout>
  );
};

export default Page;

const MobileControls = styled.div`
  position: relative;
  padding-top: 60px;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`;

const ArticleBody = styled.article`
  position: relative;
  padding: 100px 0 35px;
  padding-left: 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}
  
  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}

  &.no-hero {
    padding-top: 0;
  }
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: var(--system-font-normal);
  color: ${(p) => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${(p) => p.theme.colors.grey};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`;

const SocialShareContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 680px;
  margin: 0 auto 40px;
  ${mediaqueries.desktop`
    max-width: 507px;
  `}
  ${mediaqueries.tablet`
    max-width: 486px;
  `};
  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;

const ShareLabel = styled.div`
  color: ${(p) => p.theme.colors.grey};
`;

const ShareButtonsContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const ShareButton = styled.a`
  margin-right: 20px;
  svg {
    width: 18px;
    height: 30px;
  }
`;
