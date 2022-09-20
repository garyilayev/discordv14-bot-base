const Discord = require('discord.js'); 
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, Collection } = Discord;
dotenv.config();

const client = new Client({
    intents: [ 
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildScheduledEvents,
     ],
});

const handlersPath = path.join(__dirname, 'handlers');
const handlersFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.js'));

for (const file of handlersFiles) {
    const filePath = path.join(handlersPath, file);
    const handler = require(filePath);
    handler.init(client);
}

client.login(process.env.DISCORD_TOKEN);