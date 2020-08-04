import React, { useState } from "react";
import Layout from "@components/Layout";
import Section from "@components/Section";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";
import Headings from "@components/Headings";
import { useForm } from "../hooks/useForm";
import { useStaticQuery, graphql } from "gatsby";

const Contact = () => {
  const {
    site: {
      siteMetadata: { contactWidget },
    },
    ghostSettings: { title },
  } = useStaticQuery(graphql`
    query {
      ghostSettings {
        title
      }

      site {
        siteMetadata {
          contactWidget {
            title
            successMessage
          }
        }
      }
    }
  `);

  const [{ handleSubmit: submitForm, submitting, succeeded }] = useForm(
    "contact"
  );
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formValues);
  };

  const handleChange = (target, value) => {
    switch (target) {
      case "name":
        setFormValues({ ...formValues, name: value });
        break;
      case "email":
        setFormValues({ ...formValues, email: value });
        break;
      case "message":
        setFormValues({ ...formValues, message: value });
        break;
      default:
        break;
    }
  };

  return (
    <ContactFormSection narrow>
      <Content>
        <ContactContainer>
          <Heading>
            <span
              dangerouslySetInnerHTML={{
                __html: contactWidget.title
                  ? contactWidget.title
                  : `Contact ` + title,
              }}
            ></span>
          </Heading>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Label htmlFor="name">Your Name</Label>
            <Input
              name="name"
              type="text"
              id="name"
              placeholder="Your name (optional)"
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
            <Label htmlFor="email">Your Name</Label>
            <Input
              name="email"
              type="email"
              id="email"
              required
              placeholder="Your email address"
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
            <Label htmlFor="message">Your Name</Label>
            <Textarea
              required
              name="message"
              placeholder="Your message"
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              id="message"
            />
            <Button
              type="submit"
              hasError={error}
              subscribed={succeeded}
              disabled={succeeded}
            >
              {succeeded ? (
                <CheckMarkIcon />
              ) : submitting ? (
                "Sending..."
              ) : (
                "Send"
              )}
            </Button>
            {succeeded && (
              <SuccessText>
                {contactWidget.successMessage
                  ? contactWidget.successMessage
                  : `We'll get in touch with you soon.`}
              </SuccessText>
            )}
          </Form>
        </ContactContainer>
      </Content>
    </ContactFormSection>
  );
};

const ContactFormSection = styled(Section)`
  margin-top: 6rem;
`;

const ContactContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 55px;
  margin: 40px auto 100px;
  background: ${(p) => p.theme.colors.card};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  z-index: 1;

  ${mediaqueries.tablet`
    padding: 50px 0 0;
    text-align: center;
  `}

  ${mediaqueries.phablet`
    margin: -20px auto 80px;
  `}
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;

  ${mediaqueries.tablet`
    h3 {
      padding: 0 50px;
    }
  `}

  ${mediaqueries.phone`
    h3 {
      padding: 0 24px;
    }
  `}
`;

const Heading = styled(Headings.h3)`
  margin-bottom: 30px;

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
`;

const Text = styled.p`
  margin: 0 auto 30px;
  color: ${(p) => p.theme.colors.grey};
  line-height: 1.75;

  ${mediaqueries.tablet`
    padding: 0 26px;
    margin: 0 auto 25px;
  `}
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  position: fixed;
  opacity: 0;
  height: 1px;
`;

const Input = styled.input`
  position: relative;
  background: ${(p) => p.theme.colors.inputBackground};
  border-radius: 35px;
  border: none;
  padding: 13px 21px 13px 35px;
  width: 471px;
  color: ${(p) => p.theme.colors.primary};
  margin-bottom: 30px;

  ::placeholder {
    color: ${(p) => p.theme.colors.track};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${(p) => p.theme.colors.track};
  }

  ::-ms-input-placeholder {
    color: ${(p) => p.theme.colors.track};
  }

  ${mediaqueries.tablet`
    width: calc(100% - 36px);
    margin: 0 18px;
    padding: 14px 14px 14px 30px;
    margin-bottom: 30px;
  `}
`;

const Textarea = styled.textarea`
  position: relative;
  background: ${(p) => p.theme.colors.inputBackground};
  border-radius: 35px;
  border: none;
  padding: 13px 21px 13px 35px;
  width: 471px;
  color: ${(p) => p.theme.colors.primary};
  margin-bottom: 30px;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: ${(p) => p.theme.colors.track};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${(p) => p.theme.colors.track};
  }

  ::-ms-input-placeholder {
    color: ${(p) => p.theme.colors.track};
  }

  ${mediaqueries.tablet`
  width: calc(100% - 36px);
  margin: 0 18px;
  padding: 14px 14px 14px 30px;
  margin-bottom: 30px;
`}
`;

const Button = styled.button<{ hasError: string; subscribed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 161px;
  height: 38px;
  border: 1px solid
    ${(p) => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  color: ${(p) => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  background: ${(p) => (p.subscribed ? p.theme.colors.accent : "transparent")};
  font-weight: var(--system-font-semibold);
  border-radius: 35px;
  letter-spacing: 0.42px;
  transition: border-color 0.2s var(--ease-in-out-quad),
    background 0.2s var(--ease-in-out-quad), color 0.2s var(--ease-in-out-quad);

  &:hover {
    background: ${(p) =>
      p.hasError ? p.theme.colors.error : p.theme.colors.accent};
    color: ${(p) => p.theme.colors.background};
  }

  &[disabled] {
    cursor: not-allowed;
  }

  svg * {
    fill: ${(p) => p.theme.colors.background};
  }

  ${(p) => mediaqueries.tablet`
    position: relative;
    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0;
    border-top: 1px solid ${p.theme.colors.horizontalRule};

    &:hover {
      color: initial;
      background: initial;
    }
  `}
`;

const Error = styled.div`
  position: absolute;
  left: 35px;
  bottom: -20px;
  color: ${(p) => p.theme.colors.error};
  font-size: 12px;

  a {
    color: ${(p) => p.theme.colors.error};
    text-decoration: underline;
  }

  ${mediaqueries.tablet`
    left: 50px;
    top: 50px;
  `}
`;

const CheckMarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z"
      fill="#08080B"
    />
  </svg>
);

const SuccessText = styled.div`
  color: ${(p) => p.theme.colors.success};
  font-size: 16px;
  margin: 20px 0;
`;

export default Contact;
