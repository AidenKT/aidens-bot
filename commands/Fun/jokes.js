
const snekfetch = require('snekfetch')
const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colors.json")

  module.exports = {
    config: {
    name: 'jokes',
    aliases: ['joke', 'haha'],
    usage: ['!joke'],
    description: 'Its just a joke!',
    category: 'Fun',
    accessableby: 'Users'
    },


    run: async (bot, message, args) => {

        let msg = await message.channel.send("Getting a decent joke from Reddit.")
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/jokes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh jokes!, Try again later. Maybe try !dadjokes?');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        let embed = new RichEmbed()
        .setColor(cyan)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription(allowed[randomnumber].data.selftext)
        .setFooter("👍 Upvotes: " + allowed[randomnumber].data.ups + " / 📝 Comments: " + allowed[randomnumber].data.num_comments)
        msg.edit(embed)
    }    
}