const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('createverify')
    .setDescription('set your verification channel')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('send verification embed in this channel')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
        .setTitle("Verifica")
        .setDescription("Clicca il bottone per verificare il tuo account ed ottnere l' accesso ai canali.")
        .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verifica').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({content: "C'è stato un errore! Prova dopo di nuovo.", ephemeral: true});
        } else {
            return interaction.reply({content: "Canale di verifica impostato con successo!", ephemeral: true});
        }
    },
};