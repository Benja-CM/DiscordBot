const Discord = require('discord.js');

module.exports = {
    // Datos del comando
    data: new Discord.SlashCommandBuilder()
        .setName("reaction")
        .setDescription("Genera reacciones"),
    async execute(interaction, client) {
        const message = await interaction.reply({
            content: `React here!`,
            fetchReply: true,
        });

        message.react('😍');

        const filter = (reaction, user) => {
            return reaction.emoji.name === "😍" && user.id === interaction.user.id;
        };

        console.log(interaction.user.id);
        console.log(message.author.id);

        let collector = message.createReactionCollector({ filter: filter, time: 60000 })

        collector.on('collect', async (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            message.edit(`This nigga named ${user.tag} reacted with faggot emoji ${reaction.emoji.name}`);


            const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(user.id);
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
                console.error(error);
            }

        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);

        });
    },
};

