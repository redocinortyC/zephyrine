const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
	console.log(`Logged in as ${client.user.tag}!\n`);

	// Status and activities
	client.user.setStatus('online');
	client.user.setActivity('the community', { type: 'WATCHING' });
	},
};