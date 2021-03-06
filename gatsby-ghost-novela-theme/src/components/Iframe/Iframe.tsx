import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Iframe = styled.iframe`
  margin: 0 auto 35px;
  width: 100%;
  max-width: 680px;

  b {
    font-weight: var(--system-font-bold);
  }

  ${mediaqueries.desktop`
  max-width: 680px;
`}

  ${mediaqueries.tablet`
  max-width: 486px;
  margin: 0 auto 25px;
`};

  ${mediaqueries.phablet`
  padding: 0 20px;
`};
`;

export default Iframe;
