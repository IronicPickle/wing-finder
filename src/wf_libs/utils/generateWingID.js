// Libs
var randomString = require("./randomString.js");

function generateWingID() {
  while(true) {
    var wingID = randomString(10);
    if(wings.length == 0) {
      return wingID;
    }
    for(var i in wings) {
      if(wings[i].id != wingID) {
        return wingID;
      }
    }
  }
}

module.exports = generateWingID;
