const mongoose = require("mongoose");
// Article Schema
var registeredCommandsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  object: {
    type: Object,
    require: true
  }
}, {collection: "registered_commands"});

var RegisteredCommands = module.exports = mongoose.model("RegisteredCommands", registeredCommandsSchema);
