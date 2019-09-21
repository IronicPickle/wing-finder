// Libs
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
const getCommand = require("./getCommand.js");
const commandIndex = require("../commands/index.js");
// DB models
const RegisteredCommands = require("../../models/registered_commands");

// Registered commands
var registered = [];

function registerCommands(callback) {

  for(var i in commandIndex) {
    commandIndex[i].children = {};
    try {
      commandIndex[i].children =require("../commands/"+i+"/index.js");
    } catch(err) {}
  }

  for(var i in commandIndex) {
    var children = commandIndex[i].children;
    register(i);
    for(var ii in children) {
      register(i + " " + ii);
    }
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

function register(input) {
  getCommand(prefix + input, (command, err) => {
    registered.push({name: input, object: command});
  });
}

module.exports = registerCommands;
