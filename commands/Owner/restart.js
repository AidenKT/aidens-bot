const { RichEmbed } = require("discord.js");
const { orange, red, green } = require("../../colors.json");
const { hasPerms } = require("../../functions.js");
  module.exports = {
    config: {
      name: 'restart',
      aliases: ['reboot', 'rebootprocess', 'botstop'],
      usage: '!restart',
      description: 'Restarts the bot.',
      category: 'Owner',
      accessableby: 'Bot Owner'
    },
  run: async (client, message, args) => {
      if(hasPerms(message.author, "Owner", message) || hasPerms(message.author, "Admin", message)) {
        try {
          let embed = new RichEmbed()
            embed.setColor(red)
            embed.addField('[**__Restarting__**]', `Bot will restart.`, true)

          let m = await message.channel.send(embed).then(m => {
            process.exit();
            client.login(process.env.DTOKEN).then(() => {
              let e = new RichEmbed()
                .setColor(green)
                .addField('[**__Success__**]', `Bot restarted successfully.`)
            m.delete()
              return message.channel.send(e)
            })
          })
        } catch(e) {
          let embed = new RichEmbed()
            .setColor(red)
            .setDescription('Something went wrong!')
          return message.channel.send(embed)
        }
      } else {
      if(!message.guild.me.hasPermission(["ADMINISTRATOR", "ADD_REACTIONS"])) return;
        return message.react(`❌`)
      }
    }
  }