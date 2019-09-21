// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

function checkChannelPerm(guild, channel, callback) {
  GuildData.findOne({guildID: guild.id}).exec().then(data => {
    if(!data) throw new Error("No data returned!");
    var activeChannel = data.activeChannel;
    var recievedChannel = channel.id;

    if(!activeChannel) var unbound = true;

    callback((activeChannel == recievedChannel), activeChannel, unbound);
    return;
  }).catch(err => {
    channel.send("An internal error has occurred.");
    console.log(err);
  });
}

module.exports = checkChannelPerm;
