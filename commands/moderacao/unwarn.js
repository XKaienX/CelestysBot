const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const caminhoWarnings = path.join(
    __dirname,
    "../../data/warnings.json"
);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unwarn")
        .setDescription("Remove uma advertência de um membro.")
        .addUserOption(option =>
            option
                .setName("membro")
                .setDescription("Membro que terá a advertência removida.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("id")
                .setDescription("ID da advertência que será removida.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ModerateMembers
        ),

    async execute(interaction) {

        const usuario = interaction.options.getUser("membro");
        const id = interaction.options.getString("id");

        let warnings = [];

        if (fs.existsSync(caminhoWarnings)) {
            try {

                warnings = JSON.parse(
                    fs.readFileSync(
                        caminhoWarnings,
                        "utf8"
                    )
                );

            } catch (error) {

                console.error(
                    "❌ Erro ao ler warnings.json:",
                    error
                );

                return interaction.reply({
                    content:
                        "❌ Não foi possível acessar o sistema de advertências.",
                    ephemeral: true
                });
            }
        }

        const index = warnings.findIndex(
            warning =>
                String(warning.id) === String(id) &&
                warning.usuarioId === usuario.id
        );

        if (index === -1) {

            return interaction.reply({
                content:
                    "❌ Não encontrei nenhuma advertência com esse ID para esse membro.",
                ephemeral: true
            });
        }

        const warningRemovido = warnings[index];

        warnings.splice(index, 1);

        fs.writeFileSync(
            caminhoWarnings,
            JSON.stringify(warnings, null, 4)
        );

        await interaction.reply({
            content:
                "✅ **Advertência removida com sucesso!**\n\n" +
                `👤 **Membro:** ${usuario}\n` +
                `🆔 **ID:** \`${warningRemovido.id}\`\n` +
                `📝 **Motivo:** ${warningRemovido.motivo}`,
        });
    }
};