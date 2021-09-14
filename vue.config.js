module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://rest.apizza.net/mock/6ae552c8d0a4f77d7c940cf51e77fd77",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
