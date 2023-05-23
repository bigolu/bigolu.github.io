module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/variables.scss";
        `
      }
    }
  },
  devServer: {
    // This url is connected to a cloudflare tunnel. This lets me see the site from other machines.
    //
    // TODO: Since the websocket connection that the devserver uses isn't secure, Firefox does blocks
    // the connection and the site won't load. This behaviour can be disabled in Firefox's about:config.
    // source: https://stackoverflow.com/questions/59054157/vuejs-error-when-deploying-to-prod-domexception-the-operation-is-insecure
    allowedHosts: ['local.bigo.lu'],
  }
};
