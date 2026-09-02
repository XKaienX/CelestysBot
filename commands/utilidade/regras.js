const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

// ========================================
// CONFIGURAÇÃO DAS REGRAS
// ========================================

const categorias = {

    in_game: {
        titulo: "🎮 REGRAS IN-GAME — CELESTYS",
        paginas: [

            [
                "**1º — Exploração de bugs e duplicação**\nÉ proibido explorar bugs, glitches, métodos de duplicação ou qualquer falha que gere vantagem indevida. Caso encontre uma falha, reporte à Staff.\n\n**Punição:** suspensão ou banimento, dependendo da gravidade.",

                "**2º — Cheats e modificações ilegais**\nÉ proibido utilizar hacks, cheats, clientes modificados ou qualquer ferramenta externa que proporcione vantagem injusta.\n\n**Punição:** banimento.",

                "**3º — Macros e automações externas**\nÉ proibido utilizar macros, autoclickers ou ferramentas externas para automatizar ações do jogador. Automações realizadas através dos próprios mods disponibilizados pelo servidor são permitidas, salvo quando alguma máquina/item for especificamente proibido.\n\n**Punição:** suspensão ou banimento.",

                "**4º — Griefing**\nÉ proibido destruir, modificar, roubar ou prejudicar construções e propriedades de outros jogadores sem autorização.\n\n**Punição:** suspensão ou banimento + possível restauração dos danos.",

                "**5º — Invasão de propriedades**\nNão permaneça dentro da propriedade ou base de outro jogador após o proprietário solicitar sua saída. Também é proibido utilizar métodos para contornar as proteções do terreno.\n\n**Punição:** advertência, suspensão ou banimento."
            ],

            [
                "**6º — Claims mal-intencionados**\nÉ proibido utilizar claims com o objetivo de bloquear, cercar ou prejudicar propositalmente outro jogador.\n\n**Punição:** remoção do claim + suspensão ou banimento.",

                "**7º — Spawns e pontos públicos**\nÉ proibido construir, destruir ou realizar claims próximos a spawns de dimensões, estruturas essenciais ou outros locais públicos definidos pela Staff quando isso impedir ou dificultar o acesso dos demais jogadores.\n\n**Punição:** remoção da construção/claim + suspensão ou banimento.",

                "**8º — Taglocks**\nÉ proibido coletar Taglocks ou utilizar mecânicas relacionadas contra jogadores dentro de áreas protegidas sem consentimento.\n\n**Punição:** suspensão ou banimento.",

                "**9º — Magias em áreas protegidas**\nÉ proibido utilizar magias, rituais ou habilidades capazes de causar dano, alterar blocos ou afetar outros jogadores dentro de áreas protegidas sem autorização.\n\n**Punição:** suspensão ou banimento.",

                "**10º — Armadilhas**\nÉ proibido criar armadilhas destinadas a matar, prender ou prejudicar jogadores sem possibilidade razoável de defesa, especialmente próximas a teletransportes, portais, spawns ou áreas públicas.\n\n**Punição:** suspensão ou banimento."
            ],

            [
                "**11º — Farms excessivas**\nFarms de mobs, Pokémon ou outras entidades que causem quantidade excessiva de entidades ou prejudiquem o desempenho do servidor poderão ser removidas pela Staff. Abusar propositalmente dessas mecânicas poderá resultar em punição.\n\n**Punição:** advertência, remoção da farm, suspensão ou banimento.",

                "**12º — Desempenho do servidor**\nÉ proibido criar propositalmente mecanismos, máquinas, farms, loops ou qualquer sistema com o objetivo de causar lag, crash ou instabilidade no servidor. Construções que causem problemas de desempenho sem intenção poderão ser desativadas ou removidas pela Staff, com orientação ao proprietário sempre que possível.\n\n**Punição em caso de abuso intencional:** suspensão ou banimento.",

                "**13º — Criaturas, bosses e entidades perigosas**\nÉ proibido invocar ou transportar bosses, criaturas ou outras entidades perigosas para próximo de bases de terceiros, áreas públicas ou regiões protegidas quando houver risco evidente de causar danos.\n\n**Punição:** suspensão ou banimento.",

                "**14º — Anti-jogo**\nÉ proibido utilizar mecânicas do jogo de forma proposital para impedir ou prejudicar injustamente a progressão de outros jogadores.\n\n**Punição:** advertência, suspensão ou banimento."
            ]
        ]
    },

    conduta: {
        titulo: "👥 CONDUTA ENTRE JOGADORES",
        paginas: [

            [
                "**15º — Golpes e negociações fraudulentas**\nÉ proibido enganar jogadores durante vendas, trocas ou qualquer tipo de negociação dentro do servidor. Acordos realizados entre jogadores deverão ser cumpridos.\n\n**Punição:** suspensão ou banimento + possível reversão da negociação.",

                "**16º — Ofensas e provocações**\nÉ proibido insultar, perseguir, provocar excessivamente ou assediar outros jogadores. Brincadeiras entre jogadores serão analisadas considerando o contexto e os envolvidos.\n\n**Punição:** advertência, mute, suspensão ou banimento.",

                "**17º — Discriminação e discurso de ódio**\nÉ proibido qualquer conteúdo discriminatório ou ataque direcionado a pessoas ou grupos com base em características pessoais, incluindo racismo, xenofobia e outras formas de preconceito.\n\n**Punição:** mute, suspensão ou banimento.",

                "**18º — Spam e flood**\nÉ proibido enviar mensagens, comandos ou conteúdos repetidamente com o objetivo de poluir ou atrapalhar o chat.\n\n**Punição:** advertência ou mute."
            ],

            [
                "**19º — Conteúdo inadequado**\nÉ proibido compartilhar ou incentivar conteúdo sexual explícito, extremamente violento ou qualquer outro conteúdo inadequado para os espaços públicos do servidor.\n\n**Punição:** mute, suspensão ou banimento.",

                "**20º — Divulgação sem autorização**\nÉ proibido divulgar servidores, comunidades, lojas, canais ou serviços externos com finalidade de propaganda sem autorização da Staff.\n\n**Punição:** mute, suspensão ou banimento.",

                "**21º — Falsidade de identidade da Staff**\nÉ proibido se passar por membro da Staff ou fingir possuir cargos, poderes ou autoridade que não possui.\n\n**Punição:** suspensão ou banimento.",

                "**22º — Denúncias falsas**\nÉ proibido fabricar provas ou realizar denúncias propositalmente falsas com o objetivo de prejudicar outro jogador. Uma denúncia que simplesmente não possuir provas suficientes não será considerada automaticamente falsa.\n\n**Punição:** advertência, suspensão ou banimento."
            ]
        ]
    },

    staff: {
        titulo: "🛡️ STAFF E ADMINISTRAÇÃO",
        paginas: [

            [
                "**23º — Interferência em ações da Staff**\nÉ proibido atrapalhar propositalmente membros da Staff durante atendimentos, investigações, eventos ou aplicação das regras. Discordar de uma decisão ou solicitar revisão de uma punição não será considerado infração por si só.\n\n**Punição:** advertência, mute ou suspensão.",

                "**24º — Tentativa de burlar punições**\nÉ proibido utilizar contas alternativas ou qualquer outro método para contornar mute, suspensão, banimento ou outra restrição aplicada pela Staff.\n\n**Punição:** extensão da punição ou banimento.",

                "**25º — Comércio externo não autorizado**\nÉ proibido vender contas, itens, Pokémon, moedas ou benefícios do servidor por dinheiro real ou outros meios externos sem autorização expressa da administração.\n\n**Punição:** suspensão ou banimento."
            ]
        ]
    },

    chat: {
        titulo: "💬 REGRAS DO CHAT — CELESTYS",
        paginas: [

            [
                "**1º — Respeito entre membros**\nTrate os demais membros com respeito. Ofensas, humilhações, perseguições ou ataques pessoais não serão tolerados. Brincadeiras e provocações entre amigos são permitidas, desde que todos os envolvidos estejam confortáveis e não ultrapassem os limites.",

                "**2º — Flood e Spam**\nÉ proibido enviar mensagens repetidamente, utilizar emojis em excesso, repetir comandos ou mencionar outros membros diversas vezes com o objetivo de incomodar ou poluir o chat.",

                "**3º — Conteúdo impróprio**\nÉ proibido enviar ou compartilhar conteúdo pornográfico, gore explícito, material ilegal, racismo, discurso de ódio ou qualquer conteúdo semelhante.",

                "**4º — Discussões e conflitos**\nEvite transformar desentendimentos pessoais em discussões públicas. Brincadeiras, provocações e rivalidades são permitidas enquanto permanecerem saudáveis. Caso a situação comece a atrapalhar os demais membros, a Staff poderá intervir.",

                "**5º — Divulgação**\nÉ proibido divulgar outros servidores, comunidades, canais, produtos, serviços ou redes sociais com finalidade de propaganda sem autorização da administração."
            ],

            [
                "**6º — Utilize os canais corretamente**\nCada canal possui uma finalidade. Procure utilizar o canal correspondente ao assunto para manter o Discord organizado.",

                "**7º — Ameaças e intimidação**\nAmeaças reais, intimidação, perseguição ou tentativas de pressionar outro membro não serão toleradas. Zoações claramente realizadas entre amigos não serão consideradas ameaça, desde que não ultrapassem os limites.",

                "**8º — Staff**\nÉ permitido discordar, questionar decisões e apresentar sua opinião de maneira respeitosa. Entretanto, é proibido atrapalhar propositalmente atendimentos, provocar membros da Staff ou desobedecer orientações relacionadas à segurança e organização do servidor.",

                "**9º — Links maliciosos**\nÉ proibido enviar links contendo vírus, golpes, phishing, downloads maliciosos ou qualquer conteúdo criado para prejudicar outros membros. Links maliciosos enviados propositalmente poderão resultar em banimento imediato.",

                "**10º — Menções em massa**\nNão utilize @everyone, @here ou outras formas de menção em massa sem autorização ou necessidade."
            ]
        ]
    },

    call: {
        titulo: "🔊 REGRAS DE CALL — CELESTYS",
        paginas: [

            [
                "**1º — Microfone e volume**\nEvite gritos, microfone estourado ou qualquer comportamento propositalmente alto que prejudique os demais membros da call.",

                "**2º — Ruídos e sons externos**\nMúsica, televisão, vídeos ou outros sons reproduzidos pelo microfone devem permanecer em volume que não atrapalhe a conversa.",

                "**3º — Respeito durante as calls**\nAs mesmas regras de respeito do chat também se aplicam aos canais de voz. Brincadeiras e provocações são permitidas, desde que não ultrapassem os limites dos envolvidos.",

                "**4º — Flood de call**\nÉ proibido entrar e sair repetidamente dos canais, interromper propositalmente conversas ou produzir sons repetitivos apenas para chamar atenção ou incomodar."
            ],

            [
                "**5º — Discussões**\nDiscussões ocasionais podem acontecer, mas conflitos pessoais prolongados, gritaria ou brigas que estejam prejudicando a call deverão ser encerrados ou levados para uma conversa privada.",

                "**6º — Soundboard e modificadores de voz**\nSoundboards, efeitos e modificadores de voz são permitidos, desde que utilizados com moderação. Utilizá-los repetidamente, impedindo outras pessoas de conversar ou incomodando propositalmente os membros, poderá resultar em punição.",

                "**7º — Orientações da Staff**\nCaso um membro da Staff solicite que uma discussão, som, comportamento ou outra situação que esteja prejudicando a call seja interrompida, a orientação deverá ser respeitada.",

                "**8º — Conteúdo impróprio**\nNão é permitido reproduzir, transmitir ou descrever de maneira explícita conteúdo pornográfico, gore ou material ilegal nos canais de voz."
            ]
        ]
    },

    aplicacao: {
        titulo: "⚖️ APLICAÇÃO DAS REGRAS",
        paginas: [

            [
                "Nem toda brincadeira, palavrão ou discussão será automaticamente considerada uma infração. A Staff deverá considerar o contexto, a intenção, a gravidade e as pessoas envolvidas antes de aplicar uma punição.",

                "Dependendo da situação e da reincidência, poderão ser aplicadas advertências, mute, timeout, suspensão ou banimento.",

                "Situações graves, como envio proposital de conteúdo malicioso, golpes ou ameaças reais, poderão resultar em banimento imediato."
            ]
        ]
    }
};

