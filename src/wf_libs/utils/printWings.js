// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;

function printWings(channel) {
  var wingsStr = "**Available Wings:**\n";
  for(var i in wings) {
    var wing = wings[i];
    if(wing.STATUS) {
      wingsStr += "> **Wing ID: [" + wing.ID + "]**\n";
      wingsStr += "> Members: "
      var members = wing.MEMBERS;
      for(var i in members) {
        wingsStr += members[i].username;
        if((members.length - 1) != i) wingsStr += ", ";
      }
      wingsStr += "\n> Activities ";
      var activities = wing.ACTIVITIES;
      for(var i in activities) {
        var activity = activities[i]
        wingsStr += activity.activity + " (" + activity.emoji + ")";
        if((activities.length - 1) != i) wingsStr += " | ";
      }
      wingsStr += "\n";
    }
  }
  var openWings = wings.filter(obj => obj.STATUS);
  if(openWings.length > 0) {
    wingsStr += "Use ' " + prefix + "wing join [wing id] ' to join a specific wing."
  } else {
    wingsStr += "Sorry, no wings were found."
  }



  channel.send(wingsStr);
}

module.exports = printWings;
