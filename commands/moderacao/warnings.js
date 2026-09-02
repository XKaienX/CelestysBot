const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const caminhoWarnings = path.join(
    __dirname,
    "../../data/warnings.json"
);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warnings")
        .setDescription("Mostra as advertências de um membro.")
        .addUserOption(option =>
            option
                .setName("membro")
                .setDescription("Membro que deseja consultar.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ModerateMembers
        ),

    async execute(interaction) {

        const usuario = interaction.options.getUser("membro");

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
                    content: "❌ Não foi possível acessar o histórico de advertências.",
                    ephemeral: true
                });
            }
        }

        const avisosUsuario = warnings.filter(
            warning => warning.usuarioId === usuario.id
        );

        if (avisosUsuario.length === 0) {
            return interaction.reply({
                content:
                    `📋 **Histórico de advertências de ${usuario}**\n\n` +
                    "✅ Este membro não possui nenhuma advertência.",
                ephemeral: true
            });
        }

        const descricao = avisosUsuario
            .map((warning, index) => {

                const data = new Date(
                    warning.data
                );

                const dataFormatada =
                    data.toLocaleDateString("pt-BR") +
                    " às " +
                    data.toLocaleTimeString(
                        "pt-BR",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );

                return (
    `**ID:** \`${warning.id}\`\n` +
    `📝 **Motivo:** ${warning.motivo}\n` +
    `👮 **Moderador:** <@${warning.moderadorId}>\n` +
    `📅 **Data:** ${dataFormatada}`
);
            })
            .join("\n\n");

        const embed = new EmbedBuilder()
            .setColor("#f59e0b")
            .setTitle("⚠️ Histórico de Advertências")
            .setDescription(
                `👤 **Membro:** ${usuario}\n` +
                `📊 **Total:** ${avisosUsuario.length}\n\n` +
                descricao
            )
            .setFooter({
                text: "Celestys • Sistema de Moderação"
            });

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};