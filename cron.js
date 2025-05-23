const cron = require('node-cron');
const buscarHackathons = require('./scraper');
const { enviarMensagemHackathons } = require('./discordBot');

cron.schedule('0 8 * * *', async () => {
  console.log('🔍 Rodando busca diária...');
  const eventos = await buscarHackathons();
  if (eventos.length) {
    await enviarMensagemHackathons(eventos);
  } else {
    console.log('✅ Nenhum novo evento encontrado.');
  }
});
