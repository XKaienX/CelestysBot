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
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ModerateMembers
        ),

    async execute(interaction) {

        const membro = interaction.options.getMember("membro");
        const usuario = interaction.options.getUser("membro");
        const motivo = interaction.options.getString("motivo");

        // ========================================
        // VERIFICAÇÕES
        // ========================================

        if (!membro) {
            return interaction.reply({
                content: "❌ Não foi possível encontrar esse membro.",
                ephemeral: true
            });
        }

        if (usuario.id === interaction.user.id) {
            return interaction.reply({
                content: "❌ Você não pode aplicar uma advertência em si mesmo.",
                ephemeral: true
            });
        }

        if (usuario.bot) {
            return interaction.reply({
                content: "❌ Você não pode aplicar uma advertência em um bot.",
                ephemeral: true
            });
        }

        // ========================================
        // CARREGAR WARNINGS
        // ========================================

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
                    content: "❌ Não foi possível acessar o sistema de advertências.",
                    ephemeral: true
                });
            }
        }

        // ========================================
        // CRIAR ADVERTÊNCIA
        // ========================================

        const aviso = {
            id: Date.now(),
            usuarioId: usuario.id,
            moderadorId: interaction.user.id,
            motivo: motivo,
            data: new Date().toISOString()
        };

        warnings.push(aviso);

        // ========================================
        // SALVAR
        // ========================================

        fs.writeFileSync(
            caminhoWarnings,
            JSON.stringify(warnings, null, 4)
        );

        // ========================================
        // CONTADOR
        // ========================================

        const totalWarnings = warnings.filter(
            warning => warning.usuarioId === usuario.id
        ).length;

        // ========================================
        // RESPOSTA
        // ========================================

        await interaction.reply({
            content:
                "⚠️ **Advertência aplicada com sucesso!**\n\n" +
                `👤 **Membro:** ${usuario}\n` +
                `📝 **Motivo:** ${motivo}\n` +
                `📊 **Total de advertências:** ${totalWarnings}`,
        });
    }
};