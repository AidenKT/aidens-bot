
const snekfetch = require('snekfetch')
const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colors.json")

 module.exports = {
    config: {
    name: 'dadjokes',
    aliases: ['jokes', 'dadjokes', 'badjokes'],
    usage: ['!dog'],
    description: 'Corny dad jokes! Will likely be unfunny and could be offensive.',
    category: 'Fun',
    accessableby: 'Users'
    },

  run: async (bot, message, args) => {

    
    
        let msg = await message.channel.send("Looking up the most unfunny dad jokes..")
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dadjokes.json?sort=hot&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh dad jokes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        let embed = new RichEmbed()
        .setColor(cyan)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription(allowed[randomnumber].data.selftext)
        .setFooter("👍 Upvotes: " + allowed[randomnumber].data.ups + " / 📝 Comments: " + allowed[randomnumber].data.num_comments)
        msg.edit(embed)
    
    
  }
}