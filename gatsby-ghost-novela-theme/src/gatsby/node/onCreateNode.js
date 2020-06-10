/* eslint-disable no-prototype-builtins */
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// Create fields for post slugs and source
// This will change with schema customization with work
module.exports = async (
  { node, actions, getNode, createNodeId, store, cache },
  themeOptions
) => {
  // Check that we are modifying right node types.
  const nodeTypes = [`GhostPost`, `GhostPage`];
  if (!nodeTypes.includes(node.internal.type)) {
    return;
  }

  const { createNode } = actions;

  // Download image and create a File node with gatsby-transformer-sharp.
  if (node.feature_image) {
    const fileNode = await createRemoteFileNode({
      url: node.feature_image,
      store,
      cache,
      createNode,
      parentNodeId: node.id,
      createNodeId,
    });

    if (fileNode) {
      // Link File node to GhostPost node at field image.
      node.localFeatureImage___NODE = fileNode.id;
    }
  }
};
