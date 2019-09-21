// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../../models/guild_data.js");

class BindChannel {
  constructor(args) {
    this.COMMAND = "admin bind-channel";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Binds the bot to the channel this command is used in.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "admin";
    this.RESTRICT_CHANNEL = false;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var guild = msg.guild;
    var channel = msg.channel;

    GuildData.updateOne({guildID: guild.id}, {activeChannel: channel.id}).exec().then(() => {
      channel.send("Bound <#" + channel.id + "> as the bot's active channel.");
    }).catch(err => {
      console.log(err);
      channel.send("An internal error has occurred.");
    });
  }
}

module.exports = BindChannel;
