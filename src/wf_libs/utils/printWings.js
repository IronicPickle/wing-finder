
function printWings(channel) {
  var wingsStr = "**Available Wings:**\n";
  for(var i in wings) {
    var wing = wings[i];
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

  if(wings.length > 0) {
    wingsStr += "Use ' wf!wing join [wing id] ' to join a specific wing."
  } else {
    wingsStr += "Sorry, no wings were found."
  }



  channel.send(wingsStr);
}

module.exports = printWings;
