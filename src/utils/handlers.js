var toHtml = require("hast-util-to-html");
const link = require("hast-util-to-mdast/lib/handlers/link");
var visit = require("unist-util-visit");
const fs = require("fs");

function iframe(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function figcaption(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function video(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function audio(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}


function figure(h, node) {
  if (
    node.properties &&
    node.properties.className &&
    node.properties.className.includes("kg-bookmark-card")
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
      value: `<BookmarkCard title="${boomarkCardData.title}" description="${boomarkCardData.description}" author="${boomarkCardData.author}" publisher="${boomarkCardData.publisher}" thumbnail="${boomarkCardData.thumbnail}" url="${boomarkCardData.url}" ></BookmarkCard>`,
    };
  } else {
    visit(node, function(node) {
      if (node.tagName && node.tagName === "svg") {
        delete node.properties["xmlnsXLink"];
      }
    });
    return h(
      node,
      "html",
      toHtml(node, {
        space: "html",
        closeSelfClosing: true,
        allowDangerousHtml: true,
      })
    );
  }
}

module.exports = { iframe, figcaption, video, audio, figure };
