// Libs
const removeFromCurrWing = require("../../utils/removeFromCurrWing.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;

class Kick {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "wing kick";
    this.USAGE = prefix + this.COMMAND + " [@user]";
    this.HELP = "Kicks a user from the wing your are currently in.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "member";
    this.RESTRICT_CHANNEL = true;
    if(args.length != 1) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var args = this.ARGS;
    var guild = msg.guild;
    var user = msg.author;
    if(!args[0].match(/<@([0-9]){18}>/g)) {
      msg.reply("Invalid user ID.");
      return;
    }
    var targetUserID = args[0].match(/([0-9]){18}/g)[0];
    var filteredWings = wings.filter(obj => obj.GUILD == guild);
    var wing = filteredWings.find(obj => obj.MEMBERS.includes(user));
    if(!wing) {
      msg.reply("You're not a member of wing.");
    } else if(wing.CREATOR != user) {
      msg.reply("You're not the creator of your wing.");
    } else {
      var targetUser = wing.MEMBERS.find(obj => obj.id == targetUserID);
      if(!targetUser) {
        msg.reply("That user is not a member of your wing.");
      } else if(targetUser == user) {
        msg.reply("You can't kick yourself.");
      } else {
        wing.kickMember(targetUser);
      }
    }
  }
}

module.exports = Kick;
