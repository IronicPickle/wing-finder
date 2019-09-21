module.exports = {
  getCommand: require("./utils/getCommand.js"),
  registerCommands: require("./utils/registerCommands.js"),
  restoreDefaults: require("./utils/restoreDefaults.js"),

  onMessage: require("./event_handlers/onMessage.js"),
  onReactionAdd: require("./event_handlers/onReactionAdd.js"),
  onReactionRemove: require("./event_handlers/onReactionRemove.js")
}
