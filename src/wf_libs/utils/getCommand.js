// Libs
const commandIndex = require("../commands/index.js");
const checkUserPerm = require("./checkUserPerm.js");
const checkChannelPerm = require("./checkChannelPerm.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

function getCommand(input, callback, msg) {
  var isValid = input.toLowerCase().startsWith(prefix);

  if(isValid) {
    var withoutPrefix = input.slice(prefix.length);
    var args = withoutPrefix.split(" ");
    var command = args[0].toLowerCase();
    args.shift()
    var isCommand = typeof commandIndex[command] != "undefined";
    if(isCommand) var commandClass = new commandIndex[command](args);
    if(!isCommand) {
      callback(null, "Command not found");
      return;
    } else if(commandClass.INVALID_USAGE) {
      callback(commandClass, "Invalid usage.");
      return;
    } else if(msg) {
      var guild = msg.guild;
      var channel = msg.channel;
      var member = msg.member;
      GuildData.findOne({guildID: guild.id}).exec().then(guildData => {
        if(!guildData) throw new Error("No data returned!");
        var validated = checkChannelPerm(guildData, channel);
        if(!guildData.claimed && command != "claim" && command != "status") {
          callback(null, "This bot has not been claimed, use ' " + prefix + "claim ' to claim it.");
        } else if(!validated && commandClass.RESTRICT_CHANNEL) {
          if(!guildData.activeChannel) {
            callback(null, "A command channel has not been bound.\nUse ' " + prefix + "admin bind-channel ' to bind a channel.");
          } else {
            callback(null, "You can only use commands in <#" + guildData.activeChannel + ">.");
          }
          return;
        } else {
          var validated = checkUserPerm(guildData, channel, member, commandClass.REQUIRED_GROUP);
          if(!validated) {
            callback(null, "You do not have permission to use this command.");
            return;
          } else {
            callback(commandClass, null);
            return;
          }
        }
      }).catch(err => {
        channel.send("An internal error has occurred.");
        console.log(err);
      });
    } else {
      callback(commandClass, null);
      return;
    }
  }
  return;
}

module.exports = getCommand;
