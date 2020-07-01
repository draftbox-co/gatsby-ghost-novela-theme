const htmlToMdx = require("@draftbox-co/html-to-compiled-mdx");
const readingTime = require("reading-time");
const handlers = require("../../utils/handlers");

module.exports = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions;
  createFieldExtension({
    name: "readingTime",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          if (source.html) {
            const readingTimeValue = readingTime(source.html);
            return readingTimeValue.text;
          } else {
            return "1 min read";
          }
        },
      };
    },
  });

  createFieldExtension({
    name: "mdx",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          if (source.html) {
            const mdx = htmlToMdx(source.html, handlers);
            return mdx;
          } else {
            return htmlToMdx(`<div></div>`, handlers);
          }
        },
      };
    },
  });

  createTypes(`
    type GhostPost implements Node {
      readingTime: String @readingTime
      mdx: String @mdx
    }
  `);

  createTypes(`
    type GhostPage implements Node {
      readingTime: String @readingTime
      mdx: String @mdx
    }
  `);
};
