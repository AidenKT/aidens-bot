
const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
const { orange, red, yellow } = require('../../colors.json');
var fs = require("fs");
var path = require('path');
const ms = require('parse-ms');

const chooseArr = ["✅", "⛔"];
var number = Math.floor(Math.random() * 500) + 500;
let timeout = 3600000 / 2;
  module.exports = {
    config: {
      name: "deal",
      aliases: ["dealornodeal", "nodeal"],
      category: "Fun",
      description: "Deal or no deal game. React to one of the emojis to play the game.",
      usage: "!deal",
      category: 'Economy',
      accessableby: 'Users',
    },
    
      run: async (client, message, args) => {
        const embed = new RichEmbed()
        let jsonPath = path.join(__dirname, '..', '..','Users', message.author.id);
    if ((fs.existsSync(jsonPath))) {
    let json = JSON.parse(fs.readFileSync(jsonPath))
        
        if(json.deal !== null && timeout - (Date.now() - json.deal) > 0) {
            let time = ms(timeout - (Date.now() - json.deal))
      
          embed.setColor(red)
          embed.setDescription(`You can play again in: \`${time.hours}h ${time.minutes}m ${time.seconds}s\`.`)
          
          return message.channel.send(embed).then(m => {m.delete(10000)})
      } 
        else{
		  var keepRunning = true;

            embed
              .setColor(yellow)
             // .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
              .setDescription("That was the banker. Here is your offer. "+ number + "𝓐 Deal or no deal?")
             // .setTimestamp();
              .setFooter("Click ✅ for Deal or ⛔ for no deal. | If you hit No Deal, the Banker will reoffer.")
          const m = await message.channel.send(embed);
  while(keepRunning == true) {
        embed
        .setColor(yellow)
             // .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
              .setDescription("That was the banker. Here is your offer. "+ number + "𝓐 Deal or no deal?")
             // .setTimestamp();
		  m.edit(embed)
          const reacted = await promptMessage(m, message.author, 30, chooseArr);
		  if (reacted === "⛔")
		  {
			  if (Math.floor(Math.random() * 5) == 1) {
				  number = -1000;
          embed
              .setDescription('')
              .setColor(red)
              .setTitle("The Banker Pulls Out.")
              .addField('[**You Lost:**]', number + '𝓐', true)
          m.edit(embed);
          json.balance += number;
          
          number = (Math.floor(Math.random() * 500) + 500);
          await m.clearReactions();
				  keepRunning = false;
				  
			  }
			  else {
				  number += (Math.floor(Math.random() * 500) + 500);
          await m.clearReactions();
				  keepRunning = true;
				  
			  }
			  
		  }
		  else {
        json.balance += number;
			  embed
              .setDescription('')
              .setTitle("Deal!")
              .addField('[**__You Won__**]', number, true);
			  
			  m.edit(embed);
        number += (Math.floor(Math.random() * 500) + 500);
        await m.clearReactions();
			  keepRunning = false;
			  
		  }
          
          
          
		  }
          json.deal = Date.now();
        }
    fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
      if (err) {
          message.channel.send(err);
          return;
      };
    });
	  }
      

          
      }
  }
      