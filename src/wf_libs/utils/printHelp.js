// DB models
const RegisteredCommands = require("../../models/registered_commands");

function printPerms(channel, arg) {
  if(arg) {

    RegisteredCommands.find({}).then(registered => {
    if(!registered) throw new Error("No data returned!");
      var returnStr = "";
      var registeredCommand = registered.find(obj => obj.name == arg);
      if(registeredCommand) {
        var command = registeredCommand.object;
        returnStr += "__**Command Info**__";
        returnStr += "\nHelp: " + command.HELP + "\nUsage: " + command.USAGE;
        if(command.IS_SUB) {
          var children = command.CHILDREN;
          returnStr += "\n**__Sub-Commands__**\n";
          for(var ii in children) {
            var child = command.COMMAND + " " + children[ii];
            var subCommand = registered.find(obj => obj.name == child).object;
            var requiredGroup = subCommand.REQUIRED_GROUP;
            if(!subCommand.IS_SUB) returnStr += "> **> " + subCommand.USAGE + "** - "
            if(requiredGroup) returnStr += "(" + (requiredGroup.charAt(0).toUpperCase() + requiredGroup.slice(1)) + ") ";
            if(!subCommand.IS_SUB) returnStr += "*" + subCommand.HELP + "*\n";
          }
          returnStr += "";
        }
      } else {
        returnStr += "' " + arg + " ' is not a command.";
      }
      channel.send(returnStr);
    }).catch(err => {
      console.log(err);
      channel.send("An internal error has occurred.");
    });

  } else {

    RegisteredCommands.find({}).then(registered => {
      if(!registered) throw new Error("No data returned!");
      var mainStr = "";

      mainStr += "__**Available Commands**__\n";

      for(var i in registered) {
        var command = registered[i].object;
        var requiredGroup = command.REQUIRED_GROUP;
        if(!command.IS_SUB) mainStr += "> **> " + command.USAGE + "** - "
        if(requiredGroup) mainStr += "(" + (requiredGroup.charAt(0).toUpperCase() + requiredGroup.slice(1)) + ") ";
        if(!command.IS_SUB) mainStr += "*" + command.HELP + "*\n";
      }

      mainStr += "";
      channel.send(mainStr);
    }).catch(err => {
      console.log(err);
      channel.send("An internal error has occurred.");
    });
  }

}

module.exports = printPerms;
