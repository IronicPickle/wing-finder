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
        var page = 1;

        var registeredCommand = registered.find(obj => obj.name == arg);
        if(registeredCommand) {
          var command = registeredCommand.object;
          mainStr += "__**Command Info**__";
          mainStr += "\nHelp: " + command.HELP + "\nUsage: " + command.USAGE;
          if(command.IS_SUB) {
            var children = command.CHILDREN;
            mainStr += "\n**__Sub-Commands__**\n";
            mainStr += "> **- Page " + page + ":**\n";
            for(var ii in children) {
              var child = command.COMMAND + " " + children[ii];
              var subCommand = registered.find(obj => obj.name == child).object;
              var requiredGroup = subCommand.REQUIRED_GROUP;
              var validated = checkUserPerm(guildData, channel, member, requiredGroup);
              if(validated) {
                var additiveStr = "";
                if(!subCommand.IS_SUB) additiveStr += "> **> " + subCommand.USAGE + "** - "
                if(requiredGroup) additiveStr += "(" + (requiredGroup.charAt(0).toUpperCase() + requiredGroup.slice(1)) + ") ";
                if(!subCommand.IS_SUB) additiveStr += "*" + subCommand.HELP + "*\n";
                var currLength = mainStr.length + additiveStr.length;
                if(currLength > 2000) {
                  user.send(mainStr);
                  page += 1;
                  mainStr = "> **- Page " + page + ":**\n";
                }
                mainStr += additiveStr;
              }
            }
          }
        } else {
          channel.send(member + ", ' " + arg + " ' is not a command.");
          return;
        }
        msg.reply("I've sent you a PM with help info.");
        user.send(mainStr);

      } else {

        var mainStr = "";
        var page = 1;

        mainStr += "__**Available Commands**__\n";
        mainStr += "> **- Page " + page + ":**\n";

        for(var i in registered) {
          var command = registered[i].object;
          var requiredGroup = command.REQUIRED_GROUP;
          var validated = checkUserPerm(guildData, channel, member, requiredGroup);
          if(validated) {
            var additiveStr = "";
            if(!command.IS_SUB) additiveStr += "> **> " + command.USAGE + "** - "
            if(requiredGroup) additiveStr += "(" + (requiredGroup.charAt(0).toUpperCase() + requiredGroup.slice(1)) + ") ";
            if(!command.IS_SUB) additiveStr += "*" + command.HELP + "*\n";
            var currLength = mainStr.length + additiveStr.length;
            if(currLength > 2000) {
              user.send(mainStr);
              page += 1;
              mainStr = "> **- Page " + page + ":**\n";
            }
            mainStr += additiveStr;
          }
        }


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
