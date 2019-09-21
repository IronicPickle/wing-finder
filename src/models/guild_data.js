const mongoose = require("mongoose");
const config = require("../config/global.json").discord.defaults;
// Article Schema
var guildDataSchema = mongoose.Schema({
  guildID: {
    type: String,
    require: true
  },
  claimed: {
    type: Boolean,
    require: true,
    default: config.claimed
  },
  activeChannel: {
    type: String,
    require: true,
    default: config.activeChannel
  },
  wingTimeout: {
    type: Number,
    require: true,
    default: config.wingTimeout
  },
  perms: {
    type: Object,
    require: true,
    default: config.perms
  }
}, {collection: "guild_data"});

var GuildData = module.exports = mongoose.model("GuildData", guildDataSchema);
