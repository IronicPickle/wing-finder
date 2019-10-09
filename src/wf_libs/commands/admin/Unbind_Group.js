// Libs
const printPerms = require("../../utils/printPerms.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../../models/guild_data.js");

class UnbindGroup {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "admin unbind-group";
    this.USAGE = prefix + this.COMMAND + " [@role] [group]";
    this.HELP = "Unbinds a group from a permission set.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = "admin";
    this.RESTRICT_CHANNEL = false;
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
      var roles = guild.roles;

      var mentions = msg.mentions.roles;
      var role = mentions.first();

      if(!role) {
        msg.reply("Invalid role ID.");
        return;
      }
      if(!perms.hasOwnProperty(args[1])) {
        msg.reply("Invalid group.");
        return;
      }
      if(!perms[args[1]].groups.includes(role.id)) {
        msg.reply(role + " is not bound to '"+args[1].toUpperCase()+"'.");
        return;
      }
      var index = perms[args[1]].groups.indexOf(role.id);
      perms[args[1]].groups.splice(index, 1);

      GuildData.updateOne({guildID: guild.id}, {perms: perms}).exec().then(() => {

        msg.reply("Unbound " + role + " from permission set '"+args[1].toUpperCase()+"'.");
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

module.exports = UnbindGroup;
