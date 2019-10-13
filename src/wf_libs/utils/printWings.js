// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
const emojiSourceID = config.discord.emojis.sourceID;

function printWings(client, channel, guild) {
  var sourceGuild = client.guilds.get(emojiSourceID);
  if(!sourceGuild) return;

  var filteredWings = wings.filter(obj => obj.GUILD == guild);
  var wingsStr = "**Available Wings:**\n";
  for(var i in filteredWings) {
    var wing = filteredWings[i];
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
      wingsStr += activity.activity + " (" + sourceGuild.emojis.get(activity.emoji) + ")";
      if((activities.length - 1) != i) wingsStr += " | ";
    }
    wingsStr += "\n";
  }
  if(filteredWings.length > 0) {
    wingsStr += "Use ' " + prefix + "wing join [wing id] ' to join a specific wing."
  } else {
    wingsStr += "Sorry, no wings were found."
  }



  channel.send(wingsStr);
}

module.exports = printWings;
