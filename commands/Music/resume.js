const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json")

  module.exports = {
    config: {
    name: "resume",
    aliases: ["startagain", "start"],
    usage: ["^resume"],
    description: "Resumes the music",
    category: "Music",
    accessableby: 'Users'
    },
    
  run: async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id)
    if(!fetched) {
      let embed = new RichEmbed()
      .setColor(red)
      .setDescription(`${client.emojis.get('645467660229935135')} There is currently no queue running for this guild.`)
    return message.channel.send(embed)
      }
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
      let embed = new RichEmbed()
        .setColor(red)
        .setDescription(`${client.emojis.get('645467660229935135')} Connect to the same voicechannel as me to use this command.`)
      return message.channel.send(embed)
    }
    if(!fetched.dispatcher.paused) {
      let already = new RichEmbed()
        .setColor(orange)
        .setDescription(`${client.emojis.get('645467660229935135')} The music is already playing.`)
      return message.channel.send(already)
    }
    fetched.dispatcher.resume()
    let pausedS = new RichEmbed()
      .setColor(orange)
      .setDescription(`${client.emojis.get('645467627048665099')} Music has been resumed.`)
    return message.channel.send(pausedS)
    }
  }