import React from "react";
import Layout from "@components/Layout";
import styled from "@emotion/styled";
import { Link } from "gatsby";

const ErrorPage = () => {
  return (
    <Layout>
      <ErrorContainer>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorDescription>
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </ErrorDescription>
        <BacktoPage as={Link} to={"/"}>
          Back to our site →
        </BacktoPage>
      </ErrorContainer>
    </Layout>
  );
};

const ErrorContainer = styled.div`
  margin: 100px auto 100px;
  position: relative;
  z-index: 3;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 30px;
  background: ${(p) => p.theme.colors.card};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  max-width: 400px;
`;

const ErrorTitle = styled.div`
  font-size: 22px;
  font-weight: var(--system-font-bold);
  color: ${(p) => p.theme.colors.primary};
`;

const ErrorDescription = styled.p`
  color: ${(p) => p.theme.colors.grey};
  margin-top: 20px;
  text-align: left;
`;

const BacktoPage = styled.a`
  color: ${(p) => p.theme.colors.grey};
  margin-top: 20px;
  text-align: center;
`;

export default ErrorPage;
