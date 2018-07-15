const lib = require("./lib");


const nodeCommands = [
  "node",
  "npm",
  "yarn"
];

async function main() {
  let subcommand = "cloudflare-provider";

  subcommand = process.argv.slice(2)[0];

  switch(subcommand) {
    case "version":
      lib.log("dnsmanage, Version " + require("./../package.json").version);
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
