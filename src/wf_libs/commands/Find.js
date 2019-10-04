// Libs
const WingFindMessage = require("../objects/WingFindMessage.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

class Create {
  constructor(args) {
    this.COMMAND = "find";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Attempts to find a wing matching your chosen activities.\n"+
    "> If no wing is found, a wing will be created with you as the creator.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "member";
    this.RESTRICT_CHANNEL = true;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var channel = msg.channel;
    var user = msg.author;
    var guild = msg.guild;
    var wingFindMessage = wingFindMessages.find(obj => obj.USER == user);
    if(wingFindMessage) {
      if(wingFindMessage.OVERRIDE) {
        msg.reply("You're already creating a wing.");
      } else {
        msg.reply("You're already finding a wing.");
      }
    } else {
      new WingFindMessage(user, channel, guild, false);
    }
  }
}

module.exports = Create;
