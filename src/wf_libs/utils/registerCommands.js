// Libs
const getCommand = require("./getCommand.js");
const commandIndex = require("../commands/index.js");
// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const RegisteredCommands = require("../../models/registered_commands");

// Registered commands
var registered = [];

function registerCommands(callback) {

  for(var i in commandIndex) {
    commandIndex[i].children = {};
    try {
      commandIndex[i].children = require("../commands/"+i+"/index.js");
    } catch(err) {}
  }

  for(var i in commandIndex) {
    var children = commandIndex[i].children;
    var childrenArray = [];
    for(var ii in children) {
      childrenArray.push(ii);
      register(i + " " + ii);
    }
    register(i, childrenArray);
  }

  RegisteredCommands.deleteMany({}).exec().then(() => {
    RegisteredCommands.insertMany(registered).then((newRegistered) => {
      var commandStr = "";
      for(var i in newRegistered) {
        commandStr += newRegistered[i].name + ", ";

      }
      console.log("> [WingFinder] Registered Commands: " + commandStr);
      callback(newRegistered);
    }).catch(err => {
      console.log(err);
    });
  }).catch(err => {
    console.log(err);
  })

}

function register(input, children) {
  getCommand(prefix + input, (command, err) => {
    command.CHILDREN = children;
    registered.push({name: input, object: command});
  });
}

module.exports = registerCommands;
