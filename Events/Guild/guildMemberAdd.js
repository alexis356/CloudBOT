const { EmbedBuilder } = require("@discordjs/builders");
const {GuildMember} = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member
   */
  execute(member) {
    const {user, guild} = member;
    const memberLogs = member.guild.channels.cache.get('865313195924914207');
    const welcomeMessage = `Benvenuto <@${member.id}> in **Centuplex**! Buona permanenza!`;
    
    const welcomeEmbed = new EmbedBuilder()
    .setTitle('**:partying_face: Nuovo Membro :partying_face: **')
    .setColor(0x4ea3f7)
    .setDescription(welcomeMessage)
    .addFields(
      { name:'Conto dei membri totali:', value: `${guild.memberCount}` }
    )
    .setTimestamp();

    memberLogs.send({embeds: [welcomeEmbed]});
    console.log(`${member.id} è entrato nel server.`)
  },
};