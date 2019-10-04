// Libs
const printWings = require("../utils/printWings.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

class List {
  constructor(args) {
    this.COMMAND = "list";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Displays a list of all available wings.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "member";
    this.RESTRICT_CHANNEL = true;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var guild = msg.guild;
    var channel = msg.channel;

    printWings(channel, guild);
  }
}

module.exports = List;
