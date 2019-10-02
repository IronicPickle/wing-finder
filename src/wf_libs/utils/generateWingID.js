// Libs
const { uniqueNamesGenerator } = require("unique-names-generator");

function generateWingID() {

  while(true) {
    var name1 = uniqueNamesGenerator({length: 1});
    var name2 = uniqueNamesGenerator({length: 1});
    var wingID = name1.charAt(0).toUpperCase() + name1.slice(1) +
                 name2.charAt(0).toUpperCase() + name2.slice(1);

    var wing = wings.find(obj => obj.ID == wingID);
    if(!wing) return wingID;
  }
}

module.exports = generateWingID;
