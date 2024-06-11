const { SlashCommandBuilder } = require('discord.js');
const { map, user_map } = require('C:/Users/Ada/Documents/emir_sus/map.js');  // Import the map


module.exports = {
    data: new SlashCommandBuilder()
        .setName('module-remove')
        .setDescription('Remove a module')
        .addStringOption(option => {
            option.setName('module')
                .setDescription('Select Module')
                .setRequired(true);

            // Assuming 'map' is defined somewhere above this code block
            if (map && typeof map === 'object') {
                // Extract keys from the map where the value is an array
                const choices = Object.keys(map).map(key => {
                    const value = map[key];
                    if (Array.isArray(value)) {
                        return { name: key, value: key };
                    }
                }).filter(choice => choice !== undefined); // Filter out undefined values
                
                option.addChoices(...choices);
            } else {
                console.error('Map is undefined or not an object');
            }

            return option;
        }),
    async execute(interaction) {
        const user = interaction.user.id
        const module = interaction.options.getString('module');
    
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
