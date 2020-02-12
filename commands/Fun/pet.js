
const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
const { brown } = require('../../colors.json');

const chooseArr = ["✅", "❌"];

  module.exports = {
    config: {
      name: "pet",
      category: "Fun",
      description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
      usage: "!pet",
      category: 'Fun',
      accessableby: 'Users',
    },
    
      run: async (client, message, args) => {
          const embed = new RichEmbed()
              .setColor(brown)
             // .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
              .setDescription("Will you pet the doggo? 🐶")
             // .setTimestamp();

          const m = await message.channel.send(embed);
          const reacted = await promptMessage(m, message.author, 30, chooseArr);

          const result = await getResult(reacted);
          await m.clearReactions();

          embed
              .setDescription('')
              .setTitle(result)
              .addField('[**__You\'ve Chosen:__**]', reacted, true)
              //.addField(result, `${reacted} vs ${botChoice}`);

          m.edit(embed);

          function getResult(me) {
              if ((me === "✅")) {
                      return "**You pet it! You're great! 🐶**";
              } else {
                  return "**You didn't pet it! You're a horrible person. :(**";
              }
          }
      }
  }