const { EmbedBuilder, version } = require('discord.js')
const formatDuration = require('../util/formatDuration.js')
module.exports = {
  data: {
    name: "botinfo",
    description: "Get information on the bot such as uptime."
  },
  execute: async (client, int) => {
    const embed = new EmbedBuilder()
    .setColor('#4babdb')
    .setAuthor({ name: 'Bot Information' })
    .setDescription(`**Node.js Process Uptime:** ${formatDuration(process.uptime()*1000)}\n**Discord Client Uptime:** ${formatDuration(client.uptime)}`)
    .addFields([
      { name: 'Discord.js Version', value: version, inline: true },
      { name: 'Cached Guilds', value: client.guilds.cache.size.toLocaleString('en-US'), inline: true },
      { name: 'Cached Users', value: client.users.cache.size.toLocaleString('en-US'), inline: true }
    ])
    await int.reply({ embeds: [embed] })
  }
}