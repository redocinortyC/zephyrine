// Imports
const { readdirSync } = require('fs');
const { path } = require("node:path");
require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const token = process.env.BOT_TOKEN;

// Discord client and its intents
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
	],
});

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// Commands collection
client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter((file) =>
	file.endsWith('.js'),
);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// On ready
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!\n`);

	// Status and activities
	client.user.setStatus('online');
	client.user.setActivity('the community', { type: 'WATCHING' });
});

// Client login
client.login(token);
