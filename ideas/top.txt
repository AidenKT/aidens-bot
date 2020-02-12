const { RichEmbed } = require('discord.js');
const db = require('quick.db');
const { orange } = require('../../colors.json');

  module.exports = {
    config: {
      name: 'leaderboard',
      aliases: ['top', 'lb'],
      usage: '^leaderboard',
      description: 'Displays the richest users in the server',
      category: 'Economy',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
let usrAmt = await db.startsWith(`usrCash_${message.author.id}`, { sort: '.data'})
let content = ``;
    
    for ( let i = 0; i < usrAmt.length; i++) {
      let usr = client.users.get(usrAmt[i].ID)
      
      content += `${i+1}. ${usr} ~ ${usrAmt[i].data}\n`
      }
    
    return message.channel.send(`leaderboard and shit\n\n${content}`)
    }
  }

/*    let money = db.startsWith(`money_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = bot.users.get(money[i].ID.split('_')[2]).username

      

        content += `${i+1}. ${user} ~ ${money[i].data}\n`
    
      }*/