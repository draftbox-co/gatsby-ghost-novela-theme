module.exports = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;

  const typeDefs = `
    type PluginOptions {
      basePath: String
      rootPath: String
    }
    type SitePlugin implements Node {
      pluginOptions: PluginOptions
    }
  `;

  createTypes(typeDefs);
  
  createFieldExtension({
    name: 'readingTime',
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          if (source.primary_author) {
            return source.primary_author.name;
          } else {
            return '';
          }
        },
      };
    },
  });

  createTypes(`
    type GhostPost implements Node {
      author: String @readingTime
    }
  `);

  createTypes(`
    type GhostPage implements Node {
      author: String @readingTime
    }
  `);
};
