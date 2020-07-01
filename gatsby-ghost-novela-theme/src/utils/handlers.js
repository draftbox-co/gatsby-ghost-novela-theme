var toHtml = require("hast-util-to-html");
const resolve = require("hast-util-to-mdast/lib/util/resolve");
const all = require("hast-util-to-mdast/lib/all");
var visit = require("unist-util-visit");

function iframe(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function figcaption(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function a(h, node) {
  if (
    node.properties &&
    node.properties.className &&
    node.properties.className.includes("kg-bookmark-container")
  ) {
    const boomarkCardData = {
      title: "",
      description: "",
      url: node.properties.href,
    };
    visit(node, function(node) {
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-title")
      ) {
        boomarkCardData.title = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-description")
      ) {
        boomarkCardData.description = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-author")
      ) {
        boomarkCardData.author = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-publisher")
      ) {
        boomarkCardData.publisher = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-thumbnail")
      ) {
        boomarkCardData.thumbnail = node.children[0].properties.src;
      }
    });
    return {
      type: "html",
      value: `<BookmarkCard title="${boomarkCardData.title}" description="${boomarkCardData.description}" author="${boomarkCardData.author}" publisher="${boomarkCardData.publisher}" thumbnail="${boomarkCardData.thumbnail}" url="${boomarkCardData.url}" />`,
    };
  } else {
    var props = {
      title: node.properties.title || null,
      url: resolve(h, node.properties.href),
    };
    return h(node, "link", props, all(h, node));
  }
}

module.exports = { iframe, a, figcaption };
