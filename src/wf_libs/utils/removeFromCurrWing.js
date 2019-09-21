function removeFromCurrWing(user) {
  var wing = wings.find(obj => obj.MEMBERS.includes(user));
  if(wing) wing.removeMember(user);
}

module.exports = removeFromCurrWing;
