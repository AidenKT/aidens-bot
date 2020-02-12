const { RichEmbed } = require('discord.js');
const { orange, red } = require('../../colors.json');
const ms = require('parse-ms');
var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'beg',
      aliases: ['gimmemoney', 'begging'],
      usage: '!beg',
      description: 'That\'s one way to do that.',
      category: 'Economy',
      accessableby: 'Users'      
    },
    
  run: async (client, message, args) => {
let timeout = 1800000 / 2;
let amt = Math.floor(Math.random() * 1000) + 1;
const embed = new RichEmbed()
let jsonPath = path.join(__dirname, '..', '..','Users', message.author.id);
    if ((fs.existsSync(jsonPath))) {
    let json = JSON.parse(fs.readFileSync(jsonPath))
  let beg = json.beg;
        if(beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg))
      
          embed.setColor(red)
          embed.setDescription(`You can beg again in: \`${time.hours}h ${time.minutes}m ${time.seconds}s\`.`)
          
          return message.channel.send(embed).then(m => {m.delete(10000)})
      } else {
        json.beg = Date.now();
        
        embed.setColor(orange)
        embed.setDescription(`The Aiden Gods decided to donate you **${amt} 𝓐**`)
        json.balance += amt;
        json.name = message.author.username
        fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    };
});
      }   
        return message.channel.send(embed)
      }
    else
      {
        const embed = new RichEmbed()
        embed.setColor(red)
        embed.setDescription(`File does not exist. Please run !bal to generate a new account`);
        return message.channel.send(embed)
      }
    }
  }