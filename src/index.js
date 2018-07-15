const lib = require("./lib");
const path = require("path");

const nodeCommands = ["node", "npm", "yarn"];

async function main() {
  let subcommand = "cloudflare-provider";

  subcommand = process.argv.slice(2)[0];

  switch (subcommand) {
    case "version":
      lib.log("dnsmanage, Version " + require("./../package.json").version);
      break;
    case "init":
      const res = await lib.initGitRepo(path.join(process.cwd(), "dns"));
      if (res) {
        lib.log("Init complete.");
      } else {
        lib.error("Init failed.");
      }
      break;
    case "providers":
      lib.log("Providers: " + Object.keys(lib.providers));
      break;
    default:
      lib.error("Unknown subcommand: " + subcommand);
      break;
  }
}

main();
