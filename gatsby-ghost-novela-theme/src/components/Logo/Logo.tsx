import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";

import { Icon } from "@types";
import { graphql, useStaticQuery } from "gatsby";

const Logo: Icon = ({ fill = "white" }) => {
  const {
    ghostSettings: { logo },
  } = useStaticQuery(graphql`
    {
      ghostSettings {
        logo
      }
    }
  `);

  return (
    <LogoContainer>
      {logo ? (
        <img className="logo" src={logo} alt="" />
      ) : (
        <LogoAlt>Logo</LogoAlt>
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
