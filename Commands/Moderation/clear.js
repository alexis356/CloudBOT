const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("elimina una quantita specifica di messaggi da un canale.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('amount')
        .setDescription('quantita di messaggi da eliminare.')
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('target')
        .setDescription('Seleziona il canale target.')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser('target');

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((mesg) => {
                if(mesg.author.id === target.id && amount > 1) {
                    filtered.push(mesg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Eliminati ${messages.size} messaggi da ${target} con successo.`);
                interaction.reply({embeds: [res]});
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Eliminati ${messages.size} messaggi dal canale con successo.`);
                interaction.reply({embeds: [res]});
            })
        }
    }
}