// Libs
const removeFromCurrWing = require("../utils/removeFromCurrWing.js");
const Wing = require("../objects/Wing.js");

function matchUser(channel, user, guild, selected) {
  var filteredWings = wings.filter(obj => obj.GUILD == guild);
  var matchingWings = matchWings(filteredWings, selected, user);
  var bestMatchWing = bestMatch(matchingWings);

  removeFromCurrWing(user);

  if(bestMatchWing) {
    var wing = wings.find(obj => obj.ID == bestMatchWing.wingID);
    if(wing) {
      channel.send("<@" + user.id + ">, This is the best matching wing we could find.");
      wing.addMember(user);
      wing.MESSAGE.create();
    }
  } else {
    channel.send("<@" + user.id + ">, We couldn't find a wing for you, so we created one instead.");
    new Wing(channel, user, selected);
  }

}

function matchWings(filteredWings, selected, user) {
  var matchingWings = [];

  for(var i in filteredWings) {
    var wing = filteredWings[i];
    // Checks wing is open && checks wing has less than 4 members && checks user isn't in wing
    if(wing.STATUS && wing.MEMBERS.length < 4 && !wing.MEMBERS.includes(user)) {
      var activities = wing.ACTIVITIES;
      var matchingActivities = [];
      for(var ii in activities) {
        var activity = activities[ii];
        if(selected.includes(activity)) {
          matchingActivities.push(activity);
        }
      }
      if(matchingActivities.length > 0) {
        matchingWings.push({wingID: wing.ID, activities: matchingActivities});
      }
    }
  }
  return matchingWings;
}

function bestMatch(matchingWings) {
  var bestMatch = matchingWings[0];
  matchingWings.shift();
  for(var i in matchingWings) {
    var wing = matchingWings[i];
    var prevAct = bestMatch.activities;
    var currAct = wing.activities;

    if(currAct.length > prevAct.length) {
      bestMatch = wing;
    }
  }

  return bestMatch;
}

module.exports = matchUser;
