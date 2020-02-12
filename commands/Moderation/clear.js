const { RichEmbed } = require('discord.js')
const { orange, red, green } = require('../../colors.json');

  module.exports = {
    config: {
      name: 'clear',
      aliases: [],
      usage: '!clear (messages)',
      description: 'Clears a certain amount of messages',
      category: 'Moderation',
      accessableby: 'Moderator+'
    },
    
  run: async (client, message, args) => {
const embed = new RichEmbed()
  if(!message.member.hasPermission(['ADMINISTRATOR', 'MANAGE_MESSAGES']) || !message.guild.owner) return;
  if(!message.guild.me.hasPermission(['ADMINISTRATOR', 'MANAGE_MESSAGES'])) {
    embed.setColor(red)
    embed.setDescription(`I don't have the correct permissions to execute this command.`)
      return message.channel.send(embed);
      };
  if(!args[0]) {
    embed.setColor(red)
    embed.setDescription(`Please supply an amount of messages to delete.`)
      return message.channel.send(embed);
  };
   let messagecount = parseInt(args[0]) || 1;
    message.channel.bulkDelete(messagecount + 1)
    
    embed.setColor(green)
    embed.setDescription(`Deleted ${args[0]} ${args[0] === 0 ? 'message' : 'messages'}`)
    return message.channel.send(embed).then(m => {m.delete(10000)})
    }
  }