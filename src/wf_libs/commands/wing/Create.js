// Libs
const WingFindMessage = require("../../objects/WingFindMessage.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;

class Create {
  constructor(args) {
    this.COMMAND = "wing create";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Forcibly creates a new wing.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "officer";
    this.RESTRICT_CHANNEL = true;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var channel = msg.channel;
    var user = msg.author;
    var guild = msg.guild;
    new WingFindMessage(user, channel, guild, true);
  }
}

module.exports = Create;
