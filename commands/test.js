module.exports = {
  data: {
    name: 'test',
    description: 'Testing command.'
  },
  execute: async (client, int) => {
    await int.reply('Test successful.')
  },
  ownerOnly: true
}