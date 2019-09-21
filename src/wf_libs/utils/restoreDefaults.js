var GuildData = require("../../models/guild_data.js");

function restoreDefaults(guildID) {
  var newGuild = new GuildData({guildID: guildID});
  GuildData.updateOne({guildID: guildID}, newGuild, {upsert: true}).exec().then(() => {
    return true;
  }).catch(function(err) {
    console.log(err);
    return false;
  });
}

module.exports = restoreDefaults;
