const { RichEmbed } = require("discord.js");
const { orange } = require("../../colors.json");
const f = require("node-fetch");

  module.exports = {
    config: {
    name: 'dog',
    aliases: ['doggo', 'puppy', 'pupers', 'doggy'],
    usage: ['!dog'],
    description: 'Sends a dog picture',
    category: 'Fun',
    accessableby: 'Users'
    },

  run: async (client, message, args) => {
    f('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json()).then(body => {
        if(!body) return message.channel.send('Image couldn\'t be received. Try again.')
      let dEmbed = new RichEmbed()
        .setColor(orange)
        .setImage(body.message)
      message.channel.send(dEmbed)
      })
    }
  }