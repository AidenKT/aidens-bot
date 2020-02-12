const { RichEmbed } = require("discord.js");
const { orange } = require("../../colors.json");
const db = require("quick.db");
var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'balance',
      aliases: ['bal', 'bank', 'expenses', 'amount'],
      usage: '!balance [@user | id]',
      description: 'Displays a users balance',
      category: 'Economy',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    var json;
let m = message.mentions.members.first() || message.author || message.guild.members.get(args[0]);  
let jsonPath = path.join(__dirname, '..', '..','Users', m.id);
    if (!(fs.existsSync(jsonPath))){
      let usrBalance = await db.fetch(`usrCash_${m.id}`);
      if(usrBalance === null) usrBalance = 0;
      let usrBank = await db.fetch(`usrBank_${m.id}`);
      if(usrBank === null) usrBank = 0;
      let jsonDefault = path.join(__dirname, '..', '..', 'user.json');
      json = JSON.parse(fs.readFileSync(jsonDefault))
      json.balance = usrBalance
      json.bank = usrBank
      json.name = m.username
      message.channel.send(`Transfered Old Money to a New Account!`)
      fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
        if (err) {
          message.channel.send(err);
          return;
        };
      });
     
    }
    else{
      json = JSON.parse(fs.readFileSync(jsonPath))
      
      

  if(!args[0]) {
  let embed = new RichEmbed()
    .setColor(orange)
    .setAuthor(`${message.author.tag}'s Balance`, message.author.displayAvatarURL)
    //.setThumbnail(client.user.displayAvatarURL)
    .addField('[**__Your Wallet:__**]',`**` +json.balance +` 𝓐** `, true)
    .addField('[**__Your Bank:__**]', `**` +json.bank +` 𝓐** `, true)
  return message.channel.send(embed)
  } else {
  let embed2 = new RichEmbed()
    .setColor(orange)
    .setAuthor(`${m.user.tag}'s Balance`, m.user.displayAvatarURL)
    //.setThumbnail(client.user.displayAvatarURL)
    .addField('[**__Their Wallet:__**]', `**` +json.balance +` 𝓐** `, true)
    .addField('[**__Their Bank:__**]', `**` +json.bank +` 𝓐** `, true)
  return message.channel.send(embed2)
      }
    }
    }
  }