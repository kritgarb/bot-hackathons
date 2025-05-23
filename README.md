# 🤖 Bot Hackathons Discord

<div align="center">
  <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</div>

## 📋 Descrição

Bot automatizado em Node.js que busca e publica eventos de hackathons no Discord. O bot se integra com Supabase para buscar dados atualizados de hackathons e os compartilha automaticamente em canais específicos do Discord, mantendo sua comunidade sempre informada sobre as próximas oportunidades.

## 🚀 Funcionalidades

- 🔄 **Busca Automática**: Consulta dados de hackathons no Supabase
- 📢 **Publicação no Discord**: Envia mensagens formatadas com informações dos eventos
- 🎨 **Formatação Rica**: Utiliza embeds do Discord para apresentação visual atraente
- ⏰ **Agendamento**: Possibilidade de configurar execuções periódicas
- 🔒 **Segurança**: Utiliza variáveis de ambiente para proteção de credenciais

## 📦 Tecnologias

- **Node.js** (v16+)
- **Discord.js** (v14)
- **@supabase/supabase-js**
- **dotenv**
- **node-cron** (opcional para agendamento)

## 🛠️ Pré-requisitos

Antes de começar, você precisa ter:

- Node.js instalado (versão 16 ou superior)
- NPM ou Yarn
- Uma conta no Discord Developer Portal
- Uma conta no Supabase
- Git instalado

## 📥 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/kritgarb/bot-hackathons.git
cd bot-hackathons
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
touch .env
```

Adicione as seguintes variáveis:

```env
DISCORD_TOKEN=seu_token_aqui
DISCORD_CHANNEL_ID=id_do_canal_aqui
SUPABASE_URL=sua_url_supabase_aqui
SUPABASE_KEY=sua_chave_supabase_aqui
```

## 🔧 Configuração Detalhada

### Discord Bot Setup

1. **Criar uma aplicação no Discord**
   - Acesse [Discord Developer Portal](https://discord.com/developers/applications)
   - Clique em "New Application"
   - Dê um nome ao seu bot

2. **Configurar o Bot**
   - No menu lateral, clique em "Bot"
   - Clique em "Add Bot"
   - Em "Token", clique em "Copy" para copiar o token
   - **IMPORTANTE**: Nunca compartilhe este token!

3. **Definir Permissões**
   - Em "Bot Permissions", selecione:
     - `Send Messages`
     - `Embed Links`
     - `Read Message History`
     - `View Channels`

4. **Convidar o Bot para seu servidor**
   - Em "OAuth2" > "URL Generator"
   - Selecione `bot` em "Scopes"
   - Selecione as permissões necessárias
   - Copie a URL gerada e abra no navegador
   - Selecione o servidor e autorize

5. **Obter o ID do Canal**
   - No Discord, ative o "Modo Desenvolvedor" em Configurações > Avançado
   - Clique com botão direito no canal desejado
   - Selecione "Copiar ID"

### Supabase Setup

1. **Criar um projeto no Supabase**
   - Acesse [Supabase](https://supabase.com)
   - Crie uma nova conta ou faça login
   - Clique em "New Project"
   - Configure nome, senha do banco e região

2. **Criar a tabela de hackathons**
   
   Execute o seguinte SQL no editor do Supabase:

   ```sql
   CREATE TABLE hackathons (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     start_date TIMESTAMP,
     end_date TIMESTAMP,
     location VARCHAR(255),
     registration_link VARCHAR(500),
     prize_pool VARCHAR(100),
     tags TEXT[],
     created_at TIMESTAMP DEFAULT NOW(),
     is_active BOOLEAN DEFAULT true
   );
   ```

3. **Inserir dados de exemplo**

   ```sql
   INSERT INTO hackathons (name, description, start_date, end_date, location, registration_link, prize_pool, tags)
   VALUES 
   ('Hackathon Web3 Brasil', 'Construa o futuro da Web3', '2024-02-15', '2024-02-17', 'São Paulo, SP', 'https://exemplo.com/web3', 'R$ 50.000', ARRAY['web3', 'blockchain', 'crypto']),
   ('AI Innovation Challenge', 'Desenvolva soluções com IA', '2024-03-01', '2024-03-03', 'Online', 'https://exemplo.com/ai', 'R$ 30.000', ARRAY['ai', 'machine-learning', 'innovation']);
   ```

4. **Obter as credenciais**
   - No painel do Supabase, vá em "Settings" > "API"
   - Copie a "URL" do projeto
   - Copie a chave "anon" ou "service_role" (dependendo do nível de segurança)

## 💻 Uso

### Execução Manual

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### Scripts do package.json

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

### Exemplo de Código Principal

```javascript
// index.js
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

// Configurar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Configurar Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// Função para buscar hackathons
async function fetchHackathons() {
  const { data, error } = await supabase
    .from('hackathons')
    .select('*')
    .eq('is_active', true)
    .order('start_date', { ascending: true });
  
  if (error) throw error;
  return data;
}

