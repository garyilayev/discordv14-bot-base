const { SlashCommandBuilder, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
const { REST } = require('@discordjs/rest');
dotenv.config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Registers all the slash commands!'),
	async execute(interaction) {
        console.log(interaction.client.user.id);
        if (interaction.client.user.id !== process.env.MY_ID) return;
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        const commands = [];
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }

        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
            .then(data => {
                console.log(`Successfully registered ${data.length} application commands.`);
                interaction.reply('Commands reloaded!');
            })
            .catch(console.error);
        
	},
};