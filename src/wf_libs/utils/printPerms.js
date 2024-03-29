// Libs
const Discord = require("discord.js");
// DB models
const GuildData = require("../../models/guild_data.js");

function printPerms(guild, channel) {
  GuildData.findOne({guildID: guild.id}, "perms").exec().then(data => {
    if(!data) throw new Error("No data returned!");
    var perms = data.perms;
    var mainStr = "";

    mainStr += "__**Permissions**__\n";
    for(var i in perms) {
      var users = "";
      var groups = "";
      for(var ii in perms[i].users) {
        var userID = perms[i].users[ii];
        var index = perms[i].users.indexOf(userID);
        var user = guild.member(userID).user;
        var name = userID;
        if(user) name = user.username;
        users += (((index > 0) ? ", " : "") + name);
      }
      for(var ii in perms[i].groups) {
        var roleID = perms[i].groups[ii];
        var index = perms[i].groups.indexOf(roleID);
        var roles = guild.roles;
        var role = roles.find(val => val.id === roleID)
        var name = roleID;
        if(role) name = role.name;
        groups += (((index > 0) ? ", " : "") + name);
      }

      mainStr += "> **> " + i.charAt(0).toUpperCase() + i.slice(1) + "**\n";
      mainStr += ">  > __Users__: " + users + "\n";
      mainStr += ">  > __Groups__: " + groups + "\n";
    }

    channel.send(mainStr);
  }).catch(err => {
    console.log(err);
    channel.send("An internal error has occurred.");
  });
}

module.exports = printPerms;
