function removeFromCurrWing(user, guild) {
  var filteredWings = wings.filter(obj => obj.GUILD == guild);
  var wing = filteredWings.find(obj => obj.MEMBERS.includes(user));
  if(wing) wing.removeMember(user);
}

module.exports = removeFromCurrWing;
