module.exports = {
  data: {
    name: 'rage',
    description: 'Sends the bad day at the office rage GIF'
  },
  execute: async (client, int) => {
    int.reply('https://tenor.com/view/rage-work-pc-stressed-pissed-gif-15071896').catch(console.log)
  }
}