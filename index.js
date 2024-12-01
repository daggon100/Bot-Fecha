require('dotenv').config({ path: 'token.env' }); // Cargar el token desde 'token.env'
const { Client, GatewayIntentBits } = require('discord.js');
const { RandomDate } = require('./randomDate');

// Crear una nueva instancia del cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Cuando el bot esté listo, imprimir en la consola
client.once('ready', () => {
    console.log('¡El bot está listo!');
});

// Comando para generar una fecha aleatoria
client.on('messageCreate', async (message) => {
    if (message.content.startsWith('/fecha')) {
        const date = RandomDate.generateRandomDate();
        const dayOfWeek = date.toLocaleString('es-ES', { weekday: 'long' });

        // Mostrar la fecha en un formato claro
        const formattedDate = date.toLocaleDateString('es-ES');  // Usa toLocaleDateString para dar una mejor presentación

        // Enviar la fecha al canal
        await message.channel.send(`Fecha generada: ${formattedDate}. ¿Qué día de la semana crees que es?`);

        // Esperar respuesta y validar
        const filter = (response) => {
            return response.author.id === message.author.id;
        };

        message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then((collected) => {
                const userResponse = collected.first().content.trim().toLowerCase();

                // Compara la respuesta con el día de la semana generado
                if (userResponse === dayOfWeek.toLowerCase()) {
                    message.channel.send('¡Correcto!');
                } else {
                    message.channel.send(`¡Incorrecto! Fue un ${dayOfWeek}.`);
                }
            })
            .catch(() => {
                message.channel.send('¡Tiempo agotado! No recibí una respuesta.');
            });
    }
});

// Iniciar sesión con el token del bot
client.login(process.env.BOT_TOKEN); // Cargar el token desde el archivo 'token.env'
