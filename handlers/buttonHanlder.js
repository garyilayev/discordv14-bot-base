const { Collection, Client } = require('discord.js');
const { GlobSync } = require('glob');

module.exports = {
	name: 'buttonHandler',
    /**
     * @param { Client } client 
     * @param { GlobSync } glob 
     */
	init(client, glob) {        
        client.buttons = new Collection();
        const path = `${process.cwd()}/buttons/**/*.js`.replace(/\\/g,'/');
        console.log(path);
        const buttonFolders = glob(path, null).found;
        console.log(buttonFolders);
        if (buttonFolders.length === 0) return console.log('No files found');
        buttonFolders.map(file => {
            const buttonFile = require(file);
            if (!buttonFile || !buttonFile.id) return;
            client.buttons.set(buttonFile.id, buttonFile);
        })
        console.log('Done buttons init!');
	},
};
