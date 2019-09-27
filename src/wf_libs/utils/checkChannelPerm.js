// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

function checkChannelPerm(guildData, channel, callback) {
  var activeChannel = guildData.activeChannel;
  var recievedChannel = channel.id;

  return (activeChannel == recievedChannel);
}

module.exports = checkChannelPerm;
