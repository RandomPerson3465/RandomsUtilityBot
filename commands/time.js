const { EmbedBuilder } = require("discord.js");
const userinfo = require("../assets/userinfo.json");
module.exports = {
  data: {
    name: 'time',
    type: 1,
    description: "Get the current time.",
    options: [{
      name: 'member',
      type: 6,
      description: "Get the current time in the timezone of this member.",
      required: false
    }]
  },
  execute: async (client, int) => {
    let user = int.options.getUser('member')?.id;
    if (!user) user = int.user.id;
    let timezone = "UTC"; 
    if (userinfo[user]) {
      timezone = userinfo[user].timezone || "UTC";
    }
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(new Date().toLocaleDateString("en-US", { timeZone: timezone }) + ", " + new Date().toLocaleTimeString("en-US", { timeZone: timezone }))
      .setTimestamp(Date.now());
    await int.reply({ embeds: [embed] });
  }
}