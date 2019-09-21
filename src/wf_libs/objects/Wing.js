// Libs
const generateWingID = require("../utils/generateWingID.js");
const WingMessage = require("./WingMessage.js");
// Vars
const config = require("../../config/global.json");
const wingTimeout = config.discord.timeouts.wing;
// DB models
const GuildData = require("../../models/guild_data.js");

class Wing {
  constructor(channel, user, activities) {
    this.ID = generateWingID();
    this.STATUS = true;
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
    this.MEMBERS.push(user);
    this.pushUpdate()
  }
  removeMember(user) {
    this.MEMBERS.splice(this.MEMBERS.indexOf(user), 1)
    // Checks if the wing has less than 1 member
    if(this.MEMBERS.length <= 0) this.close();
    this.pushUpdate();
  }
  pushUpdate() {
    this.MESSAGE.update();
  }
  close() {
    if(this.STATUS) {
      this.STATUS = false;
      this.MEMBERS = [];
      //wings.splice(wings.indexOf(this), 1);
      this.MESSAGE.update();
    }
  }
}

module.exports = Wing;
