require('dotenv').config();
require('./cron');
const { client } = require('./discordBot');

client.once('ready', () => {
  console.log(`✅ Bot está online: ${client.user.tag}`);
  client.guilds.cache.forEach(guild => {
    console.log(`👉 Servidor: ${guild.name}`);

    guild.channels.cache.forEach(channel => {
      console.log(`- ${channel.name} (${channel.id})`);
    });
  });
});
