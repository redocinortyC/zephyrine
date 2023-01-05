const { Client, SlashCommandBuilder } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
	],
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'pinging...', fetchReply: true });
		await interaction.editReply(`🏓 Pong!\n:heart: Websocket heartbeat: \`${client.ws.ping}ms\`\n:hourglass: Roundtrip latency: \`${sent.createdTimestamp - interaction.createdTimestamp}ms\``);
	},
};
