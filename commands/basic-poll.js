const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { generateRandomId } = require('../utils');

const MAX_TIME = 60 * 24; 
const MIN_TIME = 3; 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('basic-poll')
		.setDescription('Creates a basic yes/no poll')
		.addStringOption(option =>
			option.setName('question')
			.setDescription('Your pole topic/question')
			.setRequired(true)
			)
		.addIntegerOption(option => 
			option.setName('time')
			.setDescription('Time to vote in minutes')
			)
		,
	async execute(interaction) {
			let time = interaction.options.getInteger('time');
			time = !time || time < 1 ? MIN_TIME : MAX_TIME; 
			const poll = {
				id: generateRandomId(),
				question: interaction.options.getString('question'),
				yes_votes: 0, 
				no_votes: 0,
				members: [],
				startDate: interaction.createdTimestamp, 
				endDate: (interaction.createdTimestamp + (time * 60 * 1000)), 
			};
			const row = new ActionRowBuilder()
			.addComponents([
				new ButtonBuilder()
				.setCustomId('Yes')
				.setLabel(`Yes [${poll.yes_votes}]`)
				.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
				.setCustomId('No')
				.setLabel(`No [${poll.no_votes}]`)
				.setStyle(ButtonStyle.Danger),
				]
			);
			const embed = new EmbedBuilder()
			.setTitle(`${poll.question}`)
			.setDescription(`Poll ends at: <t:${Math.round(poll.endDate/1000)}:F>`)
			.setAuthor({ 
					name: interaction.member.displayName,
					 iconURL: interaction.member.displayAvatarURL(),
					 url: `https://discordapp.com/users/${interaction.user.id}`
					})
			await interaction.reply({ content: `@everyone ${interaction.member.displayName} created a poll!`, embeds: [embed], components: [row] });
	},
};