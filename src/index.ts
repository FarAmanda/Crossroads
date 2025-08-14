

import { Client, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, } from 'discord.js';

const client = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

// Event Listeners 

// "Triggered once when the bot successfully logs in and is ready"
client.once(Events.ClientReady, async (readyClient) => {

    console.log(`Logged in as ${readyClient.user?.tag}`);
        });

// "Triggered whenever a message is created in a channel the bot can read. Logs the author and message content."
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot)
        return;
    
    console.log(`${message.author.tag} said ${message.content}`);

    if (message.content === '!buttons') {
        console.log(`Catchphrase Detected!}`);
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId('Click_Yes')
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Primary),


                new ButtonBuilder()
                    .setLabel('Learn More')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://animemusicvideos.org'),

                new ButtonBuilder()
                    .setCustomId('Click_No')
                    .setLabel('Decline')
                    .setStyle(ButtonStyle.Danger)  
            );
            await message.channel.send({
                content: 'Do You Accept?',
                components: [row]
            });
        }
    });

// logs your bot in using the token from your environment variables.
await client.login(process.env.DISCORD_BOT_TOKEN);


