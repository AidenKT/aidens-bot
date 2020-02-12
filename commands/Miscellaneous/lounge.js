const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'lounge',
      aliases: ['support'],
      usage: '!lounge',
      description: 'Displays the bot\'s latency',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    message.channel.send(`Getting you the invite...`).then(m => {
      let ping = 'https://invite.gg/aiden'
      let embed = new RichEmbed()
        .setColor(red)
        .setThumbnail(client.user.displayAvatarURL)
       // .setTitle(`Here you are!`)
        .addField('[**__Invite:__**]', `\`${ping}\``, true)

        
      m.delete()
      message.channel.send(embed)
      })
    }
  }
