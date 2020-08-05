import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Video = styled.video`
  margin: 0 auto 35px;
  width: 100%;
  max-width: 680px;

  b {
    font-weight: var(--system-font-bold);
  }

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 0 auto 25px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;

export default Video;
