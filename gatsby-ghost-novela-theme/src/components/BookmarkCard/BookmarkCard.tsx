import React from "react";
import styled from "@emotion/styled";
import Heading from "@components/Headings";
import Paragraph from "@components/Paragraph";
import mediaqueries from "@styles/media";
import Image from "@components/Image";

const BookmarkCard = (props) => {
  return (
    <BookmarkContainer
      href={props.url}
      target="_blank"
      rel="norefferer noopener"
    >
      <BookmarkContent>
        <Heading.h3>{props.title}</Heading.h3>
        <BookmarkDescription>{props.description}</BookmarkDescription>
        <BookmarkMeta>
          {props.author !== "undefined" && (
            <BookmarkAuthor>{props.author}&nbsp; &mdash;</BookmarkAuthor>
          )}
          {props.publisher !== "undefined" && (
            <BookmarkPublisher>{props.publisher}</BookmarkPublisher>
          )}
        </BookmarkMeta>
      </BookmarkContent>
      <BookmarkThumbnail>
        <ThumbnailImage src={props.thumbnail} />
      </BookmarkThumbnail>
    </BookmarkContainer>
  );
};

const BookmarkContainer = styled.a`
  display: flex !important;
  min-height: 148px;
  background: ${(p) => p.theme.colors.card};
  text-decoration: none;
  border-radius: 3px;
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.2),
    0 9px 18px -9px rgba(0, 0, 0, 0.22);
  border-bottom: none;
  max-width: 744px;
  margin: auto;
  margin-bottom: 35px;

  ${mediaqueries.desktop`
    max-width: 608px;
  `}

  ${mediaqueries.tablet`
    padding: 0;
    max-width: 100%;
    flex-direction: column;
    margin-left: 2rem;
    margin-right: 2rem;
  `};
`;

const BookmarkContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 20px 20px 20px;
  ${mediaqueries.tablet`
    order: 1;
    padding: 0;
  `};
`;

const BookmarkDescription = styled(Paragraph)`
  display: -webkit-box;
  overflow-y: hidden;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.5em;
  font-weight: var(--system-font-normal);
  color: ${(p) => p.theme.colors.grey};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const BookmarkMeta = styled(Paragraph)`
  display: flex;
  margin-bottom: 0;
  align-items: center;
`;

const BookmarkAuthor = styled.span`
  color: ${(p) => p.theme.colors.grey};
  margin-bottom: 0 !important;
  margin-top: 12px !important;
  font-size: 16px;
  margin-right: 4px;
  position: relative;
  max-width: 40%;
`;

const BookmarkPublisher = styled.span`
  color: ${(p) => p.theme.colors.grey};
  margin-bottom: 0 !important;
  margin-top: 12px !important;
  font-size: 16px;
  overflow: hidden;
  max-width: 215px;
  line-height: 1.5em;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BookmarkThumbnail = styled.div`
  position: relative;
  min-width: 33%;
  width: 33%;
  max-height: 100%;

  ${mediaqueries.tablet`
    order: 0;
    width: 100%;
  `};
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
  margin-bottom: 0 !important;
  border-radius: 0 3px 3px 0 !important;
  margin-top: 0 !important;
  object-fit: cover;

  ${mediaqueries.tablet`
    order: 0;
    width: 100%;
    border-radius: 3px 3px 0 0 !important;
  `};
`;

export default BookmarkCard;
