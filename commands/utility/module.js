const { SlashCommandBuilder } = require('discord.js');
const { map, user_map } = require('C:/Users/Ada/Documents/emir_sus/map.js');  // Import the map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modules') // It's better to use lowercase for command names
        .setDescription('Check selected modules'),
    async execute(interaction) {
        const user = interaction.user.id;
        if (!user_map[user]) {
            await interaction.reply("You can't use this command yet. Add some modules first.");
        } else {
            let modules = [];
            for (let i = 0; i < user_map[user].length; i++) {
                if (user_map[user][i] == "A") {
                    modules.push("BSc")
                } else if (user_map[user][i] == "B") {
                    modules.push("MEng")
                } else {
                    modules.push([user_map[user][i]]);
                }
            }
            await interaction.reply(modules.join(', '));
        }

    },
};
