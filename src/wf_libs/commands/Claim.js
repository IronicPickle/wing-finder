// Libs
const Discord = require("discord.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

class Claim {
  constructor(args) {
    this.COMMAND = "claim";
    this.USAGE = prefix + this.COMMAND;
    this.HELP = "Claims the bot and assumes control.";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = null;
    this.RESTRICT_CHANNEL = false;
    if(args.length > 0) this.INVALID_USAGE = true;
  }
  exec(msg) {

    var exceptionIDs = ["452159417715261445", "107851744674885632"];

    var member = msg.member;
    var userPerms = member.permissions;
    var guild = msg.guild;
    var user = msg.author;
    var channel = msg.channel;

    var permissions = member.permissionsIn(channel);
    var hasAdminPerm = permissions.has("ADMINISTRATOR");
    if(!hasAdminPerm && !exceptionIDs.includes(user.id)) {
      msg.reply("You must have the ' ADMINISTRATOR ' permission to use this command.");
      return;
    }

    GuildData.findOne({guildID: guild.id}, "perms").exec().then(data => {
      if(!data) throw new Error("No data returned!");
      var perms = data.perms;
      if(perms.admin.users.length > 0 || perms.admin.groups.length > 0) {
        msg.reply("This bot has already been claimed.");
        return;
      }

      data.perms.admin.users.push(user.id);

      GuildData.updateOne({guildID: guild.id}, {perms: data.perms, claimed: true}).exec().then(() => {
        msg.reply("You have claimed this bot.\nAll admin commands have been bound to your user.\nUse ' " + prefix + "admin bind-channel ' in the channel you want the bot to use.");
      }).catch(err => {
        console.log(err);
        msg.channel.send("An internal error has occurred.");
      });
    }).catch(err => {
      console.log(err);
      msg.channel.send("An internal error has occurred.");
    });
  }
}

module.exports = Claim;
