const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a poll'),
	async execute(interaction) {
		await interaction.reply("Isn't implemented yet!");
	},
};