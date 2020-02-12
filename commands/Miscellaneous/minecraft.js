const mc = require('minecraft-server-util');
const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');

  module.exports = {
    config: {
      name: 'minecraft',
      aliases: ['mc', 'mcs'],
      usage: '!minecraft (server IP) (server port)',
      description: 'Displays the minecraft server you input.',
      category: 'Miscellaneous',
      accessableby: 'Users'      
    },
    
  run: async (client, message, args) => {
let embed = new RichEmbed()

  if(!args[0]) {
    embed.setDescription(`You need to provide a minecraft Server IP. (host)`)
    embed.setColor(red)
    return message.channel.send(embed)
  };
    
  if(!args[1]) {
    args[1] = 25565;
  /*
    embed.setDescription(`You need to provide a minecraft server port. 25565 is the default for most servers.`)
    embed.setColor(red)
    return message.channel.send(embed)
  */
  };

    
    mc(args[0], parseInt(args[1]), (error, res) =>{
      if(error) throw error;
      let fEmbed = new RichEmbed()
        .setColor(green)
        //.setThumbnail(res.favicon)
        .setTitle(`**${res.host}'s Server Information**`)
        .addField('[**__Server IP__**]', res.host, true)
        .addField('[**__Port__**]', res.port, true)
        .addField('[**__Protocol Version__**]', res.protocolVersion, true)
        .addField('[**__Version__**]', res.version, true)
        .addField('[**__Players Online__**],', res.onlinePlayers, true)
        .addField('[**__Max Players__**]', res.maxPlayers, true)
      
      return message.channel.send(fEmbed)
      })
    }
  }