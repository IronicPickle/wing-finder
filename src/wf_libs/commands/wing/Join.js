// Libs
const removeFromCurrWing = require("../../utils/removeFromCurrWing.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;

class Join {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "wing join";
    this.USAGE = prefix + this.COMMAND + " [wing id]";
    this.HELP = "Joins a specific wing by it's ID.";
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
      } else if(wing.MEMBERS.includes(user)) { // Checks if user is in wing
        msg.reply("You're already a member of that wing.");
      } else if(wing.MEMBERS.length >= 4) { // Checks if wing is full
        msg.reply("Sorry, that wing is full");
      } else {
        removeFromCurrWing(user, guild);
        wing.addMember(user);
        msg.reply("Joined ' " + wingID + " '");
        wing.MESSAGE.create();
      }
    }
  }
}

module.exports = Join;
