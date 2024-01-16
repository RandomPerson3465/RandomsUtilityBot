const { log } = require('../util/log.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs')
module.exports = {
  data: {
    name: "deploy",
    description: "Deploys commands. Owner only!"
  },
  execute: async (client, int) => {
    try {
      const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
      await int.deferReply({ ephemeral: true });
		  log('Started refreshing application (/) commands.');
      const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
      const commands = [];
      for (const file of commandFiles) {
	      const command = require(`./${file}`);
        if (command.omit) continue;
	      commands.push(command.data);
      }
		  await rest.put(
			  Routes.applicationCommands(client.user.id),
			  { body: commands },
		  );

		  log('Successfully reloaded application (/) commands.');
      int.editReply({ content: `Successfully deployed ${commands.length} commands.`, ephemeral: true })
	  } catch (error) {
		  console.error(error);
	  }
  },
  omit: true,
  ownerOnly: true
}