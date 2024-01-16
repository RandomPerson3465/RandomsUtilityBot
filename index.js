module.exports = false;

const config = require("./config.json")
const { exec } = require('node:child_process');

if (config.start) {

  let lastOnline = Date.now();

  setInterval(() => {
    if (Date.now() - lastOnline > 48e4) {
      module.exports = false;
    }
  }, 3e5) // If bot is offline for >8 mins put status as offline

  const {
    Client,
    IntentsBitField,
    Collection,
    WebhookClient,
    REST
  } = require('discord.js');

  const client = new Client({
    intents: [IntentsBitField.Flags.Guilds]
  });

  const fs = require('fs')

  client.commands = new Collection();

  const { log, logError } = require('./util/log.js');

  const {
    Routes
  } = require('discord-api-types/v10');
  require('./server.js');

  let errorArray = [];
  client.on("debug", function(info){
    console.log(info);
      errorArray.push(info);
        setTimeout(() => {
          if (errorArray.length >= 3) {
            } else {
              console.log(`Caught a 429 error!`); 
              exec('kill 1', (err) => {
                if (err) {
                  console.error("could not execute command: ", err);
                    return
                }
                console.log(`Kill 1 command succeeded`);
                });                 
            }
        }, 20000);
  }); // Checks for bot being ratelimited on repl.it
  
  client.once('ready', async () => { 

    module.exports = true;

    const statusHook = new WebhookClient({ url: process.env.STATUS_HOOK_URL })
    setInterval(() => {
      statusHook.send({ content: `<@${client.user.id}> is currently online: <t:${Math.floor(new Date().getTime() / 1000)}:F>`})
        .then(_ => {
          lastOnline = Date.now();
          module.exports = true;
        })
        .catch(err => {
          log(err);
          module.exports = false;
        })
    }, 3e5)
    
    console.log(`Bot logged in as ${client.user.tag}!`)
    const hook = new WebhookClient({ url: process.env.START_HOOK_URL })
    if (hook) hook.send({ content: `**<@${client.user.id}> has logged in:** <t:${Math.floor(new Date().getTime() / 1000)}:F>` }).catch(() => {})
    
    const rest = new REST({
      version: '9'
    }).setToken(process.env.TOKEN);
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const commands = [];
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.commands.set(command.data.name, command);
      commands.push(command.data);
    }
    
    rest.put(Routes.applicationGuildCommands(client.user.id, process.env.MAIN_GUILD), {
      body: commands
    })
      .then(() => log('Successfully registered application commands.'))
      .catch(console.error);
    
  });


  client.on('interactionCreate', async int => {
    require('./events/interactionCreate.js')(client, int)
  })

  client.on('error', e => {
    logError(e);
  })


  process.on('unhandledRejection', (error) => {
    try {
      logError(error)
    } catch (e) {
      throw e
    }
  })

  process.on('uncaughtException', (error, origin) => {
    logError(error)
  })

  let timer = 0;
  const a = setInterval(() => {timer += 1; console.log(`Waiting for bot to login for ${Math.round(timer)} seconds...`) }, 1000)
  client.login(process.env.TOKEN).then(_ => clearInterval(a))
  
  
} else {
  console.log("Not starting as \"start\" in config.json is missing or set to false.")
}