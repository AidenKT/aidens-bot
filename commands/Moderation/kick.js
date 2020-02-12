const { RichEmbed } = require('discord.js');
const { orange, red } = require('../../colors.json');

  module.exports = {
    config: {
      name: 'kick',
      aliases: ['k', 'kickuser'],
      usage: '^kick (@user | id) [reason]',
      description: 'Kicks a user from the guild.',
      category: 'Moderation',
      accessableby: 'Moderatior+'      
    },
    
  run: async (client, message, args) => {
const embed = new RichEmbed()
  if(!message.guild.me.hasPermission(['ADMINISTRATOR', 'KICK_MEMBERS'])) {
   embed.setColor(red)
   embed.setDescription(`${client.emojis.get('645467660229935135')} I don't have the correct permissions to kick that user!`)
    return message.channel.send(embed);
      };
    
  if(!message.member.hasPermission(['ADMINISTRATOR', 'KICK_MEMBERS']) || !message.guild.owner) return;
let toKick = message.mentions.members.first() || message.guild.members.get(args[0]);
let reason = args.slice(1).join(' ');
  if(!toKick || !args[0]) {
    embed.setColor(red)
    embed.setDescription(`${client.emojis.get('645467660229935135')} You must supply a user to kick. Usage: \`^kick (@user | id) [reason]\``)
    return message.channel.send(embed);
      };
  if(toKick === message.author) return;
  if(!reason) reason = 'No reason provided by moderator.';
    let final = new RichEmbed()
      .setColor(orange)
      .setDescription(`You've been kicked from: \`${message.guild.name}\` for the reason of: \`${reason}\``)
    toKick.send(final).catch().then(() => {
      message.delete().catch();
      toKick.kick([`${reason}`]).catch();
      
        embed.setColor(orange)
        embed.setDescription(`${client.emojis.get('645467627048665099')} ${toKick.user.tag} has been kicked successfully from the guild.`)
      message.channel.send(embed)
      })
    }
  }