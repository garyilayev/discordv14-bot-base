const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

module.exports = {
	name: 'commandHandler',
	init(client) {        
        client.commands = new Collection();

        const commandsPath = path.join(__dirname,  '..', 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
        }
        console.log('Done commands init!');
	},
};