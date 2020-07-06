import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";

import { Icon } from "@types";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";
import { useColorMode } from "theme-ui";

const Logo: Icon = ({ fill = "white" }) => {
  const [colorMode] = useColorMode();

  const {
    site: {
      siteMetadata: { logoUrl, alternateLogoUrl, siteTitle, siteUrl },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          siteTitle
          logoUrl
          alternateLogoUrl
        }
      }
    }
  `);

  return (
    <LogoContainer>
      {logoUrl || alternateLogoUrl ? (
        <img
          className="logo"
          src={
            colorMode === "dark"
              ? url.resolve(siteUrl, alternateLogoUrl)
              : url.resolve(siteUrl, logoUrl)
          }
          alt=""
        />
      ) : (
        <LogoAlt>{siteTitle}</LogoAlt>
      )}
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  .logo {
    height: 32px;
  }

  .Logo__Mobile {
    display: none;
  }

  ${mediaqueries.tablet`
    .Logo__Desktop {
      display: none;
    }
    
    .Logo__Mobile{
      display: block;
    }
  `}
`;

const LogoAlt = styled.h1`
  color: ${(p) => p.theme.colors.primary};
  font-weight: bold;
  font-size: 22px;
`;
