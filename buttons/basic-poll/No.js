const { ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'); 

module.exports = {
    id: 'No',
    // permission: "EVERYONE",
    /**
     * @param { ButtonInteraction } interaction 
     */
    execute(interaction) {
        if (interaction.isMessageComponent()) {
            const filter = i => i.customId === 'No';
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            const button = interaction.message.components[1].components.filter(comp => comp.customId === 'No')[0];
            collector.on('collect', async i => {
                const data = button.data;
                const votes = data.label.split(' ')[1].replace('[','').replace(']','')
                const newVote = parseInt(votes) + 1;
                const row = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId('Yes')
                    .setLabel(`Yes [${newVote}]`)
                    .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                    .setCustomId('No')
                    .setLabel(`No [${newVote}]`)
                    .setStyle(ButtonStyle.Danger),
                    ]
                );
                await i.deferUpdate();
                await i.editReply({ components: [row] });
            });

            collector.on('end', async collected => {
                console.log(`Collected: ${collected.size}`);
            })

        }
    }
}