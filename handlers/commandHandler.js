const fs = require('node:fs');
const path = require('node:path');
const { Glob } = require('glob');
const { Collection, Client } = require('discord.js');

module.exports = {
	name: 'commandHandler',
        /**
     * @param { Glob } glob 
     * @param { Client } client 
     */
	init(client, glob) {        
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