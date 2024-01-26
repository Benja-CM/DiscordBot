const Discord = require('discord.js');

module.exports = {
    // Datos del comando
    data: new Discord.SlashCommandBuilder()
        .setName("rainbow")
        .setDescription("Genera blablabla"),
    async execute(interaction) {
        const message = await interaction.reply({
            content: `:red_square::orange_square::yellow_square::green_square::blue_square::purple_square:`,
            fetchReply: true,
        });

        const squares = [
            `:orange_square:`,
            `:yellow_square:`,
            `:green_square:`,
            `:blue_square:`,
            `:purple_square:`,
            `:red_square:`,
        ];

        let i = 0;

        const interval = setInterval(async () => {
            const updatedContent = squares.slice(i).concat(squares.slice(0, i)).join('');
            await message.edit(updatedContent);
            i = (i + 1) % squares.length; // Actualiza i y asegúrate de que sea un valor válido
            console.log(i);
        }, 30); // Espera 30 milisegundos antes de continuar

        // No olvides detener el intervalo cuando ya no lo necesites.
        setTimeout(() => {
            clearInterval(interval);
        }, 5000); // Detén el intervalo después de 5 segundos.
    }
}