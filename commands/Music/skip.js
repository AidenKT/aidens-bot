const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json")

  module.exports = {
    config: {
      name: "skip",
      aliases: ["next", "nextsong"],
      usage: ["^skip"],
      description: "Skips the song",
      category: "Music",
      accessableby: 'Users'
    },
    
  run: async (client, message, args, ops) => {
let fetched = ops.active.get(message.guild.id);
  if(!fetched) {
    let embed = new RichEmbed()
      .setColor(red)
      .setDescription(`There is currently no queue running for this guild.`)
    return message.channel.send(embed)
      }
    let queue = fetched.queue;
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
      let embed = new RichEmbed()
        .setColor(red)
        .setDescription(`Connect to the same voicechannel as me to use this command.`)
      return message.channel.send(embed)
      }
    
      try {
        let embed = new RichEmbed()
          .setColor(orange)
          .setDescription(`Skipped song sucessfully.`)
        message.channel.send(embed)
        return fetched.dispatcher.emit('end')
      } catch(e) {
        let embed = new RichEmbed()
          .setColor(red)
          .setDescription(`Something went wrong! Try again.`)
        return message.channel.send(embed)
      }
    }
  }