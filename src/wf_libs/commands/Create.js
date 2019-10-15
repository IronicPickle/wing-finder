// Libs
const WingFindMessage = require("../objects/WingFindMessage.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

class Create {
  constructor(args) {
    this.COMMAND = "create";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Forcibly creates a new wing.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "member";
    this.RESTRICT_CHANNEL = true;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg, client) {
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
      new WingFindMessage(client, user, channel, guild, true);
    }
  }
}

module.exports = Create;
