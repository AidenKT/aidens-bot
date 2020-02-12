const { orange } = require("../../colors.json");
const { RichEmbed } = require("discord.js");

  module.exports = {
    config: {
      name: 'uptime',
      aliases: ['timeup'],
      usage: '!uptime',
      description: 'Displays the bot\'s uptime',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    function dur(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
      return `${days.padStart(1, '0')}d ${hrs.padStart(2, '0')}h ${min.padStart(2, '0')}m ${sec.padStart(2, '0')}s`
      }
    let embed = new RichEmbed()
      .setColor(orange)
      .setThumbnail(client.user.displayAvatarURL)
      .addField('[**__Uptime:__**]', `\`${dur(client.uptime)}\``, true)
      .addField('[**__Commands:__**]', `\`${client.commands.size} commands\``, true)
      .addField('[**__Client ID__**]', `\`${client.user.id}\``)
    message.channel.send(embed)
    }
  }