const Discord = require('discord.js');

module.exports = {
    // Datos del comando
    data: new Discord.SlashCommandBuilder()
        .setName("random")
        .setDescription("Genera blablabla"),
    execute: async (interaction) => {
        const randomNum = Math.floor(Math.random() * 10);

        interaction
        .reply(`Tu número aleatorio es: ${randomNum}`)
        .catch(console.error);
    }
}