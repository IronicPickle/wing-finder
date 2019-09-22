// Libs
const checkUserPerm = require("../utils/checkUserPerm.js");
const generateFindWingMessage = require("../utils/generateFindWingMessage.js");
// Vars
const vars = require("../vars.js");
const wingMsgEmojisArr = vars.wingMsgEmojisArr;
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

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
  checkUserPerm(guild, channel, member, "member", validated => {
    if(wingMsgEmojisArr.includes(emoji.name)) {
      // Checks message is relevant
      var wingFindMessage = filteredWingFindMessages.find(obj => obj.MESSAGE == message);
      if(wingFindMessage) {
        // Checks message is relevant to user
        wingFindMessage = filteredWingFindMessages.find(obj => obj.USER == user);
        if(!wingFindMessage) {
          user.send("That isn't your message.\nTo find a wing of your own, use ' " + prefix + "wing find '.");
        } else {
          wingFindMessage.EMOJIS.splice(wingFindMessage.EMOJIS.indexOf(emoji.name), 1);
          var wingFindStr = generateFindWingMessage(user, wingFindMessage.EMOJIS);
          wingFindMessage.MESSAGE.edit(wingFindStr);
        }
      }
    }
  });
}

module.exports = onReactionRemove;