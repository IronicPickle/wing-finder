// Console clear
process.stdout.write('\033c');
console.log(">\n> [Server] Starting Server\n>");

// Libraries
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
// Config
const config = require("./config/global.json");
// Prototypes
var prototypes = require("./wf_libs/prototypes.js");
prototypes.arrayPrototype();

// Database setup
mongoose.Promise = require("bluebird");
mongoose.connect(config.database.details.database, { // Connect to db
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((db) => {
  var host = db.connections[0].host;
  var port = db.connections[0].port;
  console.log("> [Database] Connection success. " + host + ":" + port);
}).catch((err) => {
  console.log("> [Database] Connection failed:");
  console.log(err);
});

// Port Setup
var listener = http.listen(process.env.PORT || config.main.port, () => {
  console.log("> [Server] Server started!");
});
// Discord client
const Discord = require("discord.js");
const client = new Discord.Client();
// Wing finder libs
const WingFinder = require("./wf_libs/index.js");
const prefix = config.discord.commands.prefix; // config var
// Global vars
wings = [];
wingFindMessages = [];
confirmReset = false;

WingFinder.registerCommands(registered => {

  // Client events
  client.on("ready", () => {
    console.log("> [Discord] Logged in as " + client.user.tag + "!");
  });

  client.on("guildCreate", guild => {
    WingFinder.restoreDefaults(guild.id);
  });

  client.on("message", msg => {
    WingFinder.onMessage(client, msg);
  });

  client.on("messageReactionAdd", (reaction, user) => {
    WingFinder.onReactionAdd(client, reaction, user);
  });

  client.on("messageReactionRemove", (reaction, user) => {
    WingFinder.onReactionRemove(client, reaction, user);
  });

  // Client login
  client.login("NjIyMjE1NjY5NTg4Njg4OTE3.XYEsHQ.owTmgY8xgNDmiLjFTYtn9XL6R7o");
});
