const { SlashCommandBuilder } = require('discord.js');
const { map, user_map } = require('C:/Users/Ada/Documents/emir_sus/map.js');  // Import the map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirm') // It's better to use lowercase for command names
        .setDescription('Confirms your modules and gives you the respective roles.'),
    async execute(interaction) {
        const user = interaction.user.id;

        // Acknowledge the interaction immediately
        await interaction.deferReply({ ephemeral: true });

        if (!user_map[user]) {
            await interaction.editReply("You can't use this command yet. Add some modules first.");
            return;
        }

        let creds = 0;
        let flag = false;
        for (let i = 0; i < user_map[user].length; i++) {
            if (user_map[user][i] === "A") {
                creds += 40;
                flag = true;
            } else if (user_map[user][i] === "B") {
                creds += 20;
                flag = true;
            } else {
                creds += map[user_map[user][i]][0];
            }
        }

        if (creds === 120 && flag) {
            try {
                const member = await interaction.guild.members.fetch(user);

                for (let i = 0; i < user_map[user].length; i++) {
                    if (user_map[user][i] === "A") {
                        await member.roles.add("1250149486571819008");
                    } else if (user_map[user][i] === "B") {
                        await member.roles.add("1250149448194199624");
                    } else if (user_map[user][i] === "Elective-10-Creds" || user_map[user][i] === "Elective-20-Creds") {
                        continue;
                    } else {
                        await member.roles.add(map[user_map[user][i]][1]);
                    }
                }

                await interaction.editReply('Success');
            } catch (error) {
                console.error(error);
                await interaction.editReply('An error occurred while assigning roles.');
            }
        } else {
            if (creds !== 120 && !flag) {
                await interaction.editReply(`Your credits don't equal 120 and you don't have BSc or MEng selected. You have ${creds} credits.`);
            } else if (creds !== 120) {
                await interaction.editReply(`Your credits don't equal 120. You have ${creds} credits.`);
            } else {
                await interaction.editReply("You don't have MEng or BSc selected.");
            }
        }
    },
};
