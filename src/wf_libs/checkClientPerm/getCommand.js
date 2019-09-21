// Libs
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
const commandIndex = require("../commands/index.js");

function getCommand(input, callback) {
  var isValid = input.startsWith(prefix);

  if(isValid) {
    var withoutPrefix = input.slice(prefix.length);
    var args = withoutPrefix.split(" ");
    var command = args[0];
    args.shift()
    var isCommand = typeof commandIndex[command] != "undefined";
    if(isCommand) {
      var commandClass = new commandIndex[command](args);
      if(commandClass.INVALID_USAGE) {
        callback(commandClass, "Invalid usage.");
        return;
      }
      callback(commandClass, null);
      return;
    }
    callback(null, "Command not found");
    return;
  }
  return;
}

module.exports = getCommand;
