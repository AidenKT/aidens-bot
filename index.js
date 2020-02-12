//const { Client, Collection } = require("discord.js");
//const client = new Client();
//var fs = require("fs");
//var path = require('path');

  ["aliases", "commands"].forEach(x => (client[x] = new Collection()));
  ["command", "events"].forEach(x => require(`./handlers/${x}`)(client));
 
client.login(process.env.DTOKEN);
require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("Welcome to the Aiden discord bot (Alpha)!"); res.end(); });

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    let jsonPath = path.join(__dirname,'Servers', guild.id + ".json");
    if (!(fs.existsSync(jsonPath))) {
      let json = JSON.parse(fs.readFileSync('Server.json'));
      fs.writeFile(jsonPath, JSON.stringify(json), (err) => {
        if (err) {
            console.log(err);
            return;
        };
      });
    }
})


const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received. :D");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
