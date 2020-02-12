const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");

  module.exports = {
    config: {
      name: "queue",
      aliases: ["q", "upcoming"],
      usage: ["^queue"],
      description: "Displays the queue for the guild",
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
  let queue = fetched.queue;
  let np = queue[0];
    
    let res = ``;
    
      for ( var i = 1; i < queue.length; i++) {
        res += `**__[${i}]__** ${queue[i].songTitle} **|** ${queue[i].requester}\n`
      }
    let embed = new RichEmbed()
      .setColor(orange)
      .setDescription(`**Now playing:** \`${np.songTitle}\` **|** ${np.requester}\n

      **__[Queue:]__**\n${res}`)
      //.addField('[**__Queue:__**]', `${res}`, true)
    return message.channel.send(embed)
    }   
  }
