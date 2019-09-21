// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

function checkUserPerm(guild, channel, member, group, callback) {
  if(!group) {
    callback(true);
    return;
  }
  GuildData.findOne({guildID: guild.id}).exec().then(data => {
    if(!data) throw new Error("No data returned!");
    var perms = data.perms;
    var user = member.user;
    var userID = user.id;
    var userRoles = member.roles;
    var hierarchy = Object.keys(perms).reverse();

    var userHasPerm = false;
    var userGroupHasPerm = false;

    for(var i = hierarchy.indexOf(group); i < hierarchy.length; i++) {
      if(perms[hierarchy[i]].users.includes(userID)) userHasPerm = true;
    }

    for(var i = hierarchy.indexOf(group); i < hierarchy.length; i++) {
      var boundRoles = perms[hierarchy[i]].groups;

      for(var ii in boundRoles) {
        var boundRole = boundRoles[ii];
        var role = userRoles.find(val => val.id === boundRole);
        if(role) userGroupHasPerm = true;
      }
    }

    callback(userHasPerm || userGroupHasPerm);
    return;
  }).catch(err => {
    channel.send("An internal error has occurred.");
    console.log(err);
  });
}

module.exports = checkUserPerm;
