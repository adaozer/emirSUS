const { SlashCommandBuilder } = require('discord.js');
const { map, user_map } = require('C:/Users/Ada/Documents/emir_sus/map.js');  // Import the map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pick-degree')
        .setDescription('BSc or MEng')
        .addStringOption(option => {
            option.setName('degree')
                .setDescription('Select degree')
                .setRequired(true)
                .addChoices("BSc")
                .addChoices("MEng")
        }),
    async execute(interaction) {
        const user = interaction.user.id;
        const degree = interaction.options.getString('degree');
        
        if (!user_map[user]) {
            await interaction.reply("You don't have any modules added.")
        } else {
        if (user_map[user].indexOf(module) < 0) {
            await interaction.reply("You don't have this module added.")
        } else {
            await user_map[user].splice(user_map[user].indexOf(module), 1);
            await interaction.reply(`Removed ${module}`)
            console.log(user_map);
        } }
    },
};
