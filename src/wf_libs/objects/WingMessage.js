// Libs
const generateWingMessage = require("../utils/generateWingMessage.js");
// DB models
const GuildData = require("../../models/guild_data.js");

class WingMessage {
  constructor(wing) {
    this.WING = wing;
    this.MESSAGES = [];
    this.create();
  }
  create() {
    var wing = this.WING;
    var guild = wing.GUILD
    var channel = wing.CHANNEL;
    var wingStr = generateWingMessage(wing);
    channel.send(wingStr).then(message => {
      this.MESSAGES.push(message);
      message.react("✅");
      message.react("❌");
    }).catch(err => {
      console.log(err);
    });
  }
  update() {
    var wing = this.WING;
    var messages = this.MESSAGES;
    var wingStr = generateWingMessage(wing);
    for(var i in messages) {
      messages[i].edit(wingStr);
    }
  }
}

module.exports = WingMessage;
