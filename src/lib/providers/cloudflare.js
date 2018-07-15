const Provider = require("./provider");

class CloudflareProvider extends Provider.Provider {

  getProviderTitle() {
    return "Cloudflare";
  }
}

module.exports = {
  CloudflareProvider
}
