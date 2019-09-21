// Libs
const restoreDefaults = require("../utils/restoreDefaults.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

class Claim {
  constructor(args) {
    this.COMMAND = "reset";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "[Warning] This will completely wipe all bot data.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "admin";
    this.RESTRICT_CHANNEL = false;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var member = msg.member;
    var userPerms = member.permissions;
    var guild = msg.guild;
    var channel = msg.channel;

    var permissions = member.permissionsIn(channel);
    var hasAdminPerm = permissions.has("ADMINISTRATOR");
    if(!hasAdminPerm) {
      msg.reply("You must have the ' ADMINISTRATOR ' permission to use this command.");
      return;
    }

    restoreDefaults(guild.id);

    msg.reply("This bot has been reset, use ' " + prefix + "claim ' to re-claim it.");

  }
}

module.exports = Claim;
