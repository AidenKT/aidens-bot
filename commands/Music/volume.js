const { RichEmbed } = require('discord.js');
const { orange, red } = require('../../colors.json');
  
  module.exports = {
    config: {
      name: "volume",
      aliases: ["vol", "v"],
      usage: ["^volume (0-200)"],
      description: "Changes the volume of the music",
      category: "Music",
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
  if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
      let embed = new RichEmbed()
        .setColor(red)
        .setDescription(`${client.emojis.get('645467660229935135')} Connect to the same voicechannel as me to use this command.`)
      return message.channel.send(embed)
      }
    if(isNaN(args[0]) || args[0] > 200 || args[0] < 1) { 
      let embed = new RichEmbed()
        .setColor(red)
        .setDescription(`${client.emojis.get('645467660229935135')} Input a number between 1-200`)
      return message.channel.send(embed)
      }
    fetched.dispatcher.setVolume(args[0]/100)
    let embed = new RichEmbed()
      .setColor(orange)
      .setTitle(`${client.emojis.get('645467627048665099')} **Success!**`)
      .setThumbnail(client.user.displayAvatarURL)
      .addField('[**__Volume set to:__**]', `**${args[0]}/200**`, true)
    return message.channel.send(embed)
    }
  }