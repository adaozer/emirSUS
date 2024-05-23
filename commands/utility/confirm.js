const { SlashCommandBuilder } = require('discord.js');
const { map, user_map } = require('C:/Users/Ada/Documents/emir_sus/map.js');  // Import the map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirm') // It's better to use lowercase for command names
        .setDescription('Confirms your modules and gives you the respective roles.'),
    async execute(interaction) {
        const user = interaction.user.id;
        if (!user_map[user]) {
            await interaction.reply("You can't use this command yet. Add some modules first.");
        } else {
            let creds = 0;
            for (let i = 0; i < user_map[user].length; i++) {
                creds += map[user_map[user][i]];
            }
            if (creds != 120) {
                await interaction.reply(`Your credits don't equal 120. You have ${creds} credits.`)
            } else {
                await interaction.reply("Success")
            }
        }

    },
};
