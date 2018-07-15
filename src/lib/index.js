const chalk = require("chalk");
const fs = require("fs");
const yaml = require("js-yaml");


/**
 * Logs specific string to console
 *
 * @param {String} string String to log
 * @api public
 */
function log(string) {
  console.log(chalk`{bold.blue [INFO] }${string}`);
}

/**
 * Logs an error to console
 *
 * @param {String} string Error to log
 * @api public
 */
function error(string) {
  console.log(chalk`{bold.red [ERROR] }${string}`);
  process.exitCode = 1;
}

/**
 * Reads config file
 *
 * @param {String} path Path to config file
 * @returns {Object}
 * @api public
 */
function readConfig(path) {
  // Load configuration file with utf-8 charset
  try {
    const file = fs.readFileSync(path, 'utf-8');
    const doc = yaml.safeLoad(file);
    return doc;
  } catch(e) {
    error(e);
    return {};
  }
}


// Export all functions
module.exports = {
  log,
  error,
  readConfig,
  providers: require("./providers")
}
