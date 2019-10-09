// Libs
const Wing = require("../objects/Wing.js");
const generateFindWingMessage = require("../utils/generateFindWingMessage.js");
const matchUser = require("../utils/matchUser.js");
const removeFromCurrWing = require("../utils/removeFromCurrWing.js");
// Vars
const vars = require("../vars.js");
const wingMsgEmojisArr = vars.wingMsgEmojisArr;
const wingMsgEmojisObj = vars.wingMsgEmojisObj;
const config = require("../../config/global.json");
const wingFindTimeout = config.discord.timeouts.wingFind;
const emojiSourceID = config.discord.emojis.sourceID;
// DB models
const GuildData = require("../../models/guild_data.js");

class WingFindMessage {
  constructor(client, user, channel, guild, override) {
    this.CLIENT = client;
    this.GUILD = guild;
    this.USER = user;
    this.CHANNEL = channel;
    this.MESSAGE = null;
    this.EMOJIS = [];
    this.OVERRIDE = override;
    wingFindMessages.push(this);
    this.create();
    setTimeout(() => {
      this.close();
    }, 1000 * 60 * wingFindTimeout);
  }
  create() {
    var user = this.USER;
    var channel = this.CHANNEL;
    var sourceGuild = this.CLIENT.guilds.get(emojiSourceID);
    if(!sourceGuild) return;
    var wingFindStr = generateFindWingMessage(this.CLIENT, user, []);

    channel.send(wingFindStr).then(message => {
      this.MESSAGE = message;
      message.react("✅").then(() => {
        for(var i in wingMsgEmojisArr) {
          var emoji = sourceGuild.emojis.get(wingMsgEmojisArr[i]);
          if(!emoji) {
            throw new Error("No emoji found");
          } else {
            message.react(emoji).catch(() => {});
          }
        }
      })
    }).catch(err => {
      console.log(err);
      channel.send("An internal error has occurred.");
    });
  }
  update() {
    var user = this.USER;
    var wingFindStr = generateFindWingMessage(this.CLIENT, user, this.EMOJIS);

    this.MESSAGE.edit(wingFindStr);
  }
  close() {
    var client = this.CLIENT;
    var guild = this.GUILD;
    var user = this.USER;
    var channel = this.CHANNEL;
    var message = this.MESSAGE;
    var override = this.OVERRIDE;
    if(wingFindMessages.includes(this)) {
      wingFindMessages.splice(wingFindMessages.indexOf(this), 1);
      message.delete().then(() => {
        var emojis = this.EMOJIS;
        if(emojis.length <= 0) {
          if(override) {
            user.send("Wing create cancelled - You didn't select any activities.");
          } else {
            user.send("Wing find cancelled - You didn't select any activities.");
          }
        } else {
          var selected = wingMsgEmojisObj.filter(obj => emojis.includes(obj.emoji));
          if(override) {
            removeFromCurrWing(user, guild);
            new Wing(client, channel, user, guild, selected);
          } else {
            matchUser(client, channel, user, guild, selected);
          }
        }
      }).catch(err => {
        console.log(err);
        channel.send("An internal error has occurred.");
      });
    }
  }
}

module.exports = WingFindMessage;
