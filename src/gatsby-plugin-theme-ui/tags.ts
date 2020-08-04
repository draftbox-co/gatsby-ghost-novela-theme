export default {
  pre: {
    variant: `prism`,
    fontFamily: `var(--monospace-font), monospace`,
    tabSize: 4,
    hyphens: `none`,
    color: `white`,
    bg: `prism.background`,
    overflow: `auto`,
    borderRadius: 10,
    p: 3,
  },
  code: {
    fontFamily: `var(--monospace-font), monospace`,
    fontSize: `inherit`,
  },
  inlineCode: {
    borderRadius: `0.3em`,
    color: `secondary`,
    bg: `rgba(233, 218, 172, 0.3)`,
    paddingTop: `0.15em`,
    paddingBottom: `0.05em`,
    paddingX: `0.2em`,
  },
};
