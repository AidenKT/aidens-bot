let prefix = "!";
const active = new Map()
var fs = require("fs");
var path = require('path');
const { orange, green } = require('../../colors.json');
const { RichEmbed } = require('discord.js');

  module.exports = async (client, message) => { 
    let json
    if (message.channel.type != 'dm') {
    let jsonPath = path.join(__dirname, '..', '..','Servers', message.guild.id + ".json");
    
    if (await fs.existsSync(jsonPath))
    json = JSON.parse(fs.readFileSync(jsonPath))
    }
    else json = {prefix: "!"};
    let fetched = json.prefix;
      if(fetched === null) prefix = '!'
        else prefix = fetched
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
      let amt1 = Math.floor(Math.random() * 50) + 1;
      let amt2 = Math.floor(Math.random() * 50) + 1;
      let final = Math.floor(Math.random() * 10000) + 1;
//amt1 === amt2
        if(amt1 == amt2) {
          let embed = new RichEmbed()
            .setColor(green)
            .setDescription(`**${message.author.tag}** Just earned **${final}** 𝓐.`)
          let json2
      let jsonPath2 = path.join(__dirname, '..', '..','Users', message.author.id);
      let jsonPath2D = path.join(__dirname, '..', '..', 'user.json');
    if (fs.existsSync(jsonPath2))
    json2 = JSON.parse(fs.readFileSync(jsonPath2))
          else json2 = JSON.parse(fs.readFileSync(jsonPath2D))
          json2.balance += final;
          fs.writeFile(jsonPath2, JSON.stringify(json2), (err) => {
        if (err) {
          message.channel.send(err);
          return;
        };
      });
          return message.channel.send(embed).then(m => {m.delete(10000)})
        }
    
    
    
      if(message.channel.type === 'dm' && !message.author.bot) return client.guilds.get('644676276593885209').channels.get('671102757637324811').send(message.author.tag + ": DMed me: \n" + message.content);
      
      
    //Valentines Day Feature.
        if (message.content.startsWith('s!hug')){
        var dateFrom = "13/02/2020";
          var dateTo = "15/02/2020";
         var d1 = dateFrom.split("/");
          var d2 = dateTo.split("/");
        var check = Date.now();
      
      var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
          var to = new Date(d2[2], parseInt(d2[1])-1, d2[0]); // -1 because months are from 0 to 11
if (check > from && check < to) {
  message.channel.send("date works")
        let json2
        let args2 = message.content.split(" ");
        let user2 = message.mentions.members.first() || message.guild.members.get(args2[1])
        if (user2 !== message.author) {
          let jsonPath2 = path.join(__dirname, '..', '..','Users', message.author.id);
          let json3
    if (fs.existsSync(jsonPath2))
    json3 = JSON.parse(fs.readFileSync(jsonPath2))
        let jsonPath = path.join(__dirname, '..', '..','Users', user2.id);
        let jsonPath2D = path.join(__dirname, '..', '..', 'user.json');
    if (fs.existsSync(jsonPath))
    json2 = JSON.parse(fs.readFileSync(jsonPath))
          else json2 = JSON.parse(fs.readFileSync(jsonPath2D))
        if (json3.hugged !== "true" && json2.rhug !== "true") {
          json2.balance += 10000;
          json2.rhug = "true";
          json3.hugged = "true";
          await fs.writeFile(jsonPath, JSON.stringify(json2), (err) => {
            if (err) {
          message.channel.send(err);
          return;
        };
      });
          json3.hugged = "true";
          await fs.writeFile(jsonPath2, JSON.stringify(json3), (err) => {
            if (err) {
          message.channel.send(err);
          return;
        };
      });
          message.channel.send(user2 + " Recieved a bonus for getting hugged by " + message.author + ".")
        }
      
          return
        }
      
      }
    }
    
    if(!message.content.startsWith(prefix)) return;
      if(message.author.bot) return;
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    let ops = {
      active: active
    }
      if(command) 
        await command.run(client, message, args, ops);
  }