const { RichEmbed } = require("discord.js");
const { orange, red } = require("../../colors.json");
const { inspect } = require("util");
const { hasPerms } = require("../../functions.js");

  module.exports = {
    config: {
      name: 'evaluate',
      aliases: ['ev', 'eval'],
      usage: '^evaluate (JavaScript code)',
      description: 'Executes Javascript code.',
      category: 'Owner',
      accessableby: 'Bot Owner'
    },
    
  run: async (client, message, args, ops) => {
      if(hasPerms(message.author, "Owner", message) || hasPerms(message.author, "Admin", message)) {
        try {
        let toEv = args.join(" ")
        let evaluated = inspect(eval(toEv, { depth: 0 }));
          if(!toEv) {
            let no = new RichEmbed()
              .setColor(red)
              .setDescription('Error whilst executing: `air`')
            return message.channel.send(no)
          } else {
            let hrStart = process.hrtime()
            let hrDiff;
            hrDiff = process.hrtime(hrStart)
            let e = new RichEmbed()
              .setColor(orange)
              .setDescription(`Took: *${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\`\`\``, { maxLength: 1900 })
            return message.channel.send(e)
          }
        } catch(e) {
          let oops = new RichEmbed()
            .setColor(red)
            .setDescription(`Error whilst evaluating: ${e.message}`)
          return message.channel.send(oops)
        }
      } else {
        if(!message.guild.me.hasPermission(["ADMINISTRATOR", "ADD_REACTIONS"])) return;
        return message.react(`❌`)
      }
    }
  }