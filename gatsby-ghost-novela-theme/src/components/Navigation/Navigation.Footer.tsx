import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery, Link } from "gatsby";

import Section from "@components/Section";
import SocialLinks from "@components/SocialLinks";

import mediaqueries from "@styles/media";
import { result } from "lodash";

const siteQuery = graphql`
  {
    ghostSettings {
      facebook
      twitter
    }
  }
`;

const Footer: React.FC<{}> = () => {
  const results = useStaticQuery(siteQuery);

  const social = [];

  if (results.ghostSettings.facebook) {
    social.push({
      name: "facebook",
      url: `https://facebook.com/${results.ghostSettings.facebook}`,
    });
  }

  if (results.ghostSettings.twitter) {
    social.push({
      name: "twitter",
      url: `https://twitter.com/${results.ghostSettings.twitter}`,
    });
  }

  // const copyrightDate = (() => {
  //   const { edges } = results.allMdx;
  //   const years = [0, edges.length - 1].map((edge) =>
  //     new Date(edges[edge].node.frontmatter.date).getFullYear()
  //   );
  //   return years[0] === years[1] ? `${years[0]}` : `${years[0]}–${years[1]}`;
  // })();

  return (
    <>
      <FooterGradient />
      <Section narrow>
        <HoritzontalRule />
        <FooterContainer>
          <FooterText>
            {/* © {copyrightDate} {name} */}
            Built with Draftbox © {new Date().getFullYear()}
          </FooterText>
          <FooterLinksContainer>
            <FooterLink as={Link} to="/">
              Home
            </FooterLink>
            <FooterLink as={Link} to="/sitemap.xml">
              Sitemap
            </FooterLink>
            <FooterLink as={Link} to="/rss">
              RSS
            </FooterLink>
            <FooterLink as={Link} to="/contact">
              Contact Us
            </FooterLink>
          </FooterLinksContainer>
          <SocialLinksContainer>
            <SocialLinks links={social} />
          </SocialLinksContainer>
        </FooterContainer>
        <CreditsContainer>
          <FooterLink href="https://draftbox.co" target="_blank">
            PUBLISHED WITH DRAFTBOX
          </FooterLink>
        </CreditsContainer>
      </Section>
    </>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding-bottom: 80px;
  color: ${(p) => p.theme.colors.grey};

  ${mediaqueries.tablet`
  flex-direction: column;
  // padding-bottom: 100px;
  `}

  ${mediaqueries.phablet`
  // padding-bottom: 50px;
  `}
`;

const HoritzontalRule = styled.div`
  position: relative;
  margin: 140px auto 50px;
  border-bottom: 1px solid ${(p) => p.theme.colors.horizontalRule};

  ${mediaqueries.tablet`
    margin: 60px auto;
  `}

  ${mediaqueries.phablet`
    display: none;
  `}
`;

const FooterText = styled.div`
    width: 33%;

    ${mediaqueries.phablet`
      width: 100%;
      text-align: center;
    `}


  // ${mediaqueries.tablet`
  //   margin-bottom: 80px;
  // `}

  // ${mediaqueries.phablet`
  //   margin: 120px auto 100px;
  // `}
`;

const FooterGradient = styled.div`
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

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 33%;

  ${mediaqueries.phablet`
    width: 100%;
    justify-content: center;
  `}
`;

const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;

  ${mediaqueries.phablet`
  width: 100%;
`}

  ${mediaqueries.tablet`
  margin: 40px auto;
`}
`;

const FooterLink = styled.a`
  color: ${(p) => p.theme.colors.grey};
  margin-right: 20px;

  :last-child {
    margin-right: 0;
  }

  :hover {
    text-decoration: underline;
  }
`;

const CreditsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;
