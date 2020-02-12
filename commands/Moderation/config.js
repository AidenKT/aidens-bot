const { RichEmbed } = require('discord.js');
const { orange, red } = require('../../colors.json');
var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'config',
      aliases: ['settings'],
      usage: '!config (type) (config)',
      description: 'Sets the guild\'s prefix.',
      category: 'Moderation',
      accessableby: 'Administrator+'
    },
    
  run: async (client, message, args) => {
    let jsonPath = path.join(__dirname, '..', '..','Servers', message.guild.id + ".json");
    if ((fs.existsSync(jsonPath))) {
    let json = JSON.parse(fs.readFileSync(jsonPath))
  let error = client.emojis.get(':x:');
  let check = client.emojis.get(':white_check_mark:');
    
    
    let embed = new RichEmbed()
      embed.setColor(red)
      embed.setDescription(`You don't have the vaild permissions to use this command!`)
  if(!message.member.hasPermission(['ADMINISTRATOR', 'MANAGE_GUILD']) || !message.guild.owner) return message.channel.send(embed);
  if(!args[0]) {
    const e = new RichEmbed()
      e.setColor(red)
      e.setDescription(`You need to state the type of config. Types: [prefix, CreateChannel]`)
    return message.channel.send(e);
  }
      //Prefix
   else if (args[0] == "prefix"){
     if (!args[1]){
       const e = new RichEmbed()
      e.setColor(red)
      e.setDescription(`You need to state a prefix.`)
    return message.channel.send(e);
     }
       
    json.prefix = args.slice(1).join(' ')
    fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    };
});
      let ok = new RichEmbed()
        ok.setColor(orange)
        ok.setDescription(`Prefix was successfully set to: \`` + json.prefix + `\`.\nMention me when you need to know the prefix if you forget it..`)
      return message.channel.send(ok)
      }
   //Create Temporary Channnel
    else if (args[0] == "CreateChannel")
    {
     if (!args[1]){
       const e = new RichEmbed()
      e.setColor(red)
      e.setDescription(`You need to state a channel name`)
    return message.channel.send(e);
     } 
      if (args[1] == "position")
        {
          if (!args[1]){
       const e = new RichEmbed()
      e.setColor(red)
      e.setDescription(`You need to state a position`)
    return message.channel.send(e);
        }
          json.CreatedChannelPos = args[2]
           fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    };
           });
          let ok = new RichEmbed()
        ok.setColor(orange)
        ok.setDescription(`Temporary Channel Creation position set to: ` + args[2])
      return message.channel.send(ok)

        }
          
      json.CreateChannel = args[1]
      fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
    if (err) {
        message.channel.send(err);
        return;
    };
});
      let ok = new RichEmbed()
        ok.setColor(orange)
        ok.setDescription(`Temporary Channel Creation set to: ` + args[1])
      return message.channel.send(ok)
    }
    }
    else {
      let json = {prefix: args[0], CreateChannel: null}
        fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
        if (err) {
           err;
        }
          else {return message.channel.send("Created new file for server ")}
      });
    
     
    }
    }
  }