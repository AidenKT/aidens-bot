const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");
const cpuStat = require("cpu-stat");
const envinfo = require("envinfo");
const os = require('os');

  module.exports = {
    config: {
      name: 'stats',
      aliases: ['statistics'],
      usage: '!stats',
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
      .setTitle(`**Statistics**`)
      .addField('**• Users:**', `\`${client.users.size} users \``, true)
      .addField('**• Channels:**', `\`${client.channels.size} channels\``, true)
      .addField('**• Servers:**', `\`${client.guilds.size} servers\``, true)
      .addField('**• RAM Usage:**', `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / 512MB\``, true)
      .addField('**• API Latency Time:**', `\`${Math.round(client.ping)}MS\``, true)
      .addField('**• Current Voice Connections**', `\`${client.voiceConnections.size} vcs\``)
      .setFooter(`Aiden's Lounge | https://invite.gg/aiden`)
    message.channel.send(embed)
    })
    }
  }
