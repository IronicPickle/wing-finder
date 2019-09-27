// Libs
const checkUserPerm = require("./checkUserPerm.js");
const checkChannelPerm = require("./checkChannelPerm.js");
// DB models
const RegisteredCommands = require("../../models/registered_commands");
const GuildData = require("../../models/guild_data.js");

function printPerms(msg, arg) {
  var guild = msg.guild;
  var channel = msg.channel;
  var member = msg.member;
  var user = msg.author;

  RegisteredCommands.find({}).then(registered => {
    if(!registered) throw new Error("No data returned!");
    GuildData.findOne({guildID: guild.id}).exec().then(guildData => {
      if(!guildData) throw new Error("No data returned!");

      if(arg) {

        var mainStr = "";
        var registeredCommand = registered.find(obj => obj.name == arg);
        if(registeredCommand) {
          var command = registeredCommand.object;
          mainStr += "__**Command Info**__";
          mainStr += "\nHelp: " + command.HELP + "\nUsage: " + command.USAGE;
          if(command.IS_SUB) {
            var children = command.CHILDREN;
            mainStr += "\n**__Sub-Commands__**\n";
            for(var ii in children) {
              var child = command.COMMAND + " " + children[ii];
              var subCommand = registered.find(obj => obj.name == child).object;
              var requiredGroup = subCommand.REQUIRED_GROUP;
              var validated = checkUserPerm(guildData, channel, member, requiredGroup);
              if(validated) {
                if(!subCommand.IS_SUB) mainStr += "> **> " + subCommand.USAGE + "** - "
                if(requiredGroup) mainStr += "(" + (requiredGroup.charAt(0).toUpperCase() + requiredGroup.slice(1)) + ") ";
                if(!subCommand.IS_SUB) mainStr += "*" + subCommand.HELP + "*\n";
              }
            }
            mainStr += "";
          }
        } else {
          channel.send("<@" + member.id + ">, ' " + arg + " ' is not a command.");
          return;
        }
        msg.reply("I've sent you a PM with help info.");
        user.send(mainStr);

      } else {

        var mainStr = "";

        mainStr += "__**Available Commands**__\n";

        for(var i in registered) {
          var command = registered[i].object;
          var requiredGroup = command.REQUIRED_GROUP;
          var validated = checkUserPerm(guildData, channel, member, requiredGroup);
          if(validated) {
            if(!command.IS_SUB) mainStr += "> **> " + command.USAGE + "** - "
            if(requiredGroup) mainStr += "(" + (requiredGroup.charAt(0).toUpperCase() + requiredGroup.slice(1)) + ") ";
            if(!command.IS_SUB) mainStr += "*" + command.HELP + "*\n";
          }
        }

        mainStr += "";
        msg.reply("I've sent you a PM with help info.");
        user.send(mainStr);
      }
    }).catch(err => {
      console.log(err);
      channel.send("An internal error has occurred.");
    });
  }).catch(err => {
    console.log(err);
    channel.send("An internal error has occurred.");
  });

}

module.exports = printPerms;
