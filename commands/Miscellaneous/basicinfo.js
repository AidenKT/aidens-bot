const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");
const cpuStat = require("cpu-stat");
const envinfo = require("envinfo");
const os = require('os');

  module.exports = {
    config: {
      name: 'botinfo',
      aliases: ['basicinfo'],
      usage: '!botinfo',
      description: 'Bot\'s information',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    cpuStat.usagePercent(async function(err, percent, seconds) {
      var p = percent
    var t = p.toString().slice(0, 5)
    const inf = await envinfo.run({
        System: ['OS', 'CPU', 'Memory', 'Shell']
      }, { json: true})
      let { System } = JSON.parse(inf)
    let embed = new RichEmbed()
      .setColor(red)
      .setThumbnail(client.user.displayAvatarURL)
      .setTitle(`**Client Information**`)
      .addField('[**__Theme:__**]', '`Red v3.1 (#eb5931)`', true)
      .addField('[**__Client ID:__**]', `\`${client.user.id}\``, true).addField('[**__Version:__**]', '`v2`', true)
      .addField('[**__Memory Usage:__**]', `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / 512MB\``, true)
      .addField('[**__CPU Usage:__**]', `\`${t}%\``, true).addField('[**__OS:__**]', `\`${System.OS}\``, true)
      .addField('[**__Shard:__**]', '`Shard: N/A`', true)
      .addField('[**__Voice Connections__**]', `\`${client.voiceConnections.size} vcs\``, true).addField('[**__Users | Servers__**]', `\`${client.users.size} users | ${client.guilds.size} servers\``, true)
    message.channel.send(embed)
    })
    }
  }