// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

class Status {
  constructor(args) {
    this.COMMAND = "status";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Displays the current status of the bot.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = null;
    this.RESTRICT_CHANNEL = false;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var channel = msg.channel;
    var guild = msg.guild;
    GuildData.findOne({guildID: guild.id}).exec().then(data => {
      if(!data) throw new Error("No data returned!");
      var claimed = data.claimed,
          perms = data.perms,
          activeChannel = data.activeChannel;

      var claimedString = "Claimed",
          unclaimedString = "Unclaimed - Use ' " + prefix + "claim ' to claim this bot";
      if(perms.admin.users.length <= 0 && perms.admin.groups.length <= 0) {
        claimedString +=  " (Needs Re-claiming - Use ' " + prefix + "claim ' to re-claim this bot.)";
      }

      if(!activeChannel) {
        activeChannel = "N/A";
      } else {
        activeChannel = "<#" + activeChannel + ">"
      }

      channel.send("**__Bot Status__** ");
      channel.send("**Status:** "+((claimed) ? claimedString : unclaimedString));
      channel.send("**Bound Channel:** " + activeChannel);

    }).catch(err => {
      channel.send("An internal error has occurred.");
      console.log(err);
    });
  }
}

module.exports = Status;
