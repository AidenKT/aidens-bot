const { RichEmbed } = require("discord.js");
const { orange } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'ping',
      aliases: ['latency', 'ms'],
      usage: '!ping',
      description: 'Displays the bot\'s latency',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    message.channel.send(`Pinging...`).then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp
      let embed = new RichEmbed()
        .setColor(orange)
        .setThumbnail(client.user.displayAvatarURL)
       // .setTitle(`🏓 | Ping-pong!`)
        .addField('[**__Bot Latency:__**]', `\`${ping}MS\``, true)
        .addField('[**__API Response Time:__**]', `\`${Math.round(client.ping)}MS\``, true)
        .addField('[**__Client ID__**]', `\`${client.user.id}\``)
        
      m.delete()
      message.channel.send(embed)
      })
    }
  }
