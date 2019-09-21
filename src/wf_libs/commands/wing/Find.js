// Libs
const WingFindMessage = require("../../objects/WingFindMessage.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;

class Create {
  constructor(args) {
    this.COMMAND = "wing find";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Finds a wing.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "member";
    this.RESTRICT_CHANNEL = true;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var channel = msg.channel;
    var user = msg.author;
    new WingFindMessage(user, channel, false);
  }
}

module.exports = Create;
