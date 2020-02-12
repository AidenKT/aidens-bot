const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");
  module.exports = {
    config: {
      name: 'reverse',
      aliases: ['backwards'],
      usage: '!reverse (text or phrase)',
      description: 'Reverses a set of text',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
let invaildArgs = new RichEmbed()
  .setColor(red)
  .setDescription(`There needs to be more than 0 arguments. Usage: \`!reverse (text or phrase)\``)
  if(!args[0]) return message.channel.send(invaildArgs)
let text = args.join(" ");
    text = text.split("").reverse().join("");
let final = new RichEmbed()
  .setColor(red)
  .setDescription(text)
return message.channel.send(final)
    }
  }