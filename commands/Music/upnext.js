const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'upnext',
      aliases: ['un', 'nn'],
      usage: '^upnext',
      description: 'Displays the song playing after the song',
      category: 'Music',
      accessableby: 'Users'
    },
    
  run: async (client, message, args, ops) => {
let fetched = ops.active.get(message.guild.id);
  if(!fetched) {
    let embed = new RichEmbed()
      .setColor(red)
      .setDescription(`${client.emojis.get('645467660229935135')} There is currently no queue running for this guild.`)
    return message.channel.send(embed)
  }
    let queue = fetched.queue;
if(!queue[1]) {
  let embed = new RichEmbed()
    .setColor(red)
    .setDescription(`${client.emojis.get('645467660229935135')} There's no song up next.`)
  return message.channel.send(embed)
}
    let embed = new RichEmbed()
      .setColor(orange)
      .setThumbnail(queue[0].thumbnail)
      .addField('[**__Next Song:__**]', `\`${queue[1].songTitle}\``, true)
      .addField('[**__Requester:__**]', `\`${queue[1].requester}\``, true)
    return message.channel.send(embed)

    }
  }