// Função para criar embed
function createHackathonEmbed(hackathon) {
  return new EmbedBuilder()
    .setTitle(hackathon.name)
    .setDescription(hackathon.description)
    .addFields(
      { name: '📅 Data de Início', value: new Date(hackathon.start_date).toLocaleDateString('pt-BR'), inline: true },
      { name: '📍 Local', value: hackathon.location || 'Online', inline: true },
      { name: '💰 Premiação', value: hackathon.prize_pool || 'A definir', inline: true }
    )
    .setColor('#5865F2')
    .setTimestamp();
}

// Evento quando o bot está pronto
client.on('ready', async () => {
  console.log(`✅ Bot logado como ${client.user.tag}`);
  
  try {
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    const hackathons = await fetchHackathons();
    
    for (const hackathon of hackathons) {
      const embed = createHackathonEmbed(hackathon);
      await channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Erro ao enviar hackathons:', error);
  }
});

// Login do bot
client.login(process.env.DISCORD_TOKEN);
```

## 🚢 Deploy

### Deploy no Railway

1. Instale o Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Faça login:
   ```bash
   railway login
   ```

3. Inicialize o projeto:
   ```bash
   railway init
   ```

4. Configure as variáveis de ambiente:
   ```bash
   railway variables set DISCORD_TOKEN=seu_token
   railway variables set DISCORD_CHANNEL_ID=seu_id
   railway variables set SUPABASE_URL=sua_url
   railway variables set SUPABASE_KEY=sua_chave
   ```

5. Deploy:
   ```bash
   railway up
   ```

### Deploy no Heroku

1. Crie um `Procfile`:
   ```
   worker: node index.js
   ```

2. Instale o Heroku CLI e faça login:
   ```bash
   heroku login
   ```

3. Crie uma aplicação:
   ```bash
   heroku create nome-do-seu-bot
   ```

4. Configure as variáveis:
   ```bash
   heroku config:set DISCORD_TOKEN=seu_token
   heroku config:set DISCORD_CHANNEL_ID=seu_id
   heroku config:set SUPABASE_URL=sua_url
   heroku config:set SUPABASE_KEY=sua_chave
   ```

5. Deploy:
   ```bash
   git push heroku main
   ```

6. Escale o worker:
   ```bash
   heroku ps:scale worker=1
   ```

### Deploy na VPS (PM2)

1. Instale o PM2:
   ```bash
   npm install -g pm2
   ```

2. Configure o ecosystem:
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'bot-hackathons',
       script: './index.js',
       instances: 1,
       autorestart: true,
       watch: false,
       max_memory_restart: '1G',
       env: {
         NODE_ENV: 'production'
       }
     }]
   };
   ```

3. Inicie o bot:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## ⏰ Agendamento Automático

Para executar o bot periodicamente, adicione o `node-cron`:

```bash
npm install node-cron
```

Exemplo de implementação:

```javascript
const cron = require('node-cron');

// Executar todos os dias às 9h
cron.schedule('0 9 * * *', async () => {
  console.log('Executando busca diária de hackathons...');
  await sendHackathons();
});
```

## 🔒 Segurança

### Boas Práticas

1. **Nunca commite o arquivo `.env`**
   - Adicione ao `.gitignore`:
   ```
   .env
   node_modules/
   .DS_Store
   ```

2. **Use permissões mínimas**
   - Configure apenas as permissões necessárias no Discord
   - Use chaves `anon` do Supabase quando possível

3. **Validação de dados**
   - Sempre valide dados antes de enviar ao Discord
   - Implemente rate limiting se necessário

4. **Logs seguros**
   - Nunca logue tokens ou chaves
   - Use ferramentas como Winston para logs em produção

## 🐛 Troubleshooting

### Problemas Comuns

1. **Bot não conecta**
   - Verifique se o token está correto
   - Confirme que o bot foi convidado para o servidor

2. **Mensagens não são enviadas**
   - Verifique o ID do canal
   - Confirme as permissões do bot no canal

3. **Erro de conexão com Supabase**
   - Verifique URL e chave
   - Confirme se a tabela existe

4. **Bot fica offline no Heroku**
   - Heroku coloca apps gratuitos em sleep após 30min
   - Considere usar um serviço de uptime monitor

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Commit

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` alteração em documentação
- `style:` formatação de código
- `refactor:` refatoração
- `test:` adição de testes
- `chore:` tarefas de manutenção

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

**Kritgarb**
- GitHub: [@kritgarb](https://github.com/kritgarb)

## 🙏 Agradecimentos

- Discord.js pela excelente biblioteca
- Supabase pela plataforma de backend
- Comunidade open source

---

<div align="center">
  Feito com ❤️ e muito ☕ por <a href="https://github.com/kritgarb">kritgarb</a>
</div>