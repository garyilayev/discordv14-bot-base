const fs = require('node:fs');
const path = require('node:path');
const { Glob } = require('glob');
const { Client } = require('discord.js');
module.exports = {
	name: 'eventHandler',
    /**
     * @param { Glob } glob 
     * @param { Client } client 
     */
	init(client, glob) {
        const eventsPath = path.join(__dirname, '..', 'events');
        console.log(eventsPath);
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
        console.log('Done events init!');
	},
};