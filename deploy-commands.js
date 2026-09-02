const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

require("dotenv").config();

const commands = [

    // ========================================
    // PING
    // ========================================

    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Verifica se o Celestys Bot está funcionando.")
        .toJSON(),

    // ========================================
    // REGRAS
    // ========================================

    new SlashCommandBuilder()
        .setName("regras")
        .setDescription("Exibe as regras do servidor.")
        .toJSON(),

    // ========================================
    // WARN
    // ========================================

    new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Aplica uma advertência a um membro.")
        .addUserOption(option =>
            option
                .setName("membro")
                .setDescription("Membro que receberá a advertência.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("motivo")
                .setDescription("Motivo da advertência.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(0x0000010000000000)
        .toJSON()

];

const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

(async () => {

    try {

        console.log("🔄 Registrando comandos...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: commands
            }
        );

        console.log("✅ Comandos registrados!");

    } catch (error) {

        console.error(error);

    }

})();