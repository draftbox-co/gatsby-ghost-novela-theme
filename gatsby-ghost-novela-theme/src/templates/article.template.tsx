import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Progress from "@components/Progress";
import Section from "@components/Section";
import Subscription from "@components/Subscription";

import mediaqueries from "@styles/media";
import { debounce } from "@utils";

import ArticleAside from "../sections/article/Article.Aside";
import ArticleHero from "../sections/article/Article.Hero";
import ArticleControls from "../sections/article/Article.Controls";
import ArticlesNext from "../sections/article/Article.Next";
import ArticleSEO from "../sections/article/Article.SEO";
import ArticleShare from "../sections/article/Article.Share";

import { Template } from "@types";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
          }
        }
      }
    }
  }
`;

const Article: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;

  const { article, authors, mailchimp, next } = pageContext;

  console.log(article, "ye hai article");

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
      {/* <ArticleSEO article={article} authors={authors} location={location} /> */}
      <ArticleHero article={article} authors={authors} />
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight} />
      </ArticleAside>
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      {/* <div dangerouslySetInnerHTML={{__html: article.body}}></div> */}
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={"function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n/* @jsx mdx */\nvar _frontmatter = {\n  \"title\": \"My first post using Novela by Narative\",\n  \"author\": \"Dennis Brotzky\",\n  \"date\": \"2019-04-30T00:00:00.000Z\",\n  \"hero\": \"./images/hero.jpg\",\n  \"excerpt\": \"With the growing community interest in Gatsby, we hope to create more resources that make it easier for anyone to grasp the power of this incredible tool.\"\n};\n\nvar makeShortcode = function makeShortcode(name) {\n  return function MDXDefaultShortcode(props) {\n    console.warn(\"Component \" + name + \" was not imported, exported, or provided by MDXProvider as global scope\");\n    return mdx(\"div\", props);\n  };\n};\n\nvar layoutProps = {\n  _frontmatter: _frontmatter\n};\nvar MDXLayout = \"wrapper\";\nreturn function MDXContent(_ref) {\n  var components = _ref.components,\n      props = _objectWithoutProperties(_ref, [\"components\"]);\n\n  return mdx(MDXLayout, _extends({}, layoutProps, props, {\n    components: components,\n    mdxType: \"MDXLayout\"\n  }), mdx(\"p\", null, \"My first post using \", mdx(\"inlineCode\", {\n    parentName: \"p\"\n  }, \"@narative/gatsby-theme-novela\"), \". Novela is built by the team at \", mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"https://narative.co\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"Narative\"), \", and built for everyone that loves the web.\"), mdx(\"h2\", {\n    \"id\": \"headers\"\n  }, \"Headers\"), mdx(\"h1\", {\n    \"id\": \"h1\"\n  }, \"H1\"), mdx(\"p\", null, \"It is recommended to NOT use H1s as it is reserved for the article heading. Any H1 is set as an H2.\"), mdx(\"h2\", {\n    \"id\": \"h2\"\n  }, \"H2\"), mdx(\"h3\", {\n    \"id\": \"h3\"\n  }, \"H3\"), mdx(\"h4\", {\n    \"id\": \"h4\"\n  }, \"H4\"), mdx(\"h5\", {\n    \"id\": \"h5\"\n  }, \"H5\"), mdx(\"h6\", {\n    \"id\": \"h6\"\n  }, \"H6\"), mdx(\"h2\", {\n    \"id\": \"emphasis\"\n  }, \"Emphasis\"), mdx(\"p\", null, \"Emphasis, aka italics, with \", mdx(\"em\", {\n    parentName: \"p\"\n  }, \"asterisks\"), \" or \", mdx(\"em\", {\n    parentName: \"p\"\n  }, \"underscores\"), \".\"), mdx(\"p\", null, \"Strong emphasis, aka bold, with \", mdx(\"strong\", {\n    parentName: \"p\"\n  }, \"asterisks\"), \" or \", mdx(\"strong\", {\n    parentName: \"p\"\n  }, \"underscores\"), \".\"), mdx(\"p\", null, \"Combined emphasis with \", mdx(\"strong\", {\n    parentName: \"p\"\n  }, \"asterisks and \", mdx(\"em\", {\n    parentName: \"strong\"\n  }, \"underscores\")), \".\"), mdx(\"p\", null, \"Strikethrough uses two tildes. \", mdx(\"del\", {\n    parentName: \"p\"\n  }, \"Scratch this.\")), mdx(\"h2\", {\n    \"id\": \"lists\"\n  }, \"Lists\"), mdx(\"ol\", null, mdx(\"li\", {\n    parentName: \"ol\"\n  }, \"First ordered list item\"), mdx(\"li\", {\n    parentName: \"ol\"\n  }, \"Another item\"), mdx(\"li\", {\n    parentName: \"ol\"\n  }, \"Actual numbers don\\u2019t matter, just that it\\u2019s a number\")), mdx(\"ul\", null, mdx(\"li\", {\n    parentName: \"ul\"\n  }, \"Unordered list can use asterisks\")), mdx(\"ul\", null, mdx(\"li\", {\n    parentName: \"ul\"\n  }, \"Or minuses\")), mdx(\"ul\", null, mdx(\"li\", {\n    parentName: \"ul\"\n  }, \"Or pluses\")), mdx(\"h2\", {\n    \"id\": \"links\"\n  }, \"Links\"), mdx(\"p\", null, mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"https://www.google.com\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"I\\u2019m an inline-style link\")), mdx(\"p\", null, mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"https://www.google.com\",\n    \"title\": \"Google's Homepage\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"I\\u2019m an inline-style link with title\")), mdx(\"p\", null, mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"https://www.mozilla.org\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"I\\u2019m a reference-style link\")), mdx(\"p\", null, mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"../blob/master/LICENSE\"\n  }), \"I\\u2019m a relative reference to a repository file\")), mdx(\"p\", null, mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"http://slashdot.org\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"You can use numbers for reference-style link definitions\")), mdx(\"p\", null, \"Or leave it empty and use the \", mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"http://www.reddit.com\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"link text itself\"), \".\"), mdx(\"p\", null, \"URLs and URLs in angle brackets will automatically get turned into links.\\n\", mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"http://www.example.com\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"http://www.example.com\"), \" or \", mdx(\"a\", _extends({\n    parentName: \"p\"\n  }, {\n    \"href\": \"http://www.example.com\",\n    \"target\": \"_blank\",\n    \"rel\": \"noreferrer\"\n  }), \"http://www.example.com\"), \" and sometimes\\nexample.com (but not on Github, for example).\"), mdx(\"p\", null, \"Some text to show that the reference links can follow later.\"), mdx(\"h2\", {\n    \"id\": \"images\"\n  }, \"Images\"), mdx(\"div\", {\n    \"className\": \"Image__Small\"\n  }, \"\\n  \", mdx(\"span\", _extends({\n    parentName: \"div\"\n  }, {\n    \"className\": \"gatsby-resp-image-wrapper\",\n    \"style\": {\n      \"position\": \"relative\",\n      \"display\": \"block\",\n      \"marginLeft\": \"auto\",\n      \"marginRight\": \"auto\",\n      \"maxWidth\": \"1360px\"\n    }\n  }), \"\\n      \", mdx(\"span\", _extends({\n    parentName: \"span\"\n  }, {\n    \"className\": \"gatsby-resp-image-background-image\",\n    \"style\": {\n      \"paddingBottom\": \"100%\",\n      \"position\": \"relative\",\n      \"bottom\": \"0\",\n      \"left\": \"0\",\n      \"backgroundImage\": \"url('data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAIDAQQF/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQIAA//aAAwDAQACEAMQAAAB60c0vKSAvWoCrhj/xAAcEAADAAEFAAAAAAAAAAAAAAAAAQIDEBESIkH/2gAIAQEAAQUC0Z7zNshVOst9aUI//8QAGREAAQUAAAAAAAAAAAAAAAAAAQACEBES/9oACAEDAQE/AQ21kT//xAAXEQADAQAAAAAAAAAAAAAAAAAAAREQ/9oACAECAQE/AaV7/8QAIBAAAQMCBwAAAAAAAAAAAAAAAAECITFhAxARE0FR4f/aAAgBAQAGPwLLw05ESq9ITiNZY26NsNVsQTJ//8QAHxABAAIBAwUAAAAAAAAAAAAAAQARITFBcVFhgbHw/9oACAEBAAE/IWLNWG+Eyyi1bEBWRvpnoDtFtqPJ5iXFq6dyV3J9Vn//2gAMAwEAAgADAAAAEI/3ff/EABgRAAIDAAAAAAAAAAAAAAAAAAABECFh/9oACAEDAQE/EGWZmKP/xAAXEQADAQAAAAAAAAAAAAAAAAABEBEx/9oACAECAQE/EDGIK//EAB4QAQACAQUBAQAAAAAAAAAAAAEAETEhQVFxkWHB/9oACAEBAAE/EFCC13D2aKjTNB6aRBp2Ctrl4NMse3jzf6/MRs6TAJYLcsVUjk6uIiJr1dj2xqXDdq8HFT//2Q==')\",\n      \"backgroundSize\": \"cover\",\n      \"display\": \"block\"\n    }\n  })), \"\\n  \", mdx(\"picture\", {\n    parentName: \"span\"\n  }, \"\\n        \", mdx(\"source\", _extends({\n    parentName: \"picture\"\n  }, {\n    \"srcSet\": [\"/static/891a8f706331d47474c3f2fd9906d926/2035a/article-image-2.webp 1360w\"],\n    \"sizes\": \"(max-width: 1360px) 100vw, 1360px\",\n    \"type\": \"image/webp\"\n  })), \"\\n        \", mdx(\"source\", _extends({\n    parentName: \"picture\"\n  }, {\n    \"srcSet\": [\"/static/891a8f706331d47474c3f2fd9906d926/68efc/article-image-2.jpg 1360w\"],\n    \"sizes\": \"(max-width: 1360px) 100vw, 1360px\",\n    \"type\": \"image/jpeg\"\n  })), \"\\n        \", mdx(\"img\", _extends({\n    parentName: \"picture\"\n  }, {\n    \"className\": \"gatsby-resp-image-image\",\n    \"src\": \"/static/891a8f706331d47474c3f2fd9906d926/68efc/article-image-2.jpg\",\n    \"alt\": \"Alt text\",\n    \"title\": \"Logo Title Text 1\",\n    \"loading\": \"lazy\",\n    \"style\": {\n      \"width\": \"100%\",\n      \"height\": \"100%\",\n      \"margin\": \"0\",\n      \"verticalAlign\": \"middle\",\n      \"position\": \"absolute\",\n      \"top\": \"0\",\n      \"left\": \"0\"\n    }\n  })), \"\\n      \"), \"\\n    \")), mdx(\"p\", null, \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.\"), mdx(\"h2\", {\n    \"id\": \"code-and-syntax-highlighting\"\n  }, \"Code and Syntax Highlighting\"), mdx(\"pre\", null, mdx(\"code\", _extends({\n    parentName: \"pre\"\n  }, {\n    \"className\": \"language-javascript\"\n  }), \"var s = \\\"JavaScript syntax highlighting\\\";\\nalert(s);\\n\")), mdx(\"pre\", null, mdx(\"code\", _extends({\n    parentName: \"pre\"\n  }, {}), \"No language indicated, so no syntax highlighting.\\nBut let's throw in a <b>tag</b>.\\n\")), mdx(\"h3\", {\n    \"id\": \"jsx\"\n  }, \"JSX\"), mdx(\"pre\", null, mdx(\"code\", _extends({\n    parentName: \"pre\"\n  }, {\n    \"className\": \"language-jsx\"\n  }), \"import React from \\\"react\\\";\\nimport { ThemeProvider } from \\\"theme-ui\\\";\\nimport theme from \\\"./theme\\\";\\n\\nexport default props => (\\n  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>\\n);\\n\")), mdx(\"h2\", {\n    \"id\": \"blockquotes\"\n  }, \"Blockquotes\"), mdx(\"p\", null, \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.\"), mdx(\"blockquote\", null, mdx(\"p\", {\n    parentName: \"blockquote\"\n  }, \"Blockquotes are very handy in email to emulate reply text.\\nThis line is part of the same quote.\")), mdx(\"p\", null, \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\"), mdx(\"h2\", {\n    \"id\": \"horizontal-rule\"\n  }, \"Horizontal Rule\"), mdx(\"p\", null, \"Horizontal Rule\"), mdx(\"p\", null, \"Three or more\\u2026\"), mdx(\"hr\", null), mdx(\"p\", null, \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\"), mdx(\"hr\", null), mdx(\"p\", null, \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\"));\n}\n;\nMDXContent.isMDXComponent = true;"}>
          <ArticleShare />
        </MDXRenderer>
      </ArticleBody>
      {/* {mailchimp && article.subscription && <Subscription />}
      {next.length > 0 && (
        <NextArticle narrow>
          <FooterNext>More articles from {name}</FooterNext>
          <ArticlesNext articles={next} />
          <FooterSpacer />
        </NextArticle>
      )} */}
    </Layout>
  );
};

export default Article;

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
  padding: 160px 0 35px;
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
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
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
