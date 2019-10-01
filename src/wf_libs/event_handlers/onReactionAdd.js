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
// DB models
const GuildData = require("../../models/guild_data.js");

function onReactionAdd(client, reaction, user) {
  var botUser = client.user;
  if(user.id == botUser.id) return;
  var message = reaction.message;
  var guild = message.guild;
  var channel = message.channel;
  var member = guild.member(user);
  if(!member) return;
  var emoji = reaction.emoji;
  var filteredWings = wings.filter(obj => obj.GUILD == guild);
  var filteredWingFindMessages = wingFindMessages.filter(obj => obj.GUILD == guild);
  GuildData.findOne({guildID: guild.id}).exec().then(guildData => {
    if(!guildData) throw new Error("No data returned!");
    var validated = checkUserPerm(guildData, channel, member, "member");
    if(wingEmojisArr.includes(emoji.name)) {
      // Checks message is relevant
      var wing = filteredWings.find(obj => obj.MESSAGE.MESSAGES.includes(message));
      if(wing) {
        if(!validated) { // Checks user is validated
          user.send("You do not have permission to do that.");
        } else {
          if(emoji.name == "✅") { // Emoji check
            if(wing.MEMBERS.includes(user)) { // Checks if user is in wing
              user.send("You're already a member of that wing.");
            } else if(wing.MEMBERS.length >= 4) { // Checks if wing is full
              user.send("Sorry, that wing is full");
            } else {
              removeFromCurrWing(user, guild);
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
    } if(wingMsgEmojisArr.includes(emoji.name) || emoji.name == "✅") {
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
  }).catch(err => {
    channel.send("An internal error has occurred.");
    console.log(err);
  });
}

module.exports = onReactionAdd;
