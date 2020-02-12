const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'avatar',
      aliases: ['av', 'pfp', 'profilepic'],
      usage: '!av [@user | id]',
      description: 'Displays a users avatar',
      category: 'Miscellaneous',
      accessableby: 'Users'

    },
    
  run: async (client, message, args) => {
let m = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!args[0]) {
let e = new RichEmbed()
  .setColor(red) 
  .setURL(message.author.displayAvatarURL)
  .setAuthor(`${message.author.tag}'s Avatar`, message.author.displayAvatarURL)
  .setImage(message.author.displayAvatarURL)
return message.channel.send(e)
} else {
let embed = new RichEmbed()
  .setColor(red)
  .setURL(m.user.displayAvatarURL)
  .setAuthor(`${m.user.tag}'s Avatar`, m.user.displayAvatarURL)
  .setImage(m.user.displayAvatarURL)
return message.channel.send(embed)
      }
    }
  }