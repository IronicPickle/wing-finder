// Libs
const checkUserPerm = require("../utils/checkUserPerm.js");
const generateFindWingMessage = require("../utils/generateFindWingMessage.js");
// Vars
const vars = require("../vars.js");
const wingMsgEmojisArr = vars.wingMsgEmojisArr;
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

function onReactionRemove(client, reaction, user) {
  var botUser = client.user;
  if(user.id == botUser.id) return;
  var message = reaction.message;
  var guild = message.guild;
  var channel = message.channel;
  var member = guild.member(user);
  if(!member) return;
  var emoji = reaction.emoji;
  var filteredWingFindMessages = wingFindMessages.filter(obj => obj.GUILD == guild);
  GuildData.findOne({guildID: guild.id}).exec().then(guildData => {
    if(!guildData) throw new Error("No data returned!");
    var validated = checkUserPerm(guildData, channel, member, "member");
    if(wingMsgEmojisArr.includes(emoji.id)) {
      // Checks message is relevant
      var wingFindMessage = filteredWingFindMessages.find(obj => obj.MESSAGE == message);
      if(wingFindMessage) {
        // Checks message is relevant to user
        wingFindMessage = filteredWingFindMessages.find(obj => obj.USER == user);
        if(!wingFindMessage) {
          user.send("That isn't your message.\nTo find a wing of your own, use ' " + prefix + "wing find '.");
        } else if(!validated) { // Checks user is validated
          user.send("You do not have permission to do that.");
        } else {
          wingFindMessage.EMOJIS.splice(wingFindMessage.EMOJIS.indexOf(emoji.id), 1);
          wingFindMessage.update();
        }
      }
    }
  }).catch(err => {
    channel.send("An internal error has occurred.");
    console.log(err);
  });
}

module.exports = onReactionRemove;
