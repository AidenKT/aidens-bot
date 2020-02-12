const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'deletequeue',
      aliases: ['delqueue', 'delq', 'deleteq'],
      usage: '^deletequeue',
      description: 'Deletes the current queue and leaves the voice channel.',
      category: 'Music',
      accessableby: 'Guild Owners | Administrator+'
    },
  
  run: async (client, message, args, ops) => {
let fetched = ops.active.get(message.guild.id);
  if(!fetched) {
    let embed = new RichEmbed()
      .setColor(red)
      .setDescription(`${client.emojis.get('645467660229935135')} There is currently no queue running for this guild.`)
    return message.channel.send(embed)
  }
  if(!message.member.hasPermission(['ADMINISTRATOR', 'MANAGE_GUILD']) || !message.guild.owner) {
    let embed = new RichEmbed()
      .setColor(red)
      .setDescription(`${client.emojis.get('645467660229935135')} You cannot preform this action due to invaild permissions.`)
    return message.channel.send(embed)
  } 
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
      let embed = new RichEmbed()
        .setColor(red)
        .setDescription(`${client.emojis.get('645467660229935135')} Connect to the same voicechannel as me to use this command.`)
      return message.channel.send(embed)
      }
    
      try {
        let embed = new RichEmbed()
          .setColor(orange)
          .setDescription(`${client.emojis.get('645467627048665099')} Queue has been cleared. I will be leaving now.`)
        fetched.dispatcher.emit('end')
        ops.active.delete(message.guild.id)
//        fetched.dispatcher.emit('end')
        message.guild.me.voiceChannel.leave()
        return message.channel.send(embed)
      } catch(e) {
        let embed = new RichEmbed()
          .setColor(red)
          .setDescription(`${client.emojis.get('645467660229935135')} Something went wrong!`)
        return message.channel.send(embed)
      }
    }
  }