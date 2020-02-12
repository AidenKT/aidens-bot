const ms = require("parse-ms");
var fs = require("fs");
var path = require('path');
const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");

module.exports = {
  config: {
    name: "work",
    aliases: ["job"],
    usage: "!work",
    description: "A way to earn money",
    category: "Economy",
    accessableby: "Users"
  },

  run: async (client, message, args) => {
    let jsonPath = path.join(__dirname, '..', '..','Users', message.author.id);
    if ((fs.existsSync(jsonPath))) {
    let json = JSON.parse(fs.readFileSync(jsonPath))
    let usrBalance = json.work;
    if (usrBalance === null) usrBalance = 0;
    let timeout = 1800000; 

    let randomizer = Math.floor(Math.random() * 1000) + 1;
    if (json.work !== null && timeout - (Date.now() - json.work) > 0) {
      let time = ms(timeout - (Date.now() - json.work));
      let embed = new RichEmbed()
        .setColor(red)
        .setDescription(
          `You can work again in **${time.hours}h, ${time.minutes}m, and ${time.seconds}s**.`
        );
      return message.channel.send(embed);
    } else {
      json.work = Date.now();
      json.balance += randomizer;
      let e = new RichEmbed()
        .setColor(orange)
        .setDescription(`You earned a **${randomizer} 𝓐** paycheck.`);
          fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
      if (err) {
          message.channel.send(err);
          return;
      };
    });
      return message.channel.send(e);
    }
    }
              else
      {
        let embed = new RichEmbed()
        embed.setColor(red)
        embed.setDescription(`File does not exist. Please run !bal to generate a new account`);
        return message.channel.send(embed)
      }
  }
  

};
