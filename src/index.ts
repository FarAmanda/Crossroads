import { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags} from 'discord.js';

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
const token = process.env.DISCORD_TOKEN;

const client = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
}) as Client & { commands: Collection<string, any> };


client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


for (const folder of commandFolders){
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // set a new item in the collection with the key as the command name
        // and the value as the exported module
        if ('data' in command && 'execute' in command)
        {
            client.commands.set(command.data.name, command);

        } 
        else {
            console.log (`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
// Event Listeners 

// "Triggered once when the bot successfully logs in and is ready"
client.once(Events.ClientReady, async (readyClient) => {

    console.log(`Logged in as ${readyClient.user?.tag}`);
        });

// "Triggered whenever a message is created in a channel the bot can read. Logs the author and message content."



client.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});


client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot)
        return;
    else console.log(`[Received message: "${message.content}" from ${message.author.tag}`);

    
    console.log(`${message.author.tag} said ${message.content}`);

    if (message.content === '!buttons') {
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


