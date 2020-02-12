const hb = require('hastebin-gen');
const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');

  module.exports = {
    config: {
      name: 'hastebin',
      aliases: ['hb', 'haste'],
      usage: '!hastebin (text/code)',
      description: 'Creates a hastebin without you even having to go to the web!',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
  
 run: async (client, message, args) => {
let text = args.slice(0).join(' ');
let type = args.slice(1).join(' ');
const embed = new RichEmbed()
    if(!args[0]) {
      embed.setColor(red)
      embed.setDescription('What would you like in a hastebin? Usage: `!hastebin (text/code)`')
      return message.channel.send(embed);
    };
    
  try {
    message.delete().catch()
    
    hb(text).then(r => {
    embed.setColor(orange)
    embed.setAuthor(`${message.author.tag}'s Hastebin:`, message.author.displayAvatarURL)
    embed.setDescription(`**[Hastebin Link](${r})**`)
    embed.setTimestamp()
    embed.setFooter(`Hastebin | `)
      return message.channel.send(embed)
    })
  } catch(e) {
    embed.setColor(red)
    embed.setDescription(`Something went wrong! Try again later.`)
    return message.channel.send(embed)
      }
    }
  }