// Vars
const config = require("../../config/global.json");
const wingTimeout = config.discord.timeouts.wing;

function generateWingMessage(wing) {
  var wingStr = "";
  wingStr += "> **Wing ID: [" + wing.ID + "]**\n";
  wingStr += "> Status: " + ((wing.STATUS) ? "Open" : "Closed") + "\n";
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
  if(wing.STATUS) {
    wingStr += "> \n> React with ✅ to join this wing.\n";
    wingStr += "> React with ❌ to leave this wing.";
  } else {
    wingStr += "> \n> This wing has expired.\n";
  }
  return wingStr;
}

module.exports = generateWingMessage;
