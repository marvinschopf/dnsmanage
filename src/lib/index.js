const chalk = require("chalk");
const fs = require("fs");
const pathlib = require("path");
const yaml = require("js-yaml");
const { GitProcess } = require("dugite");

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
    const file = fs.readFileSync(path, "utf-8");
    const doc = yaml.safeLoad(file);
    return doc;
  } catch (e) {
    error(e);
    return {};
  }
}

/**
 * Initializes the config files
 *
 * @param {String} path Path to base folder
 * @returns {Boolean}
 */
async function initConfig(path) {
  const templateDir = pathlib.join(__dirname, "..", "templates");
  if (!fs.existsSync(pathlib.join(path, "records"))) {
    fs.mkdirSync(pathlib.join(path, "records"));
  }
  fs.writeFileSync(
    pathlib.join(path, "config.yml"),
    fs.readFileSync(pathlib.join(templateDir, "config.yml"))
  );
  fs.writeFileSync(
    pathlib.join(path, "records", "a.yml"),
    fs.readFileSync(pathlib.join(templateDir, "records", "a.yml"))
  );
  fs.writeFileSync(
    pathlib.join(path, "records", "cname.yml"),
    fs.readFileSync(pathlib.join(templateDir, "records", "cname.yml"))
  );
  fs.writeFileSync(
    pathlib.join(path, "records", "mx.yml"),
    fs.readFileSync(pathlib.join(templateDir, "records", "mx.yml"))
  );
  await addGit(path);
  await commitGit(path, "add config files");
}

/**
 * Stage changes in git
 *
 * @param {String} path Path to repository
 * @returns {Boolean}
 */
async function addGit(path) {
  const result = await GitProcess.exec(["add", "* ."], path);
  if (result.exitCode === 0) {
    initConfig(path);
    return true;
  } else {
    return false;
  }
}

/**
 * Commit changes in git
 *
 * @param {String} path Path to repository
 * @param {String} message Commit message
 * @returns {Boolean}
 */
async function commitGit(path, message) {
  const result = await GitProcess.exec(["commit", "-m", message], path);
  if (result.exitCode === 0) {
    initConfig(path);
    return true;
  } else {
    return false;
  }
}

/**
 * Initialize git repository
 *
 * @param {String} path Path to repository
 * @returns {Boolean}
 */
async function initGitRepo(path) {
  const result = await GitProcess.exec(["init", path]);
  if (result.exitCode === 0) {
    await initConfig(path);
    return true;
  } else {
    return false;
  }
}

// Export all functions
module.exports = {
  log,
  error,
  readConfig,
  initGitRepo,
  providers: require("./providers")
};
