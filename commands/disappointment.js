module.exports = {
  data: {
    name: "disappointment",
    description: "Use this when your disappointment is immeasurable and your day is ruined."
  },
  execute: async (client, int) => {
    int.reply('https://tenor.com/view/disappointment-my-is-immeasurable-and-gif-14420754').catch(() => {});
  }
}