module.exports = {
  plugins: [
    {
      resolve: `@draftbox-co/gatsby-ghost-novela-theme`,
      options: { basePath: "/", rootPath: "/" },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://ghost.theasdfghjkl.com`,
        contentApiKey: `3d17fad3efaa911df1ed577638`,
        version: `v3`, // Ghost API version, optional, defaults to "v3".
        // Pass in "v2" if your Ghost install is not on 3.0 yet!!!
      },
    },
  ],
};
