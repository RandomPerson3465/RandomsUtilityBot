module.exports = {
  data: {
    name: 'ping',
    description: 'Checks bot latency'
  },
  execute: async (client, int) => {
    await int.reply(`Pong! Websocket \`${Math.round(Math.abs(client.ws.ping))}ms\``)
  }
}