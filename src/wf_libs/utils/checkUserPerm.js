// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

function checkUserPerm(guildData, channel, member, group, callback) {
  if(!group) {
    return true;
  }
  var perms = guildData.perms;
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

  return (userHasPerm || userGroupHasPerm);

}

module.exports = checkUserPerm;
