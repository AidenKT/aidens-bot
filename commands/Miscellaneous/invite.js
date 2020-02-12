const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'invite',
      aliases: ['invite', 'bot'],
      usage: '!invite',
      description: 'Displays the bot\'s latency',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    message.channel.send(`Getting you the invite...`).then(m => {
      let ping = 'Please send a message to Aiden#6656 regarding it.'
      let embed = new RichEmbed()
        .setColor(red)
        .setThumbnail(client.user.displayAvatarURL)
       // .setTitle(`Want Aiden's Bot in Your Server`)
        .addField('[**__Invite This Bot:__**]', `\`${ping}\``, true)

        
      m.delete()
      message.channel.send(embed)
      })
    }
  }
