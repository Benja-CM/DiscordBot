// Requerimientos
const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const { disconnect } = require('process');
const { GatewayIntentBits, Partials } = require('discord.js');

// Definir Cliente
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ],
});

// Cargar comandos
client.commands = new Discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandfile) => {
    const command = require(`./slash_commands/${commandfile}`);
    client.commands.set(command.data.name, command);
})

// Registrar Comandos
const REST = new Discord.REST().setToken(config.CLIENT_TOKEN);

(async () => {
    try {
        await REST.put(
            Discord.Routes.applicationGuildCommands(config.clientId, config.guildId),
            {
                body: client.commands.map((cmd) => cmd.data.toJSON()),
            }
        );
        console.log(`Cargado ${client.commands.size} slash commands {/}`);
    } catch (error) {
        console.log("Error al cargar comandos.", error);
    }
})();

// Contenido (Eventos)
client.on('ready', async (client) => (
    console.log(`Listo ${client.user.tag}!`)
));

// Command

client.on(Discord.Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
});

// Eventos interactivos
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Hubo un error al ejecutar este comando!', ephemeral: true });
    }
})

// Conectar
client.login(config.CLIENT_TOKEN);