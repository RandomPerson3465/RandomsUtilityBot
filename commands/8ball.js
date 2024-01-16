const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emojis = require("../assets/emojis.json");
const responses = require("fs").readFileSync("./assets/8ball.txt").toString().split("\n");
module.exports = {
  data: {
    name: '8ball',
    type: 1,
    description: "Note: Answers are randomly generated. Do not take it seriously.",
    options: [{
      name: 'question',
      type: 3,
      description: 'The question you want to ask the Magic 8 Ball',
      required: true
    }]
  },
  execute: async (client, int) => {
    let r = Math.floor(Math.random() * 20);
    const row = new ActionRowBuilder();
    const button = new ButtonBuilder()
      .setDisabled(true)
      .setLabel(responses[r])
      .setCustomId("8ball")
    if (r < 10) {
      button.setStyle(ButtonStyle.Success)
        .setEmoji(emojis.YES);
    }
    if (r >= 10 && r < 15) {
      button.setStyle(ButtonStyle.Secondary)
    }
    if (r >= 15) {
      button.setStyle(ButtonStyle.Danger)
        .setEmoji(emojis.NO);
    }
    row.addComponents([button]);
    return int.reply({ content: ":8ball: says:", components: [row] });
  }
}