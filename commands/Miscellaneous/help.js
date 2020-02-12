const { RichEmbed } = require("discord.js");
const { red, orange, green } = require("../../colors.json");
const { readdirSync } = require('fs');
const { stripIndents } = require("common-tags");
var fs = require("fs");
var path = require('path');

  module.exports = {
    config: {
      name: 'help',
      aliases: ['commandhelp', 'commands'],
      usage: '!help [command name or alias]',
      description: 'Displays the commands or gives the command information',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    let json
    let jsonPath = path.join(__dirname, '..', '..','Servers', message.guild.id + ".json");
    if (fs.existsSync(jsonPath))
    json = JSON.parse(fs.readFileSync(jsonPath))
    else json = {prefix: "!"};
    let pr = json.prefix
    
    let sender
    let senderPath = path.join(__dirname, '..', '..','Users', message.author.id);
    if (fs.existsSync(senderPath))
    sender = JSON.parse(fs.readFileSync(senderPath))
    else sender = {rank: "Guest"};
    
    let embed = new RichEmbed()
      .setColor(red)
      //.setAuthor(`${client.user.tag} Help`, client.user.displayAvatarURL)

      if(!args[0]) {
        const categories = readdirSync("./commands/")
        
        //embed.setFooter(`Command Size: ${client.commands.size} | A Fueled Development © Project`);
        
        categories.forEach(category => {
          const dir = client.commands.filter(c => c.config.category === category)
          const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
            try {
              embed.setDescription(`Guild Prefix: \`${pr}\``)
              //embed.setThumbnail(client.user.displayAvatarURL)
              if (capitalise === 'Owner' && !(sender.rank === "Owner" || sender.rank === "Admin") || sender.rank === "Moderator") return
              embed.addField(`**❯ ${capitalise} [${dir.size}]:**`, dir.map(c => `\`${c.config.name}\``).join(":"))  
            } catch(e) {
              
            }
        })
        return message.channel.send(embed)
      } else {
        let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
        if(!command) {
          embed.setAuthor('')
          embed.setTitle('Invaild Command!')
          embed.setThumbnail(client.user.displayAvatarURL)
          embed.setDescription(`\`${args.slice(0).join(" ")}\` isn't a command. Do this command again but with no arguments to see the commands.`)
          embed.setColor(red)
          message.channel.send(embed)
        }
        command = command.config
        embed.setAuthor('')
        embed.setFooter(`${command.name.slice(0,1).toUpperCase() + command.name.slice(1)} Command Help | Prefix: ${pr}`, client.user.displayAvatarURL)
        embed.setDescription(stripIndents `


        **Command Name**: ${command.name}
        **Command Aliases**: ${command.aliases ? `\`${command.aliases.join(", ")}\`` : 'No alias.'}
        **Command Usage**: ${command.usage ? `${command.usage}` : 'No usage.'}
        **Command Description**: ${command.description || 'No description.'}
        **Command Category**: ${command.category || 'No category.'}
        **Command Accessableby**: ${command.accessableby || 'No group provided.'}`)  
        
        return message.channel.send(embed)
      }
    }
  }