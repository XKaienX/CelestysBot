const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Verifica se o Celestys Bot está funcionando."),

    async execute(interaction) {
        await interaction.reply(
            "🏓 Pong! O Celestys Bot está funcionando!"
        );
    }
};