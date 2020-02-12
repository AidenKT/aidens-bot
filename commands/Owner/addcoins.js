const { RichEmbed } = require('discord.js');
const { orange, red } = require('../../colors.json');
const { hasPerms } = require("../../functions.js");
var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'addcoins',
      aliases: ['addmoney', 'addmoola'],
      usage: '^addcoins (@user) (amount to add)',
      description: 'For the bot owner to add coins to people.',
      category: 'Owner',
      accessableby: 'Bot Owner'      
    },
    
  run: async (client, message, args) => {
    
    if(hasPerms(message.author, "Owner", message)) {
      try {
        
let usr = message.mentions.members.first() || message.guild.members.get(args[0]);
const embed = new RichEmbed()
let jsonPath = path.join(__dirname, '..', '..','Users', usr.id);
    if ((fs.existsSync(jsonPath))) {
    let json = JSON.parse(fs.readFileSync(jsonPath))
  let coins = json.balance;
    if(coins === null) coins = 0;
        
        if(!usr || !args[0]) {
          embed.setColor(red)
          embed.setDescription(`I need a user to add coins too.`)
          
          return message.channel.send(embed);
        };
        
        if(!args[1] || isNaN(args[1])) {
          embed.setColor(red)
          embed.setDescription(`I need an amount to add to them. Or you didn't add a number.`)
          
          return message.channel.send(embed)
        };
        let bal = Number(args[1])
        json.balance += bal;
        json.name = usr.username;
        
        embed.setColor(orange)
        embed.setDescription(`That user has been given: **${args[1]} 𝓐**`)
                fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    };
});
        return message.channel.send(embed);
    }
            else
      {
        const embed = new RichEmbed()
        embed.setColor(red)
        embed.setDescription(`File does not exist. Please run !bal to generate a new account`);
        return message.channel.send(embed)
      }
      } catch(e) {
        const embed = new RichEmbed()
          .setColor(red)
          .setDescription(`Something went wrong! Here is the error:

          \`${e.message}\``)
        return message.channel.send(embed);
      };
      
    } else {
      if(!message.guild.me.hasPermission(["ADMINISTRATOR", "ADD_REACTIONS"])) return;
        return message.react("✅");
      };
    }
  }