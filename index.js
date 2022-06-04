const { Client, Intents, MessageEmbed } = require('discord.js');
const { token, projects } = require('./config.json');
const { scrapbox, createTitleAndUrlForLink } = require('./scrapbox.js')

const client = new Client({
    // Intents.FLAGS.GUILDS necessary for functionality.
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    // Partials necessary to receive events from messages that were sent before the bot was active.
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const emojis = projects.map(p => p.emoji);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageReactionAdd', async (reaction, user) => {
    const projectIndex = emojis.indexOf(reaction.emoji.name);

    // Emoji not a trigger or not the first reaction
    if (projectIndex == -1 || reaction.count > 1) return;

    // reaction.partial if the structure is partial i.e. the message the reaction is attached to is not cached.
    if (reaction.partial) {
        // If the message the reaction is attached to was removed,
        // the fetching might result in an API error which should be handled.
        try {
            await reaction.fetch();
        } catch (error) {
            console.error(error);
        }
    }

    const titleAndLink = await createTitleAndUrlForLink(projects[projectIndex].url, reaction);
    const title = titleAndLink[0];
    const url = titleAndLink[1];

    if (url) {
        const success = await scrapbox(url, reaction);
        if (success) {
            reaction.message.react('✅');
            const successEmbed = new MessageEmbed()
                .setTitle('New scrapbox page')
                .setURL(new URL(encodeURIComponent(title), projects[projectIndex].url))
                .setDescription(title);
            reaction.message.channel.send({ embeds: [successEmbed] });
            return;
        }
    }

    reaction.message.react('❌');
});

client.login(token);
