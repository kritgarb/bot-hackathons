const axios = require('axios');
const cheerio = require('cheerio');
const supabase = require('./supabaseClient');

async function buscarHackathons() {
  const url = 'https://www.hackathon.com/country/brazil';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const eventos = [];

  $('.event-item').each(async (i, el) => {
    const nome = $(el).find('.event-title').text().trim();
    const link = $(el).find('a').attr('href');
    const local = $(el).find('.event-location').text().trim();
    const online = /online/i.test(local);
    const gratuito = true;  
    const dataInicio = new Date();

    const evento = {
      nome,
      data_inicio: dataInicio,
      data_fim: dataInicio,
      local,
      online,
      gratuito,
      link,
    };

    const permitido = gratuito && (online || /aracaju|sergipe/i.test(local));

    if (!permitido) return;

    const { data: existente } = await supabase
      .from('hackathons')
      .select('id')
      .eq('link', evento.link)
      .single();

    if (!existente) {
      await supabase.from('hackathons').insert([evento]);
      eventos.push(evento);
    }
  });

  return eventos;
}

module.exports = buscarHackathons;
