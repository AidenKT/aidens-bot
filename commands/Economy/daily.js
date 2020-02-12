const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');
const ms = require('parse-ms');
const client = require('discord.js')
var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'daily',
      aliases: ['dailybonus', 'bonus'],
      usage: '!daily',
      description: 'Daily Bonus: Only redeemable in the lounge, once a day.',
      category: 'Economy',
      accessableby: 'Users'      
    },
    
  run: async (client, message, args) => {
let timeout = 1000 * 60 * 60 * 24;
const embed = new RichEmbed()
let jsonPath = path.join(__dirname, '..', '..','Users', message.author.id);
let guildPath = path.join(__dirname, '..', '..','Servers', message.guild.id + ".json");
let guildjson;
    if (fs.existsSync(guildPath))  guildjson = JSON.parse(fs.readFileSync(guildPath))
    else guildjson = {allowdaily: "false"}
    if ((fs.existsSync(jsonPath))) {
    let json = JSON.parse(fs.readFileSync(jsonPath))
  let daily = json.daily;
        json.daily = Date.now(); 
     if (guildjson.allowdaily === "true") {
               if(daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))
      
          embed.setColor(red)
          embed.setDescription(`You can get your daily bonus in: \`${time.hours}h ${time.minutes}m ${time.seconds}s\`.`)
          
          return message.channel.send(embed).then(m => {m.delete(10000)})
      }
       //667838808611487784
        embed.setColor(green)
        embed.setDescription(`You have redeemed your daily bonus and recieved **7500 𝓐** as a part of the Valentines Event! Make sure to check announcements on Aiden's Lounge for more info!`)
        json.balance += 75000;
      }
  else message.channel.send(`Sorry, you can only get your daily bonus at https://invite.gg/aiden or https://discord.gg/RS4VceB`)
        fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    
    };
});
         
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