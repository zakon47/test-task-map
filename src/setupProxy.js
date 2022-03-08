const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://prometheus-api.zkx.fi/",
      changeOrigin: true,
      pathRewrite: { "/api": "" },
    })
  );
};
