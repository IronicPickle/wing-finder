// Vars
const vars = require("../vars.js");
const wingMsgEmojisObj = vars.wingMsgEmojisObj;
const config = require("../../config/global.json");
const wingFindTimeout = config.discord.timeouts.wingFind;
const emojiSourceID = config.discord.emojis.sourceID;

function generateFindWingMessage(client, user, emojis) {
  var sourceGuild = client.guilds.get(emojiSourceID);
  if(!sourceGuild) return;

  var wingFindStr = "<@" + user.id + ">\n__**Choose Activities**__";

  wingFindStr += "\nReact with any of the following emojis."
  wingFindStr += "\nEach emoji corresponds to an activity as listed below."
  wingFindStr += "\nChoose the activities that you would like to engage in with a wing."

  wingFindStr += "\n\n__**Activities**__\n"
  for(var i in wingMsgEmojisObj) {
    var activity = wingMsgEmojisObj[i].activity;
    var emoji = sourceGuild.emojis.get(wingMsgEmojisObj[i].emoji);
    if(!emoji) {
      throw new Error("No emoji found");
    } else {
      if(emojis.includes(emoji.id)) {
        wingFindStr += "**" + activity + "** (" + emoji + ")";
        if((wingMsgEmojisObj.length - 1) != i) wingFindStr += " | ";
      } else {
        wingFindStr += activity + " (" + emoji + ")";
        if((wingMsgEmojisObj.length - 1) != i) wingFindStr += " | ";
      }
      if((parseInt(i) + 1) % 4 == 0) wingFindStr += "\n";
    }
  }

  wingFindStr += "\n\nReact with this when you're done - ✅"

  wingFindStr += "\n***Note:*** *This message will only last for " + wingFindTimeout + " min(s).*";


  return wingFindStr;
}

module.exports = generateFindWingMessage;
