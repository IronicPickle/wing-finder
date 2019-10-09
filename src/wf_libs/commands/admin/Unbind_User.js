// Libs
const printPerms = require("../../utils/printPerms.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../../models/guild_data.js");

class UnbindUser {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "admin unbind-user";
    this.USAGE = prefix + this.COMMAND + " [@user] [group]";
    this.HELP = "Unbinds a user from a permission set.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "admin";
    this.RESTRICT_CHANNEL = false;
    if(args.length != 2) {
      this.INVALID_USAGE = true;
    }
  }
  exec(msg, client) {
    var guild = msg.guild;
    var channel = msg.channel;
    var args = this.ARGS;
    GuildData.findOne({guildID: guild.id}, "perms").exec().then(data => {
      if(!data) throw new Error("No data returned!");
      var perms = data.perms

      var filteredMentions = msg.mentions.users.filter(obj => !obj.bot);
      var user = filteredMentions.first();

      if(!user) {
        msg.reply("Invalid user ID.");
        return;
      }
      if(!perms.hasOwnProperty(args[1])) {
        msg.reply("Invalid group.");
        return;
      }
      if(!perms[args[1]].users.includes(user.id)) {
        msg.reply(user + " is not bound to '"+args[1].toUpperCase()+"'.");
        return;
      }
      var index = perms[args[1]].users.indexOf(user.id);
      perms[args[1]].users.splice(index, 1);

      GuildData.updateOne({guildID: guild.id}, {perms: perms}).exec().then(() => {

        msg.reply("Unbound " + user + " from permission set '"+args[1].toUpperCase()+"'.");
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

module.exports = UnbindUser;
