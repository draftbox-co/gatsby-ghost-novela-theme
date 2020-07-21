import React from "react";
import { graphql, Link } from "gatsby";
import { MetaData } from "@components/meta";

type PostTemplateProps = {
  data: { ghostPost: any };
  location: any;
  pageContext: {
    title: string;
    amp: boolean;
  };
};

const PostTemplate: React.FC<PostTemplateProps> = ({
  data,
  location,
  pageContext,
}) => {
  // Article meta component looks for seo image in Post.hero.seo.src so we are normalizing data before passing it to Article Meta

  // Todo : Pass article as a  context from createPages

  const article = {
    ghostPost: {
      ...data.ghostPost,
      hero: {
        seo: { src: data.ghostPost?.localFeatureImage?.seo?.fixed?.src },
      },
    },
  };

  return (
    <>
      <MetaData
        data={article}
        location={location}
        amp={pageContext.amp}
        type="article"
      />
      <header className="main-header">
        <nav className="blog-title">
          <Link
            to="/"
            dangerouslySetInnerHTML={{ __html: pageContext.title }}
          ></Link>
        </nav>
      </header>
      <main className="content" role="main">
        <article className="post tag-getting-started">
          <header className="post-header">
            <h1
              className="post-title"
              dangerouslySetInnerHTML={{ __html: data.ghostPost.title }}
            ></h1>
            <div className="post-meta">
              {data.ghostPost.primary_author && (
                <div className="post-meta-avatars">
                  <p className="author">{data.ghostPost.primary_author.name}</p>
                </div>
              )}
              <time
                className="post-date"
                dateTime="{{date format='DD-MM-YYYY'}}"
              >
                {data.ghostPost.updated_at}
              </time>{" "}
            </div>
          </header>
          {data.ghostPost.localFeatureImage &&
            data.ghostPost.localFeatureImage.childImageSharp && (
              <figure className="post-image">
                <img
                  srcSet={
                    data.ghostPost.localFeatureImage.childImageSharp.fluid
                      .srcSet
                  }
                  alt={data.ghostPost.title}
                />
              </figure>
            )}
          {data.ghostPost.localFeatureImage &&
            data.ghostPost.localFeatureImage.extension === "svg" && (
              <figure className="post-image">
                <img
                  src={data.ghostPost.localFeatureImage.publicURL}
                  alt={data.ghostPost.title}
                />
              </figure>
            )}
          {data.ghostPost.html && data.ghostPost.html && (
            <section
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: data.ghostPost.html,
              }}
            ></section>
          )}
          {data.ghostPost?.primary_tag && (
            <div className="tags">
              <span>Tag:</span>
              <a
                className="tag"
                href={`/tag/p${data.ghostPost.primary_tag.slug}`}
              >
                {data.ghostPost.primary_tag.name}
              </a>
            </div>
          )}

          <div className="comment-button-container">
            <button>
              <a href={`/${data.ghostPost.slug}`}>View original article</a>
            </button>
          </div>
        </article>
      </main>
    </>
  );
};
export default PostTemplate;
export const pageQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      title
      html
      slug
      og_title
      og_description
      feature_image
      twitter_title
      twitter_description
      meta_title
      meta_description
      excerpt
      primary_tag {
        name
        slug
      }
      primary_author {
        name
        profile_image
        slug
      }
      updated_at(formatString: "MMMM DD YYYY")
      published_at(formatString: "MMMM DD YYYY")
      feature_image
      localFeatureImage {
        childImageSharp {
          fluid {
            srcSet
            src
          }
        }
        seo: childImageSharp {
          fixed(width: 1200, quality: 100) {
            src
          }
        }
        extension
        publicURL
      }
    }
  }
`;
