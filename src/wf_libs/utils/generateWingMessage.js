// Vars
const config = require("../../config/global.json");
const wingTimeout = config.discord.timeouts.wing;

function generateWingMessage(wing) {
  var wingStr = "";
  wingStr += "> **Wing ID: [" + wing.ID + "]**\n";
  wingStr += "> Creator: <@" + wing.CREATOR.id + ">\n";
  wingStr += "> Created: " + wing.CREATED.toUTCString() + " (Lasts for: " + wingTimeout + " min(s))\n";

  wingStr += "> Activities: ";
  for(var i in wing.ACTIVITIES) {
    var activity = wing.ACTIVITIES[i].activity;
    var emoji = wing.ACTIVITIES[i].emoji
    wingStr += activity + " (" + emoji + ")";
    if((wing.ACTIVITIES.length - 1) != i) wingStr += " | ";
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
