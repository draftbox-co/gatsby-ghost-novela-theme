import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import Headings from "@components/Headings";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #898989;
  font-size: 32px;
  font-weight: var(--system-font-semibold);

  ${mediaqueries.phablet`
    font-size: 28px;
  `}
`;

const PlaceholderText = styled(Headings.h1)`
`

const ImagePlaceholderAlt: React.FC<{ firstLetter: string }> = ({
  firstLetter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  return (
    <Container>
      <PlaceholderText>{firstLetter}</PlaceholderText>
    </Container>
  );
};

export default ImagePlaceholderAlt;
