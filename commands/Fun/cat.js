const { RichEmbed } = require("discord.js");
const { orange } = require("../../colors.json");
const f = require('node-fetch');

  module.exports = {
    config: {
    name: 'cat',
    aliases: ['kitty', 'kit', 'catty-cat', 'kitten'],
    usage: ['!cat'],
    description: 'Sends a cat picture',
    category: 'Fun',
    accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    f('http://aws.random.cat/meow')
      .then(res => res.json()).then(body => {
          if(!body) return message.channel.send('Image couldn\'t be received. Try again.')
        let cEmbed = new RichEmbed()
          .setColor(orange)
          .setImage(body.file)
        message.channel.send(cEmbed)
      })
    }
  }