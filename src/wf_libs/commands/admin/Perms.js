// Libs
const printPerms = require("../../utils/printPerms.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../../models/guild_data.js");

class Admin {
  constructor(args) {
    this.COMMAND = "admin perms";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Returns the current permission configuration.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "admin";
    this.RESTRICT_CHANNEL = false;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var guild = msg.guild;
    var channel = msg.channel;
    printPerms(guild, channel);
  }
}

module.exports = Admin;
