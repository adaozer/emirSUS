const { SlashCommandBuilder } = require('discord.js');
const { map, user_map } = require('C:/Users/Ada/Documents/emir_sus/map.js');  // Import the map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits') // It's better to use lowercase for command names
        .setDescription('Check credits'),
    async execute(interaction) {
        const user = interaction.user.id;
        if (!user_map[user]) {
            await interaction.reply("You can't use this command yet. Add some modules first.");
        } else {
            let creds = 0;
            for (let i = 0; i < user_map[user].length; i++) {
                if (user_map[user][i] == "A") {
                    creds += 40
                } else if (user_map[user][i] == "B") {
                    creds += 20
                } else {
                    creds += map[user_map[user][i]][0];
                }
            }
            await interaction.reply(`You have ${creds} credits.`)
        }

    },
};
