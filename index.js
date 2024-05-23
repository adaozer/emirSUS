const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { clientId, guildId, token, channelId } = require('./config.json');
const fs = require('fs');
const path = require('path');
const { map } = require('./map.js');  // Import the map

// Create a new client instance with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

// Create a collection to store commands
client.commands = new Collection();

// Load commands
const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('Failed to reload application (/) commands:', error);
    }
})();

// Ready event
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guild = client.guilds.cache.get(guildId);
    const botMember = await guild.members.fetch(client.user.id);
    console.log(`Bot permissions: ${botMember.permissions.toArray()}`);
});

// Command interaction handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

const cooldowns = new Map();
const emir = "477210142132273152";

client.on("messageCreate", async (msg) => {
    console.log(`Received a message from ${msg.author.id}`);
    if (msg.author.bot || msg.author.id !== emir) return;

    console.log(`Processing message from Emir`);

    let time = Date.now();
    const cooldownAmount = 1000; // 1 second
    const muteDuration = 15 * 1000; // 15 seconds
    const messageLimit = 3;

    if (!cooldowns.has(emir)) {
        cooldowns.set(emir, { messages: [], timeout: null });
    }

    const userData = cooldowns.get(emir);
    console.log(`User data before processing: ${JSON.stringify(userData)}`);
    userData.messages.push(time);

    // Remove messages older than the cooldown amount
    userData.messages = userData.messages.filter(timestamp => time - timestamp < cooldownAmount);
    console.log(`Messages within cooldown: ${JSON.stringify(userData.messages)}`);

    if (userData.messages.length > messageLimit) {
        // User exceeded the limit, mute them
        try {
            const user = await msg.guild.members.fetch(emir);
            console.log(`Fetched user: ${user.user.username}`);
            await user.timeout(muteDuration, 'EMİR SUUUUUUUUUUS');
            console.log(`${msg.author.username} has been muted for spamming.`);
            userData.messages = []; // Reset the message count after muting
            
            // Fetch the channel and send a message
            const channel = await client.channels.fetch(channelId);
            await channel.send('EMİR KAPA ÇENENİ');
            console.log('Message sent to the channel.');
        } catch (error) {
            console.error('Error muting user:', error);
        }
    }

    // Update the cooldown map
    cooldowns.set(emir, userData);
});

module.exports = { client };

// Login to Discord
client.login(token);
