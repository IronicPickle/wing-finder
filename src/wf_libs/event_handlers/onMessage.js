// Libs
const getCommand = require("../utils/getCommand.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

function onMessage(client, msg) {
  var user = msg.author;
  var botUser = client.user;
  if(user.id == botUser.id) return;
  getCommand(msg.content, (command, err) => {
    if(err) {
      var res = err;
      if(command) res += "\nUsage: " + command.USAGE +
      "\nUse ' " + prefix + "help " + command.COMMAND +
      " ' to view detailed command usage."
      msg.reply(res);
      return;
    }
    command.exec(msg, client);
  }, msg);
}

module.exports = onMessage;
