const htmlToMdx = require("html-to-compiled-mdx");
const readingTime = require("reading-time");

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
            const mdx = htmlToMdx(source.html);
            return mdx;
          } else {
            return "";
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
