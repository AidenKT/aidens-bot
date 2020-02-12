const s = require("yt-search")
const { RichEmbed } = require("discord.js")
const { orange } = require("../../colors.json")
 
  module.exports = {
    config: {
      name: "search",
      aliases: ['find'],
      usage: '^play (song name)',
      description: 'Searching for the play command.',
      category: 'Music',
      accessableby: 'Users'      
    },
    
  run: async (client, message, args, ops) => {
    s(args.join(' '), async function(err, res) {
    if(err) return message.channel.send(`Something went wrong mate. Talk to Aiden please.`)
      let videos = res.videos.slice(0,10)
      let resp = ``;
        
        for ( var i in videos ) {
          resp += `[${parseInt(i)+2}] \`${videos[i].title}\`\n`
        }
    
          let embed = new RichEmbed()
            .setTitle(`🔎 Search results for: **${args.join(' ')}**`)
            .setColor(orange)
            .setThumbnail(client.user.displayAvatarURL)
            .setDescription(resp)
            .setFooter('Pick a number between 1-10. This will cancel in 20 seconds.')
        //resp += `\nChoose a number bewtween 1-${videos.length}`
        message.channel.send(embed)
//    const filter = m => !isNaN(m.content) && m.content < videos.length && m.content > 0;
const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
    const collector = message.channel.createMessageCollector(filter, { time: 20000});
    
    collector.videos = videos
    collector.on('collect', async function(m) {
      let commandFile = require("./play.js")
      commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops)
      
      
        })
      
      collector.on('end', async () => {
        return message.channel.send('Time has ended. Music collector stopped.')
      })
      }) 
    }
  }