// ========================================
// MENU PRINCIPAL
// ========================================

function criarMenu() {

    const embed = new EmbedBuilder()
        .setColor("#8b5cf6")
        .setTitle("📜 Regras  ·  CELESTYS")
        .setDescription(
            "Antes de começar sua jornada pela **Celestys**, reserve um momento para conhecer as diretrizes da comunidade.\n\n" +

            "**Escolha uma categoria abaixo para consultar as regras:**\n\n" +

            "🎮 **Regras In-Game**\n" +
            "Regras relacionadas ao servidor Minecraft e suas mecânicas.\n\n" +

            "👥 **Conduta entre Jogadores**\n" +
            "Regras de convivência e comportamento entre membros.\n\n" +

            "🛡️ **Staff e Administração**\n" +
            "Regras relacionadas à equipe e à administração.\n\n" +

            "💬 **Regras do Chat**\n" +
            "Diretrizes para os canais de texto do Discord.\n\n" +

            "🔊 **Regras de Call**\n" +
            "Diretrizes para os canais de voz.\n\n" +

            "⚖️ **Aplicação das Regras**\n" +
            "Como a Staff analisa e aplica as punições."
        )
        .setImage(
            "https://media.discordapp.net/attachments/1455387826240753958/1544527919760547920/28c781ded060eab1078c15e1e4da9e20.jpg?format=webp"
        )
        .setFooter({
            text: "Celestys • Regras e Diretrizes"
        });

    const botoes = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId("categoria_in_game")
            .setLabel("In-Game")
            .setEmoji("🎮")
            .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
            .setCustomId("categoria_conduta")
            .setLabel("Conduta")
            .setEmoji("👥")
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId("categoria_staff")
            .setLabel("Staff")
            .setEmoji("🛡️")
            .setStyle(ButtonStyle.Secondary)

    );

    const botoes2 = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId("categoria_chat")
            .setLabel("Chat")
            .setEmoji("💬")
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId("categoria_call")
            .setLabel("Call")
            .setEmoji("🔊")
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId("categoria_aplicacao")
            .setLabel("Aplicação")
            .setEmoji("⚖️")
            .setStyle(ButtonStyle.Secondary)

    );

    return {
        embeds: [embed],
        components: [botoes, botoes2]
    };
}

