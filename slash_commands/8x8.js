const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    // Datos del comando
    data: new Discord.SlashCommandBuilder()
        .setName("8x8")
        .setDescription("Genera una cuadricula de 8x8"),

    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Cuadricula de 8x8')
            .setDescription(cuadricula())
            .setThumbnail('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f34fbe1b-d023-47db-971f-d953591094ee/deoagn8-011a24d0-6bf6-4732-a1e2-9c3f97ba8c6c.png/v1/fit/w_375,h_347,q_70,strp/pierce_her_by_burntbeebs_deoagn8-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTE4NiIsInBhdGgiOiJcL2ZcL2YzNGZiZTFiLWQwMjMtNDdkYi05NzFmLWQ5NTM1OTEwOTRlZVwvZGVvYWduOC0wMTFhMjRkMC02YmY2LTQ3MzItYTFlMi05YzNmOTdiYThjNmMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.25iZImmcja98qNyJ8bk6z8_yrW2ZBiXLfhbUVFYD9qY')
            .setTimestamp()

        const message = await interaction.reply({ 
            embeds: [exampleEmbed],
            fetchReply: true,
            ephemeral: false,
         });

        message.react('👍');
    }
}

function cuadricula() {
    let board = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            board += ":white_square_button:";

            if (col == 8 - 1)
                board += "\n";
        }

    }

    return board;
}

