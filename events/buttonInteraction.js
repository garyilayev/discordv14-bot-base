const { ButtonInteraction } = require('discord.js'); 
module.exports = {
	name: 'interactionCreate',
    /**
     * @param { ButtonInteraction } interaction 
     */
	async execute(interaction) {
        if (!interaction.isButton()) return;
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered a button interaction.`);
        const button = interaction.client.buttons.get(interaction.customId);
        if (!button) return;
        // else if (!button.permission && !interaction.member.permissions.has(button.permission)) {
        //     return interaction.reply({content: "You are missing permissions", ephemeral: true});
        // }
    
        try {
            await button.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
        }
	},
};