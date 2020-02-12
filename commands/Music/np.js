const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'nowplaying',
      aliases: ['np', 'playing'],
      usage: '^nowplaying',
      description: 'Displays the song currently playing',
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

    let embed = new RichEmbed()
      .setColor(orange)
//      .setThumbnail(queue[0].thumbnail)
      .addField('[**__Now Playing:__**]', `\`${queue[0].songTitle}\``, true)
      .addField('[**__Requester:__**]', `\`${queue[0].requester}\``, true)
    return message.channel.send(embed)

    }
  }