// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

class Show {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "show";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Displays the wing you are currently in.";
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
      msg.reply("You're not currently in a wing.");
    } else {
      if(!wing.MEMBERS.includes(user)) { // Checks the user is in wing
        msg.reply("You're not a member of that wing.");
      } else {
        wing.MESSAGE.create();
      }
    }
  }
}

module.exports = Show;
