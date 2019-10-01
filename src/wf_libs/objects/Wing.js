// Libs
const generateWingID = require("../utils/generateWingID.js");
const WingMessage = require("./WingMessage.js");
// Vars
const config = require("../../config/global.json");
const wingTimeout = config.discord.timeouts.wing;
// DB models
const GuildData = require("../../models/guild_data.js");

class Wing {
  constructor(channel, user, guild, activities) {
    this.ID = generateWingID();
    this.PREFIX = "**[" + this.ID + "]** ";
    this.GUILD = guild;
    this.CREATOR = user;
    this.CHANNEL = channel;
    this.MEMBERS = [user];
    this.ACTIVITIES = activities;
    this.CREATED = new Date();
    this.MESSAGE = new WingMessage(this);

    wings.push(this);
    this.pushUpdate();
    setTimeout(() => {
      this.close();
    }, 1000 * 60 * wingTimeout);
  }
  addMember(user) {
    this.CHANNEL.send(this.PREFIX + "<@" + user.id + "> has joined the wing!");
    this.MEMBERS.push(user);
    this.pushUpdate();
  }
  removeMember(user) {
    this.MEMBERS.splice(this.MEMBERS.indexOf(user), 1);
    // Checks if the wing has less than 1 member
    this.CHANNEL.send(this.PREFIX + "<@" + user.id + "> has left the wing!");
    if(this.MEMBERS.length <= 0) {
      this.close();
    } else {
      if(user == this.CREATOR) {
        this.CREATOR = this.MEMBERS[0];
        this.CHANNEL.send(this.PREFIX + "Mantle has been passed to <@" + this.MEMBERS[0].id + ">!");
      }
      this.pushUpdate();
    }
  }
  kickMember(user) {
    this.MEMBERS.splice(this.MEMBERS.indexOf(user), 1);
    // Checks if the wing has less than 1 member
    this.CHANNEL.send(this.PREFIX + "<@" + user.id + "> has been kicked from the wing!");
    this.pushUpdate();
  }
  pushUpdate() {
    this.MESSAGE.update();
  }
  close() {
    this.MEMBERS = [];
    wings.splice(wings.indexOf(this), 1);
    this.MESSAGE.deleteAll();
    this.CHANNEL.send(this.PREFIX + "wing closed!");
  }
}

module.exports = Wing;
