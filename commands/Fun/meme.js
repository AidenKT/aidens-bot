const snekfetch = require('snekfetch')
const { RichEmbed } = require("discord.js")
const { orange, red } = require("../../colors.json")

module.exports = {
    config: {
        name: "meme",
        aliases: [],
        usage: "!meme",
        category: "Fun",
        description: "Sends a meme from the subreddit r/memes",
        accessableby: "Users"
    },

    run: async (bot, message, args) => {
        let msg = await message.channel.send("Grabbing you a meme...")
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/memes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        let embed = new RichEmbed()
        .setColor(orange)
        .setTitle(allowed[randomnumber].data.title)
        //.setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .setFooter("👍 " + allowed[randomnumber].data.ups + " | 📝 " + allowed[randomnumber].data.num_comments)
        msg.edit(embed)
    }    
}
