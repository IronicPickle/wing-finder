// Vars
const config = require("../../config/global.json");
const prefix = config.discord.commands.prefix;
// DB models
const GuildData = require("../../models/guild_data.js");

class Order {
  constructor(args) {
    this.ARGS = args;
    this.COMMAND = "order";
    this.USAGE = prefix + this.COMMAND + " [pizza-type]";
    this.HELP = "Orders a pizza to your door. Types of pizza:\n"+
    ">                                                 __Pepperoni, Margarita, Meat Feast, Vegetarian & **semTex-Special**__";
    this.IS_SUB = false;
    this.REQUIRED_GROUP = null;
    this.RESTRICT_CHANNEL = false;
    if(args.length != 1) this.INVALID_USAGE = true;
  }
  exec(msg) {
    var channel = msg.channel;
    var pizza = this.ARGS[0];
    const pizzas = ["pepperoni", "margarita", "meat feast", "vegetarian", "semtex-special"];
    if(!pizzas.includes(pizza.toLowerCase())) {
      msg.reply("Where did you get that from? We don't serve " + pizza + " pizzas.");
      channel.send(
        "**Here's our menu:**\n"+
        "> Pepperoni - Cheese and pepperoni.\n"+
        "> Margarita - Cheese.\n"+
        "> Meat Feast - Cheese, Pepperoni, Meatballs, Chorizo and Ham.\n"+
        "> Vegetarian - Cheese, Peppers, Onions, Olives and Sweetcorn.\n"+
        "> semTex-Special - Whatever he decides."
      );
    } else {
      msg.reply("Your " + pizza + " pizza will be at your door as soon as we set up a pizza business.");
    }
  }
}

module.exports = Order;
