const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');

  module.exports = {
    config: {
      name: 'say',
      aliases: ['speak', 'talk'],
      usage: '!say (whatever you want the bot to say)',
      description: 'Says what you inputted in an agrument.',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
  let error = client.emojis.get(':x:');
  const embed = new RichEmbed()
  
  if(!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR']) || !message.guild.owner) {
    embed.setColor(red)
    embed.setDescription(`You do not have the correct permissions to use this command! Must be an administrator.`)
    return message.channel.send(embed)
  }
    
  let text = args.slice(0).join(' ');
    
  if(!args[0]) {
    embed.setColor(red)
    embed.setDescription(`What would you like me to say? Usage: \`!say (whatever you want the bot to say)\``)
    return message.channel.send(embed);
      };
    message.delete().catch()
    
    embed.setColor(green)
    embed.setFooter(`Aiden's Lounge | https://invite.gg/aiden`)
    embed.setDescription(text)
    return message.channel.send(embed)
    }
  }