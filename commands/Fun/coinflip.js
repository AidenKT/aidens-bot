const { RichEmbed } = require("discord.js");
const { orange } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'coinflip',
      aliases: ['cf', 'flipacoin'],
      usage: '!coinflip',
      description: 'Flips a coin',
      category: 'Fun',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
  let coinSides = ['Heads', 'Tails', 'Tails', 'Heads'];
  let final = coinSides[Math.floor(Math.random() * coinSides.length)];
  let embed = new RichEmbed()
    .setColor(orange)
    .setAuthor('I flipped a coin, and got:', 'https://cdn.discordapp.com/attachments/645729612122292247/645783708590276609/free-coin-icon-794-thumb.png')
    .setDescription(final)
  message.channel.send(embed)
    }
  }