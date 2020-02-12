const { RichEmbed } = require("discord.js")
const { orange, red, green } = require("../../colors.json");
const { hasPerms } = require("../../functions.js");
var fs = require("fs");
var path = require('path');
  module.exports = {
  config: {
  name: "promote",
  aliases: [],
  description: "Hidden",
  category: "Owner",
  usage: ["Hidden"]
  },
  
  run: async (client, message, args) => {
    if(hasPerms(message.author, "Owner", message) || hasPerms(message.author, "Admin", message)) {
    
    let m = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (args[1] == "Guest" && hasPerms(m, "Owner", message) && hasPerms(message.author, "Admin", message)) return message.react(`❌`)
      if (args[1] == "Admin" && hasPerms(message.author, "Owner", message) || args[1] == "Owner" && hasPerms(message.author, "Owner", message)) {
        let jsonPath = path.join(__dirname,'..', '..', 'Users', m.id);
        if ((fs.existsSync(jsonPath))) {
          let json = JSON.parse(fs.readFileSync(jsonPath))
          json.rank = args[1]
          fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
            if (err) {
              message.channel.send(err);
              return;
            };
        });
      return message.channel.send ("Promoted " + m.name + " to " + args[1])
      }
      }
      else if (args[1] == "Moderator")
        {
                  let jsonPath = path.join(__dirname,'..', '..', 'Users', m.id);
        if ((fs.existsSync(jsonPath))) {
          let json = JSON.parse(fs.readFileSync(jsonPath))
          json.rank = "Mod"
          fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
            if (err) {
              message.channel.send(err);
              return;
            };
        });
          return message.channel.send ("Promoted " + m.name + " to " + args[1])
      }
          
        }
      else if (args[1] == "Guest") {
                          let jsonPath = path.join(__dirname,'..', '..', 'Users', m.id);
        if ((fs.existsSync(jsonPath))) {
          let json = JSON.parse(fs.readFileSync(jsonPath))
          json.rank = "Guest"
          fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
            if (err) {
              message.channel.send(err);
              return;
            };
        });
          return message.channel.send ("Promoted " + m.name + " to " + args[1])
      }
      }
      else return message.channel.send("Insufficent Permissions. You can't promote this person to: " + args[1])
    }
    return message.react(`❌`)
  }
}