// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;

class Disband {
  constructor(args) {
    this.COMMAND = "wing disband";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Disbands your current wing.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "member";
    this.RESTRICT_CHANNEL = true;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var guild = msg.guild;
    var user = msg.author;

    var filteredWings = wings.filter(obj => obj.GUILD == guild);
    var wing = filteredWings.find(obj => obj.MEMBERS.includes(user));
    if(!wing) {
      msg.reply("You're not a member of wing.");
    } else if(wing.CREATOR != user) {
      msg.reply("You're not the creator of your wing.");
    } else {
      wing.close();
    }
  }
}

module.exports = Disband;
