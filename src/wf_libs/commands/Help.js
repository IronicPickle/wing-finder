// Libs
const mongoose = require("mongoose");
const printHelp = require("../utils/printHelp.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");
const RegisteredCommands = require("../../models/registered_commands");

class Help {
  constructor(args) {
    this.COMMAND = "help";
    this.USAGE = prefix + this.COMMAND + " or " + prefix + this.COMMAND + " [command]";
    this.HELP = "Displays a list of commands or displays help for a specific command.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = null;
    this.RESTRICT_CHANNEL = true;
    var arg = args.join(" ");
    this.ARG = arg;
  }
  exec(msg) {
    var arg = this.ARG;
    printHelp(msg, arg);
  }
}

module.exports = Help;
