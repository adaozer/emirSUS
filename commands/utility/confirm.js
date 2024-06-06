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
            let flag = false;
            for (let i = 0; i < user_map[user].length; i++) {
                if (user_map[user][i] == "A") {
                    creds += 40
                    flag = true
                } else if (user_map[user][i] == "B") {
                    creds += 20
                    flag = true
                } else {
                    creds += map[user_map[user][i]];
                }
            }
            if (creds == 120 && flag) {
                await interaction.reply('Success')
            } else {
                if (creds != 120 && !flag) {
                await interaction.reply(`Your credits don't equal 120 and you don't have BSc or MEng selected. You have ${creds} credits.`)
                } else if (creds != 120) {
                    await interaction.reply(`Your credits don't equal 120. You have ${creds} credits.`)
                } else {
                    await interaction.reply("You don't have MEng or BSc selected.")
                }
            }
        }

    },
};
