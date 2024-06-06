const { SlashCommandBuilder } = require('discord.js');
const { map, user_map } = require('C:/Users/Ada/Documents/emir_sus/map.js');  // Import the map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pick-degree')
        .setDescription('BSc or MEng')
        .addStringOption(option => 
            option.setName('degree')
                .setDescription('Select degree')
                .setRequired(true)
                .addChoices(
                    { name: 'BSc', value: 'BSc' },
                    { name: 'MEng', value: 'MEng' }
                )
        ),
    async execute(interaction) {
        const user = interaction.user.id;
        const degree = interaction.options.getString('degree');

        if (!user_map[user]) {
            user_map[user] = [];
        }

        if (degree === 'BSc') {
            if (user_map[user].includes('A')) {
                await interaction.reply("You already have BSc selected.");
            } else if (user_map[user].includes('B')) {
                user_map[user].push('A');
                user_map[user] = user_map[user].filter(item => item !== 'B');
                await interaction.reply("Switched from MEng to BSc.");
            } else {
                user_map[user].push('A');
                await interaction.reply("BSc selected.");
            }
        } else if (degree === 'MEng') {
            if (user_map[user].includes('B')) {
                await interaction.reply("You already have MEng selected.");
            } else if (user_map[user].includes('A')) {
                user_map[user].push('B');
                user_map[user] = user_map[user].filter(item => item !== 'A');
                await interaction.reply("Switched from BSc to MEng.");
            } else {
                user_map[user].push('B');
                await interaction.reply("MEng selected.");
            }
        }
    },
};
