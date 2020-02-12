const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');
const { promptMessage } = require("../../functions.js");
const db = require("quick.db");

  module.exports = {
    config: {
      name: 'poll',
      usage: '!poll (title) (reactAmount) [reactions] (message)',
      description: 'Creates a poll.',
      category: "Moderation",
      accessableby: 'Administrators'
    },
  run: async (client, message, args) => {
  let error = client.emojis.get(':x:');
  const embed = new RichEmbed()
  //If you are not an Admin, you can't do it
  if(!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR']) || !message.guild.owner) {
    embed.setColor(red)
    embed.setDescription(`You do not have the correct permissions to use this command! Must be an administrator.`)
    return message.channel.send(embed)
  }
    
    else if(!args[0]) {
    embed.setColor(green)
    embed.setDescription(`What would you like the announcement to say? (Usage: !poll (title) (reactAmount) [reactions] (message))`)
    return message.channel.send(embed);
      }
      else {
              let title = args[0];
    //Set announcement channel
    
    //Set title of announcements
      let reactAmount = args[1];
      let args2 = args;
      embed.setDescription(args2.slice(parseInt(args[1])+2).join(' '));
    message.delete().catch()
      
    embed.setTitle(title.replace(/-/g, " "))
    embed.setColor(green)
    //embed.setDescription(text)
    embed.setFooter(`https://invite.gg/aiden`)
    
    const m = await message.channel.send(embed);
      
       let chooseArr = [];
      for(let i = 2; i < reactAmount+2; i++)
      {
        chooseArr.push(args[i]);  
        
        
      }
       return await promptMessage(m, message.author, 30, chooseArr);
      
      }

      
      
    }
    }
    




