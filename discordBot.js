const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

async function enviarMensagemHackathons(eventos) {
  const canal = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
  if (!canal) return;

  eventos.forEach(evento => {
    const msg = `🚀 Novo Hackathon:
**${evento.nome}**
📍 Local: ${evento.local}
🌐 Online: ${evento.online ? 'Sim' : 'Não'}
💸 Gratuito: ${evento.gratuito ? 'Sim' : 'Não'}
🔗 [Ver mais](${evento.link})`;
    canal.send(msg);
  });
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!pesquisar') {
    message.channel.send('🔍 Procurando Hackathons...');

    const eventosFake = [
      { nome: 'Hackathon Dev', local: 'Online', online: true, gratuito: true, link: 'https://hackathon.dev' },
      { nome: 'Code Jam Aracaju', local: 'Aracaju', online: false, gratuito: true, link: 'https://codejam.se' },
    ];

    await enviarMensagemHackathons(eventosFake);
  }
});

client.login(process.env.DISCORD_TOKEN);

module.exports = { client, enviarMensagemHackathons };
