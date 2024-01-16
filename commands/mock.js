const { clean, mock } = require('../util/text.js')
module.exports = {
  data: {
    name: 'mock',
    type: 1,
    description: 'Mock something stupid',
    options: [{
      name: 'text',
      type: 3,
      description: 'Text you want to mock',
      required: true
    }]
  },
  execute: async (client, int) => {
    await int.reply({ content: clean(mock(int.options.get('text').value)).slice(0, 2000) });
  }
}