const {SlashCommandBuilder} = require('@discordjs/builders');
const { PermissionsBitField, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verifica')
    .setDescription("Crea il bottone verifica"),
    async execute (interaction, client){

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "devi essere un admin per poter creare un messaggio di verifica"});
        
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('✅')
            .setLabel('Verifica')
            .setStyle(ButtonStyle.Success),
        )
        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Server Verification')
        .setDescription('clicca il bottone qui sotto per verificare il tuo account.')

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            await i.update({ embeds: [embed], components: [button] });

            const role = interaction.guild.roles.cache.find(r => r.name === '〈⭐️〉Utente');

            const member = i.member;
            
            member.roles.add(role);

            i.user.send(`Sei ora verificato nel server **${i.guild.name}**`).catch(err => {

            })
        })
    }

}