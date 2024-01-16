const { logError } = require('../util/log.js');
module.exports = async function (client, int) {
  const command = client.commands.get(int.commandName);
	if (!command) return;
  if (!process.env.OWNERS.split(',').includes(int.user.id) && command.ownerOnly) return int.reply(command.failMessage || 'You are not authorized to use this command.')
	try {
		await command.execute(client, int);
	} catch (error) {
		logError(error);
		await int.reply({ content: 'There was an error while executing this command.', ephemeral: true });
	}
}