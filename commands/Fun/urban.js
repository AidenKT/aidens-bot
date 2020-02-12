const u = require("urban");
const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");

  module.exports = {
    config: {
    name: 'urban',
    aliases: ['ud', 'urbandictionary'],
    usage: ['!urban search (word) | -urban random'],
    description: 'Sends the selected word from the urban dictonary',
    category: 'Fun',
    accessableby: 'Users',
    },
  run: async (client, message, args) => {
    let embed = new RichEmbed()
      if(!message.channel.nsfw) return message.channel.send(embed.setDescription('Run this command in a `NSFW` channel.').setColor(red));
      if(args < 1 || !['search', 'random'].includes(args[0])) return message.channel.send(embed.setDescription('Invaild Arguments. Usage: `-urban (search|random) (word)`').setColor(red));
    let udimage = 'http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium'
    let searchud = args[1] ? u(args.slice(1).join(" ")) : u.random()
    
      try {
        searchud.first(res => {
          if(!res) return message.channel.send(embed.setDescription('There\'s no such word as: ' + args.slice(1).join(" ") + ' in the urban dictionary.').setColor(red))
            let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;
            let wordEmbed = new RichEmbed()
              .setColor(orange)
              .setAuthor(`${word} | Urban Dictionary | Author: ${author || 'unknown author'}`, udimage)
              .setThumbnail(udimage)
              .setDescription(`
              **» Definition:** ${definition || 'No definition provided.'}

              **» Example:** ${example || 'No example provided.'}

              **» Link to post:** [${word}](${permalink || "https://www.urbandictionary.com/"})`)
              .setFooter(`👍 ${thumbs_up || 0} | 👎 ${thumbs_down || 0}`)
            return message.channel.send(wordEmbed)
        })
      } catch(e) {
        return message.channel.send('Something went wrong. Try again.')
      }
    }  
  }