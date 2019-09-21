// Libs
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const RegisteredCommands = require("../../models/registered_commands");

function printPerms(channel) {
  RegisteredCommands.find({}).then(registered => {
    var mainStr = "";

    mainStr += "__**Available Commands**__\n```";

    for(var i in registered) {
      var command = registered[i].object;
      if(!command.IS_SUB) mainStr += "> " + command.USAGE + " - " + command.HELP + "\n";
    }

    mainStr += "```";
    channel.send(mainStr);
  }).catch(err => {
    console.log(err);
    channel.send("An internal error has occurred.");
  });
}

module.exports = printPerms;
