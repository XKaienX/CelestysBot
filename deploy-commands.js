const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

require("dotenv").config();

const commands = [

    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Verifica se o Celestys Bot está funcionando.")
        .toJSON(),

    new SlashCommandBuilder()
        .setName("regras")
        .setDescription("Exibe as regras do servidor.")
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