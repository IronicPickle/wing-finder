// Libs
const printPerms = require("../../utils/printPerms.js");
// Vars
const config = require("../../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../../models/guild_data.js");

class BindGroup {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "admin bind-group";
    this.USAGE = prefix + this.COMMAND + " [@role] [group]";
    this.HELP = "Binds a group to a permission set.";
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
      var roles = guild.roles;

      if(!args[0].match(/<@&([0-9]){18}>/g)) {
        msg.reply("Invalid role ID.");
        return;
      }
      var roleID = args[0].match(/([0-9]){18}/g)[0];
      var role = roles.find(val => val.id === roleID)
      if(!role) {
        msg.reply("Invalid role.");
        return;
      }
      if(perms[args[1]].groups.includes(roleID)) {
        msg.reply("<@&"+roleID+"> is already bound to '"+args[1].toUpperCase()+"'.");
        return;
      }
      perms[args[1]].groups.push(roleID);

      GuildData.updateOne({guildID: guild.id}, {perms: perms}).exec().then(() => {

        msg.reply("Bound <@&"+roleID+"> to permission set '"+args[1].toUpperCase()+"'.");
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

module.exports = BindGroup;
