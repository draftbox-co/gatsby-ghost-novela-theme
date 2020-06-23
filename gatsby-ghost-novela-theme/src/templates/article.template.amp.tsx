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
  return (
    <>
      <MetaData
        data={data}
        location={location}
        amp={pageContext.amp}
        type="article"
      />
      <header className="main-header">
        <nav className="blog-title">
          <Link
            to="/"
            dangerouslySetInnerHTML={{ __html: data.ghostPost.title }}
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
              <div className="post-meta-avatars">
                <p className="author">{data.ghostPost.primary_author.name}</p>
              </div>
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
          <div className="tags">
            <span>Tag:</span>
            <a className="tag" href={`/${data.ghostPost.primary_tag.slug}`}>
              {data.ghostPost.primary_tag.name}
            </a>
          </div>

          <div className="comment-button-container">
            <button>
              <a href="/">Leave a comment</a>
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
        extension
        publicURL
      }
    }
  }
`;