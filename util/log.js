const { clean } = require("./text.js")
const { WebhookClient } = require("discord.js")
module.exports = {
  log: function (text) {
    console.log(`[${new Date().toISOString()}]: ${text}`)
  },
  logError: function (error) {
    module.exports.log(error);
    try {
      const hook = new WebhookClient({ url: process.env.ERROR_HOOK_URL });
      if (!hook) throw new Error("Error logging webhook missing!");
      hook.send({ content: `${process.env.LOG_PREFIX} **returned an error:**\n${clean(error)}\n${error.stack}`.slice(0,2000) })
    } catch (err) {
      module.exports.log(err)
    }
  }
}