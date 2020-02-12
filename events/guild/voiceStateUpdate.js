var fs = require("fs");
var path = require('path');
const { orange, green } = require('../../colors.json');
const { RichEmbed } = require('discord.js');

  module.exports = async (client, oldMember, newMember) => {
    let oldUserChannel = oldMember.voiceChannel;
    let newUserChannel = newMember.voiceChannel;
    let channelName = '[Temp] ' + newMember.user.username + "\'s Channel" 

    if (newUserChannel !== undefined)
      {
    let jsonPath = path.join(__dirname, '..', '..','Servers', newMember.guild.id + ".json");
    let json
    if (await fs.existsSync(jsonPath))
             json = JSON.parse(fs.readFileSync(jsonPath))
         else 
             json = {CreateChannel: "temp"}
      
       if (newUserChannel.name == json.CreateChannel){
          let tempchannel
          let pos = await newUserChannel.position + parseInt(json.CreatedChannelPos)
         let channelData = {type: 'voice', parent: newUserChannel.parentID, position: pos}
         newUserChannel.guild.createChannel( channelName, channelData).then(chan => {
           chan.overwritePermissions(newMember.guild.roles.find('name', '@everyone'), {CONNECT: true})
           newMember.setVoiceChannel(chan.id)
           //chan.setPosition(newUserChannel.position + json.CreatedChannelPos)
           
         })
        
         
          
       }
      }
       else if(oldUserChannel !== undefined && oldUserChannel.name.substring(0,6) == '[Temp]' && oldUserChannel.members.size == 0){
        oldUserChannel.delete()

  }
  }