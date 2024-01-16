module.exports = {
  clean: (string) => {
    string = string.replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(/`/g, '`' + String.fromCharCode(8203));
    return string;
  }, 
  mock: (text) => {
    let result = [];
    if (typeof text !== 'string') text = text.toString();
    text = text.replace(/ks/ig, 'x')
        .replace(/ck/ig, 'kK')
        .replace(/ce/ig, 'se')
        .replace(/ci/ig, 'si')
      	.replace(/cy/ig, 'sy')
        .replace(/c/ig, 'k')
        .replace(/o/ig, '0')
        .replace(/ph/ig, 'f');
    for (const word of text.split(' ')) {
        let c = Math.round(Math.random());
        let mockedWord = '';
        for (const letter of word) {
            if (letter === letter.toUpperCase()) mockedWord += letter;
            else {
                if (c % 2) mockedWord += letter.toUpperCase();
                else mockedWord += letter;
                c++;
            }
        }
        result.push(mockedWord)
    }
    return result.join(' ');
  },
  embedToText: (embed) => {
    let result = [];
    if (embed.title) result.push(embed.title);
    if (embed.author?.name) result.push(embed.author.name);
    if (embed.description) result.push(embed.description);
    for (const field of embed.fields) {
      result.push(field.name);
      result.push(field.value);
    };
    if (embed.footer?.text) result.push(embed.footer.text);
    return result.join(' ');
  }
}