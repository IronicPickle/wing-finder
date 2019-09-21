// Libs
const printPerms = require("../../utils/printPerms.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../../models/guild_data.js");

class BindUser {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "admin bind-user";
    this.USAGE = prefix + this.COMMAND + " [@user] [group]";
    this.HELP = "Binds a user to a permission set.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "admin";
    this.RESTRICT_CHANNEL = true;
    if(args.length != 2) {
      this.INVALID_USAGE = true;
    }
  }
  exec(msg) {
    var guild = msg.guild;
    var channel = msg.channel;
    var args = this.ARGS;
    GuildData.findOne({guildID: guild.id}, "perms").exec().then(data => {
      if(!data) throw new Error("No data returned!");
      var perms = data.perms

      if(!args[0].match(/<@([0-9]){18}>/g)) {
        msg.reply("Invalid user ID.");
        return;
      }
      var userID = args[0].match(/([0-9]){18}/g)[0];
      var guildMember = guild.member(userID);
      if(!guildMember) {
        msg.reply("Invalid user.");
        return;
      }
      var user = guildMember.user;
      if(perms[args[1]].users.includes(userID)) {
        msg.reply("<@"+userID+"> is already bound to '"+args[1].toUpperCase()+"'.");
        return;
      }
      perms[args[1]].users.push(userID);

      GuildData.updateOne({guildID: guild.id}, {perms: perms}).exec().then(() => {

        msg.reply("Bound <@"+userID+"> to permission set '"+args[1].toUpperCase()+"'.");
        printPerms(guild, channel);

      }).catch(err => {
        console.log(err);
        channel.send("An internal error has occurred.");
      });
    }).catch(err => {
      console.log(err);
      channel.send("An internal error has occurred.");
    });
  }
}

module.exports = BindUser;
