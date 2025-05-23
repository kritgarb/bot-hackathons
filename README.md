# 🤖 Bot Hackathons

Um bot em Node.js que publica automaticamente no Discord os próximos eventos de hackathon, integrando com Supabase para buscar os dados e utilizando variáveis de ambiente para garantir segurança.

## 🚀 Tecnologias

* Node.js
* Discord.js
* Supabase
* dotenv

## ⚙️ Configuração do ambiente

Clone o repositório:

```bash
git clone https://github.com/kritgarb/bot-hackathons.git
cd bot-hackathons
```

Instale as dependências:

```bash
npm install
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DISCORD_TOKEN=SEU_TOKEN_DO_DISCORD
DISCORD_CHANNEL_ID=ID_DO_CANAL_DISCORD

SUPABASE_URL=URL_DO_SEU_SUPABASE
SUPABASE_KEY=CHAVE_API_SUPABASE
```

### Descrição das variáveis:

| Variável             | Descrição                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `DISCORD_TOKEN`      | Token do bot gerado no Discord Developer Portal. **NUNCA** compartilhe esse valor publicamente.  |
| `DISCORD_CHANNEL_ID` | ID do canal onde o bot irá postar as mensagens. Habilite permissões de escrita para o bot.       |
| `SUPABASE_URL`       | URL pública da instância do Supabase que armazena os dados dos hackathons.                       |
| `SUPABASE_KEY`       | Chave pública (`anon`) ou secreta da API do Supabase, dependendo do nível de segurança desejado. |

## 💠 Como rodar o bot

```bash
node index.js
```

Ou, se preferir, adicione no `package.json`:

```json
"scripts": {
  "start": "node index.js"
}
```

Depois só rodar:

```bash
npm start
```

---

## 🔄 Funcionamento

* Ao iniciar, o bot se conecta ao Discord.
* Busca a lista de eventos de hackathon no Supabase.
* Formata e envia a mensagem para o canal configurado.

---

## 🧹 Boas práticas

✅ Não comite o `.env` no repositório.
✅ Use `.gitignore` para evitar vazamentos.
✅ Use tokens e keys apenas em variáveis de ambiente.

---

## 🏁 Próximos passos

* Agendar execuções automáticas via cron.
* Implementar comandos interativos no Discord.
* Deploy automatizado na Vercel.

---

## 🤝 Contribuição

1. Faça um fork.
2. Crie uma branch (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'feat: nova feature'`).
4. Push na branch (`git push origin feature/nova-feature`).
5. Crie um Pull Request.

---

## 📄 Licença

[MIT](LICENSE)

---

**Feito com sangue nos olhos e café na veia ☕💻**
by [kritgarb](https://github.com/kritgarb)
