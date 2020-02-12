const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');
const ms = require('parse-ms');
var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'crime',
      aliases: ['illegal', 'steal'],
      usage: '!crime',
      description: 'One way to earn money.',
      category: 'Economy',
      accessableby: 'Users'      
    },
    
  run: async (client, message, args) => {
let r1 = Math.floor(Math.random() * 2) + 1;
let timeout = 1800000;
let amt = Math.floor(Math.random() * 1000) + 1000;
let embed = new RichEmbed()
let jsonPath = path.join(__dirname, '..', '..','Users', message.author.id);
    if ((fs.existsSync(jsonPath))) {
    let json = JSON.parse(fs.readFileSync(jsonPath))
  if(json.hour4 !== null && timeout - (Date.now() - json.hour4) > 0) {
let time = ms(timeout - (Date.now() - json.hour4))
  
  embed.setColor(red)
  embed.setDescription(`You can commit a crime again in **${time.hours}h, ${time.minutes}m, and ${time.seconds}s**.`)
    // 𝓐
    return message.channel.send(embed);
      } else {
        if(r1 === 2) {
          json.balance += amt;
          json.hour4 = Date.now();
          
          embed.setColor(green)
          embed.setDescription(`You were successful and you earned: **${amt} 𝓐**.`)
                  fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    };
});
          return message.channel.send(embed);
        } else {
          json.hour4 = Date.now();
          json.balance -= 1500;
          
          embed.setColor(red)
          embed.setDescription(`You were caught and you had to pay: **1500 𝓐**`)
        fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    };
});
          return message.channel.send(embed);
        };
        
      };
    }
        else
      {
        embed.setColor(red)
        embed.setDescription(`File does not exist. Please run !bal to generate a new account`);
        return message.channel.send(embed)
      }
  }
  }