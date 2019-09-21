// Libs
const checkUserPerm = require("../utils/checkUserPerm.js");
const generateFindWingMessage = require("../utils/generateFindWingMessage.js");
const removeFromCurrWing = require("../utils/removeFromCurrWing.js");
// Vars
const vars = require("../vars.js");
const wingMsgEmojisArr = vars.wingMsgEmojisArr;
const wingEmojisArr = vars.wingEmojisArr;
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

function onReactionAdd(client, reaction, user) {
  var botUser = client.user;
  if(user.id == botUser.id) return;
  var message = reaction.message;
  var guild = message.guild;
  var channel = message.channel;
  var member = guild.member(user);
  if(!member) return;
  var emoji = reaction.emoji
  checkUserPerm(guild, channel, member, "member", validated => {
    if(wingEmojisArr.includes(emoji.name)) {
      // Checks user is validated
      if(!validated) {
        user.send("You do not have permission to do that.");
      } else {
        // Checks message is relevant
        var wing = wings.find(obj => obj.MESSAGE.MESSAGES.includes(message));
        if(wing) {
          // Checks wing is open
          if(!wing.STATUS) {
            user.send("That wing is closed.");
          } else {
            if(emoji.name == "✅") { // Emoji check
              if(wing.MEMBERS.includes(user)) { // Checks if user is in wing
                user.send("You're already a member of that wing.");
              } else if(wing.MEMBERS.length >= 4) { // Checks if wing is full
                user.send("Sorry, that wing is full");
              } else {
                removeFromCurrWing(user);
                wing.addMember(user);
              }
            } else if(emoji.name == "❌") { // Emoji check
              if(!wing.MEMBERS.includes(user)) { // Checks user isn't inw ing
                user.send("You're not a member of that wing.");
              } else {
                wing.removeMember(user);
              }
            }
          }
        }
      }
    } if(wingMsgEmojisArr.includes(emoji.name) || emoji.name == "✅") {
      // Checks message is relevant
      var wingFindMessage = wingFindMessages.find(obj => obj.MESSAGE == message);
      if(wingFindMessage) {
        // Checks message is relevant to user
        wingFindMessage = wingFindMessages.find(obj => obj.USER == user);
        if(!wingFindMessage) {
          user.send("That isn't your message.\nTo find a wing of your own, use ' " + prefix + "wing find '.");
        } else {
          if(emoji.name == "✅") { // Emoji check
            wingFindMessage.close();
          } else {
            wingFindMessage.EMOJIS.push(emoji.name);
            var wingFindStr = generateFindWingMessage(user, wingFindMessage.EMOJIS);
            wingFindMessage.MESSAGE.edit(wingFindStr);
          }
        }
      }
    }
  });
}

module.exports = onReactionAdd;
