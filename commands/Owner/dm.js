const { RichEmbed } = require("discord.js")
const { hasPerms } = require("../../functions.js");
module.exports = {
  config: {
  name: "dm",
  aliases: [],
  description: "Hidden",
  category: "Developers",
  usage: ["Hidden"]
  },
  
  run: async (bot, message, args) => {
  if(hasPerms(message.author, "Owner", message) || hasPerms(message.author, "Admin", message) || hasPerms(message.author, "Mod", message)) {
   try {
  let user = await message.mentions.users.first();//bot.fetchUser(args[0])
  if(!user) return message.channel.send(`You need to supply a user.`)
  let msg = args.slice(1).join(" ")
  if(!msg) return message.channel.send(`I need something to send.`)
    
    user.send(`${msg}`)
    message.channel.send(`Sent message to \`${user.tag}\` with id of \`${args[0]}\``)  
   } catch(e) {
     message.channel.send(`${e.message}`)
   }
    } else {
    message.react(`❌`)
    }
  }
}