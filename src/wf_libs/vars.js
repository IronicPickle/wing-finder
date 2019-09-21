const wingMsgEmojisObj = [
  {activity: "Couriering/Trading", emoji: "🚚"},
  {activity: "Exploration", emoji: "🔭"},
  {activity: "Mining", emoji: "🔨"},
  {activity: "BGS (Faction/Squadron Activities)", emoji: "📈"},
  {activity: "Generic Combat", emoji: "🔪"},
  {activity: "Bounty Hunting", emoji: "💰"},
  {activity: "Anti-Xeno", emoji: "👽"}
].sort();
const wingMsgEmojisArr = ["🚚", "🔭", "🔨", "📈", "🔪", "💰", "👽"].sort();
const wingEmojisArr = ["✅", "❌"].sort();

module.exports = { wingMsgEmojisObj, wingMsgEmojisArr, wingEmojisArr }
