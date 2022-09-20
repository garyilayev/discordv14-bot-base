module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`'Logged in!\nBot is running as ${client.user.tag}`);
	},
};