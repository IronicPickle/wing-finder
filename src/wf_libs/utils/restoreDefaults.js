var GuildData = require("../../models/guild_data.js");

function restoreDefaults(guildID) {
  var data = new GuildData({guildID: guildID});
  data.save().then(function() {
    return true;
  }).catch(function(err) {
    console.log(err);
    return false;
  });

}

module.exports = restoreDefaults;
