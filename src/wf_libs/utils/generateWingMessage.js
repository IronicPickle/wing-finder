// Vars
const config = require("../../config/global.json");
const wingTimeout = config.discord.timeouts.wing;
const emojiSourceID = config.discord.emojis.sourceID;

function generateWingMessage(wing) {
  var client = wing.CLIENT;
  var sourceGuild = client.guilds.get(emojiSourceID);
  if(!sourceGuild) return;

  var wingStr = "";
  wingStr += "> **Wing ID: [" + wing.ID + "]**\n";
  wingStr += "> Creator: <@" + wing.CREATOR.id + ">\n";
  wingStr += "> Created: " + wing.CREATED.toUTCString() + " (Lasts for: " + wingTimeout + " min(s))\n";

  wingStr += "> Activities: ";
  for(var i in wing.ACTIVITIES) {
    var activity = wing.ACTIVITIES[i].activity;
    var emoji = sourceGuild.emojis.get(wing.ACTIVITIES[i].emoji);
    if(!emoji) {
      throw new Error("No emoji found");
    } else {
      wingStr += activity + " (" + emoji + ")";
      if((wing.ACTIVITIES.length - 1) != i) wingStr += " | ";
    }
  }
  wingStr += "\n> Members:\n";
  for(var i in wing.MEMBERS) {
    wingStr += "> <@" + wing.MEMBERS[i].id + ">\n";
  }
  wingStr += "> \n> React with ✅ to join this wing.\n";
  wingStr += "> React with ❌ to leave this wing.";
  return wingStr;
}

module.exports = generateWingMessage;