// ========================================
// EMBED DA CATEGORIA
// ========================================

function criarPagina(categoria, pagina) {

    const dados = categorias[categoria];

    const totalPaginas = dados.paginas.length;
    const conteudo = dados.paginas[pagina];

    const embed = new EmbedBuilder()
        .setColor("#8b5cf6")
        .setTitle(dados.titulo)
        .setDescription(conteudo.join("\n\n"))
        .setFooter({
            text: `Celestys • Página ${pagina + 1}/${totalPaginas}`
        });

    const botoes = [];

    if (pagina > 0) {

        botoes.push(
            new ButtonBuilder()
                .setCustomId(`pagina_anterior_${categoria}_${pagina}`)
                .setLabel("Anterior")
                .setEmoji("⬅️")
                .setStyle(ButtonStyle.Secondary)
        );

    }

    if (pagina < totalPaginas - 1) {

        botoes.push(
            new ButtonBuilder()
                .setCustomId(`pagina_proxima_${categoria}_${pagina}`)
                .setLabel("Próxima")
                .setEmoji("➡️")
                .setStyle(ButtonStyle.Primary)
        );

    }

    botoes.push(
        new ButtonBuilder()
            .setCustomId("regras_voltar")
            .setLabel("Voltar")
            .setEmoji("🔙")
            .setStyle(ButtonStyle.Danger)
    );

    return {
        embeds: [embed],
        components: [
            new ActionRowBuilder().addComponents(botoes)
        ]
    };
}

// ========================================
// COMANDO /REGRAS
// ========================================

module.exports = {

    data: new SlashCommandBuilder()
        .setName("regras")
        .setDescription("Exibe as regras e diretrizes da Celestys."),

    async execute(interaction) {

        await interaction.reply({
            ...criarMenu()
        });

    }
};

// ========================================
// EXPORTA FUNÇÕES PARA O INDEX
// ========================================

module.exports.criarMenu = criarMenu;
module.exports.criarPagina = criarPagina;
module.exports.categorias = categorias;