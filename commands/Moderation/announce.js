const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');

var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'announce',
      aliases: ['announcement'],
      usage: '!announce (whatever you want the bot to announce)',
      description: 'Says what you inputted in an agrument in a predefined announcement channel',
      category: "Moderation",
      accessableby: 'Administrators'
    },
    //Alright I have to go to my next class, cya.
  run: async (client, message, args) => {
  let error = client.emojis.get(':x:');
    let json = {announcement: "t", announcetitle: "t"}
  let jsonPath = path.join(__dirname, '..', '..','Servers', message.author.id + ".json");
      if ((fs.existsSync(jsonPath))) {
     json = JSON.parse(fs.readSync(jsonPath))
      }
  const embed = new RichEmbed()
  //If you are not an Admin, you can't do it
  if(!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR']) || !message.guild.owner) {
    embed.setColor(red)
    embed.setDescription(`You do not have the correct permissions to use this command! Must be an administrator.`)
    return message.channel.send(embed)
  }
    else {
      if (!args[1] || !args[0]) {
        embed.setColor(orange)
        embed.setDescription(`Invalid syntax. (Usage: !announce (Channel Name) (Title-of-announcement) (message))`)
      return message.channel.send(embed);
      }
    //Run announcement
    
  
  let text = args.slice(2).join(' ');
    
  if(!args[0]) {
    embed.setColor(green)
    embed.setDescription(`What would you like the announcement to say? (Usage: !announce (message))`)
    return message.channel.send(embed);
      }
    //message.delete().catch()
    let title = args[1].toString();
    title = title.replace(/-/g, " ");
    embed.setTitle(title)
    embed.setColor(green)
    embed.setFooter(`https://invite.gg/aiden`)
    embed.setDescription(text)
     let id = client.channels.get();
    return message.guild.channels.find(channel => channel.name === args[0]).send(embed);
    }
    }

  }