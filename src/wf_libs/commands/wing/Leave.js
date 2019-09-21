// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;

class Leave {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "wing leave";
    this.USAGE = prefix + this.COMMAND + " [wing id]";
    this.HELP = "Leaves a specific wing by it's ID.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "member";
    this.RESTRICT_CHANNEL = true;
    if(args.length != 1) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var guild = msg.guild;
    var user = msg.author;
    var wingID = this.ARGS[0];
    var filteredWings = wings.filter(obj => obj.GUILD == guild);
    var wing = filteredWings.find(obj => obj.ID == wingID);
    if(!wing) {
      msg.reply("No wing exists with that ID.");
    } else {
      if(!wing.STATUS) { // Checks if wing is closed
        msg.reply("Sorry, that wing is closed.");
      } else if(!wing.MEMBERS.includes(user)) { // Checks the user is in wing
        msg.reply("You're not a member of that wing.");
      } else {
        wing.removeMember(user);
        msg.reply("Left ' " + wingID + " '");
      }
    }
  }
}

module.exports = Leave;
