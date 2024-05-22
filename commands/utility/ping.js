const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emir') // It's better to use lowercase for command names
        .setDescription('Çabuk'),
    async execute(interaction) {
        await interaction.reply('SUS!');
    },
};
