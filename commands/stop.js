const { WebhookClient } = require("discord.js");
module.exports = {
  data: {
    name: "stop",
    description: "Stops the bot. Owner only!" 
  },
  execute: async (client, int) => {
    await int.reply({ content: 'Stopping the bot now.', ephemeral: true }).then(() => {
      const hook = new WebhookClient({ url: process.env.STATUS_HOOK_URL });
      if (hook) {
        hook.send(`${int.user.tag} (\`${int.user.id}\`) is stopping the bot.`).then(() => {
          process.exit();
        });
      } else {
        process.exit(); 
      }
    })
  },
  omit: true,
  onwerOnly: true,
  failMessage: 'This isn\'t your bot, so no.'
}