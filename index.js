const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js'); 
const dotenv = require('dotenv');
const {GlobSync} = require('glob');
const glob = GlobSync;
const { Client, GatewayIntentBits } = Discord;
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
    handler.init(client, glob);
}

client.login(process.env.DISCORD_TOKEN);