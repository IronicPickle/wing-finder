// Libs
const commandIndex = require("../commands/index.js");
const checkUserPerm = require("./checkUserPerm.js");
const checkChannelPerm = require("./checkChannelPerm.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

function getCommand(input, callback, msg) {
  input = input.toLowerCase();
  var isValid = input.startsWith(prefix);

  if(isValid) {
    var withoutPrefix = input.slice(prefix.length);
    var args = withoutPrefix.split(" ");
    var command = args[0];
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
      checkChannelPerm(msg.guild, msg.channel, (validated, activeChannel, unbound, claimed) => {
        if(!claimed && command != "claim" && command != "status") {
          callback(null, "This bot has not been claimed, use ' " + prefix + "claim ' to claim it.");
        } else if(!validated && commandClass.RESTRICT_CHANNEL) {
          if(unbound) {
            callback(null, "A command channel has not been bound.\nUse ' " + prefix + "admin bind-channel ' to bind a channel.");
          } else {
            callback(null, "You can only use commands in <#" + activeChannel + ">.");
          }
          return;
        } else {
          checkUserPerm(msg.guild, msg.channel, msg.member, commandClass.REQUIRED_GROUP, validated => {
            if(!validated) {
              callback(null, "You do not have permission to use this command.");
              return;
            } else {
              callback(commandClass, null);
              return;
            }
          });
        }
      });
    } else {
      callback(commandClass, null);
      return;
    }
  }
  return;
}

module.exports = getCommand;
