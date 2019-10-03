// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

class Exterminate {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "exterminate";
    this.USAGE = prefix + this.COMMAND + " [@user]";
    this.HELP = "Extermiantes a specific user with the BLC™ (Braben Laser Cannon).";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = null;
    this.RESTRICT_CHANNEL = false;
    if(args.length != 1) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var channel = msg.channel;
    var filteredMentions = msg.mentions.users.filter(obj => !obj.bot);
    var user = filteredMentions.first();

    if(!user) {
      msg.reply("Invalid user ID.");
      return;
    }

    msg.reply("We're deploying the BLC™ (Braben Laser Cannon) as we speak and are directing it towards " + user.username + "'s house.");
  }
}

module.exports = Exterminate;
