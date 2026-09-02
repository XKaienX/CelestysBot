require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    AttachmentBuilder
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

// ========================================
// CARREGADOR DE COMANDOS
// ========================================

client.commands = new Map();

const commandsPath = path.join(__dirname, "commands");

function carregarComandos(pasta) {

    const arquivos = fs.readdirSync(pasta);

    for (const arquivo of arquivos) {

        const caminho = path.join(pasta, arquivo);
        const stat = fs.statSync(caminho);

        if (stat.isDirectory()) {
            carregarComandos(caminho);
            continue;
        }

        if (!arquivo.endsWith(".js")) continue;

        const comando = require(caminho);

        if (!comando.data || !comando.execute) {
            console.log(`⚠️ Comando inválido: ${caminho}`);
            continue;
        }

        client.commands.set(
            comando.data.name,
            comando
        );

        console.log(`📂 Comando carregado: ${comando.data.name}`);
    }
}

carregarComandos(commandsPath);

// ========================================
// BOT ONLINE
// ========================================

client.once("ready", () => {

    console.log(`🤖 Bot conectado como ${client.user.tag}`);
    console.log("🟢 Celestys Bot está online!");

});

// ========================================
// BOAS-VINDAS
// ========================================

client.on("guildMemberAdd", async member => {

    console.log(`👤 Novo membro detectado: ${member.user.tag}`);

    const canal = member.guild.channels.cache.find(
        channel => channel.name === "〔📊〕bem-vindo"
    );

    if (!canal) {
        console.log("❌ Canal 〔📊〕bem-vindo não encontrado.");
        return;
    }

    const imagem = new AttachmentBuilder("./welcome.png", {
        name: "welcome.png"
    });

    const embed = new EmbedBuilder()
        .setColor("#8b5cf6")
        .setImage("attachment://welcome.png")
        .setDescription(

            "[🌠] **Bem-vindo(a) à CELESTYS** [🌠]\n\n" +

            "Você acaba de chegar à **Celestys**, uma comunidade construída por pessoas diferentes, histórias diferentes e um mesmo espaço para compartilhar suas jornadas.\n\n" +

            "Aqui, cada membro faz parte do que estamos construindo. Por isso, antes de explorar tudo o que temos para oferecer, vale a pena conhecer um pouco das regras e entender como nossa comunidade funciona.\n\n" +

            "[📜] **Por onde começar?**\n\n" +

            "• Confira as **Diretrizes da Comunidade** e fique por dentro das normas;\n" +
            "• Faça sua apresentação e conheça o pessoal;\n" +
            "• Explore os canais e descubra tudo o que a **Celestys** tem para oferecer.\n\n" +

            "[🛡️] **Precisa de ajuda?**\n\n" +

            "Nossa equipe está por aqui para auxiliar quando necessário. Encontrou algum problema, ficou com alguma dúvida ou tem uma sugestão? Procure nossa **Staff**.\n\n" +

            "[✨] **Agora é com você.**\n\n" +

            "O espaço está aberto. Faça parte da comunidade, conheça novas pessoas e escreva sua própria história dentro da **Celestys**.\n\n" +

            "**Seja bem-vindo(a). Sua jornada começa agora.** ✦ <@" + member.id + ">"

        );

    await canal.send({
        embeds: [embed],
        files: [imagem]
    });

});

// ========================================
// INTERAÇÕES
// ========================================

client.on("interactionCreate", async interaction => {

    // ========================================
    // COMANDOS
    // ========================================

    if (interaction.isChatInputCommand()) {

        const comando = client.commands.get(
            interaction.commandName
        );

        if (comando) {

            try {

                await comando.execute(interaction);

            } catch (error) {

                console.error(
                    `❌ Erro no comando /${interaction.commandName}:`,
                    error
                );

                if (interaction.replied || interaction.deferred) {

                    await interaction.followUp({
                        content: "❌ Ocorreu um erro ao executar esse comando.",
                        ephemeral: true
                    });

                } else {

                    await interaction.reply({
                        content: "❌ Ocorreu um erro ao executar esse comando.",
                        ephemeral: true
                    });

                }
            }

            return;
        }
    }

    // ========================================
    // BOTÕES DAS REGRAS
    // ========================================

    if (interaction.isButton()) {

        const regras = require("./commands/utilidade/regras.js");

        // ========================================
// VOLTAR AO MENU
// ========================================

if (interaction.customId === "regras_voltar") {

    await interaction.update({
        ...regras.criarMenu()
    });

    return;
}

        // ========================================
        // CATEGORIAS
        // ========================================

        const categoriasBotoes = {
            categoria_in_game: "in_game",
            categoria_conduta: "conduta",
            categoria_staff: "staff",
            categoria_chat: "chat",
            categoria_call: "call",
            categoria_aplicacao: "aplicacao"
        };

        if (categoriasBotoes[interaction.customId]) {

    const categoria =
        categoriasBotoes[interaction.customId];

    await interaction.reply({
        ...regras.criarPagina(categoria, 0),
        ephemeral: true
    });

    return;
}

        // ========================================
        // PRÓXIMA PÁGINA
        // ========================================

        if (interaction.customId.startsWith("pagina_proxima_")) {

            const dados = interaction.customId
                .replace("pagina_proxima_", "")
                .split("_");

            const paginaAtual = Number(dados.pop());
            const categoria = dados.join("_");

            await interaction.update({
                ...regras.criarPagina(
                    categoria,
                    paginaAtual + 1
                )
            });

            return;
        }

        // ========================================
        // PÁGINA ANTERIOR
        // ========================================

        if (interaction.customId.startsWith("pagina_anterior_")) {

            const dados = interaction.customId
                .replace("pagina_anterior_", "")
                .split("_");

            const paginaAtual = Number(dados.pop());
            const categoria = dados.join("_");

            await interaction.update({
                ...regras.criarPagina(
                    categoria,
                    paginaAtual - 1
                )
            });

            return;
        }
    }

});

// ========================================
// LOGIN
// ========================================

client.login(process.env.DISCORD_TOKEN);