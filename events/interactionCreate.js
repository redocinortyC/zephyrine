const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		console.log(`${interaction.commandName} was run by ${interaction.user.username} in server \"${interaction.member.guild.name}\"`);
		console.log(interaction);

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`no command matching ${interaction.commandName}`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`error executing ${interaction.commandName}`);
			console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
		}
	},
};