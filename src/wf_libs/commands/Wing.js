// Libs
const mongoose = require("mongoose");
const commandIndex = require("./wing/index.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

class Wing {
  constructor(args) {
    this.COMMAND = "wing";
    this.USAGE = prefix + this.COMMAND + " [sub-command]";
    this.HELP = "Wing command.";
    this.IS_SUB = true;
    if(args.length > 0) {
      var command = args[0].toLowerCase();
      args.shift();
      var isCommand = typeof commandIndex[command] != "undefined";
      if(isCommand) {
        var commandClass = new commandIndex[command](args);
        return commandClass;
      }
    }
    this.INVALID_USAGE = true;
  }
}

module.exports = Wing;
