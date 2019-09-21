// Vars
const vars = require("../vars.js");
const wingMsgEmojisObj = vars.wingMsgEmojisObj;
const config = require("../../config/global.json");
const wingFindTimeout = config.discord.timeouts.wingFind;

function generateFindWingMessage(user, emojis) {
  var wingFindStr = "<@" + user.id + ">\n__**Choose Activities**__";

  wingFindStr += "\nReact with any of the following emojis."
  wingFindStr += "\nEach emoji corresponds to an activity as listed below."
  wingFindStr += "\nChoose the activities that you would like to engage in with a wing."

  wingFindStr += "\n\n__**Activities**__\n"
  for(var i in wingMsgEmojisObj) {
    var activity = wingMsgEmojisObj[i].activity;
    var emoji = wingMsgEmojisObj[i].emoji
    if(emojis.includes(emoji)) {
      wingFindStr += "**" + activity + "** (" + emoji + ")";
      if((wingMsgEmojisObj.length - 1) != i) wingFindStr += " | ";
    } else {
      wingFindStr += activity + " (" + emoji + ")";
      if((wingMsgEmojisObj.length - 1) != i) wingFindStr += " | ";
    }
    if((parseInt(i) + 1) % 4 == 0) wingFindStr += "\n";
  }

  wingFindStr += "\n\nReact with this when you're done - ✅"

  wingFindStr += "\n***Note:*** *This message will only last for " + wingFindTimeout + " min(s).*";


  return wingFindStr;
}

module.exports = generateFindWingMessage;
