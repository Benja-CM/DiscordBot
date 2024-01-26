const Discord = require('discord.js');

module.exports = {
    // Datos del comando
    data: new Discord.SlashCommandBuilder()
        .setName("random_reaction")
        .setDescription("Genera blablabla"),
        async execute(interaction) {
            
            // Guardar referencia a la interacción
            const commandInteraction = interaction;
        
            // Posponer la respuesta a la interacción
            await commandInteraction.deferReply();
        
            const randomNum = Math.floor(Math.random() * 10);
        
            // Crear el mensaje y agregar reacciones
            const reply = await commandInteraction.editReply({ content: `Tu número aleatorio es: ${randomNum}`, fetchReply: true });
            await reply.react('🔄');
            await reply.react('🔁');
        
            // Esperar reacciones
            const filter = (reaction, user) => ['🔄', '🔁'].includes(reaction.emoji.name) && !user.bot;
            const collected = await reply.awaitReactions({ filter, max: 2, time: 10000, errors: ['time'] });
        
            // Verificar y manejar las reacciones
            for (const reaction of collected.values()) {
                if (reaction.emoji.name === '🔄') {
                    console.log("1")
                    const newRandomNum = Math.floor(Math.random() * 10);
                    await reply.edit(`Nuevo número aleatorio: ${newRandomNum}`);
                } else if (reaction.emoji.name === '🔁') {
                    console.log("2")
                    await reply.delete();
                }
            }
        }
}