const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

const TRAP_CHANNEL_ID = "1553398885181956177";
const ALLOWED_LINK = "https://cdricpa.fr/";

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.channel.id === TRAP_CHANNEL_ID) {
        try {
            await message.guild.members.ban(message.author.id, {
                reason: "Salon piège : activité suspecte"
            });

            const fetched = await message.channel.messages.fetch({ limit: 20 });
            const userMessages = fetched.filter(msg => msg.author.id === message.author.id);

            await message.channel.bulkDelete(userMessages);

            console.log(`🔥 ${message.author.tag} a été piégé, banni et messages supprimés.`);
        } catch (err) {
            console.error("Erreur salon piège :", err);
        }
        return;
    }

    const urlRegex = /(https?:\/\/[^\s]+)/gi;

    if (urlRegex.test(message.content)) {

        if (message.content.includes(ALLOWED_LINK)) {
            console.log(`Lien autorisé (boutique) : ${message.content}`);
            return;
        }

        const isGif =
            message.content.includes(".gif") ||
            message.content.includes("/gifs/") ||
            message.content.includes("tenor.com") ||
            message.content.includes("giphy.com") ||
            message.content.includes("cdn.discordapp.com");

        if (isGif) {
            console.log(`GIF autorisé : ${message.content}`);
            return;
        }

        try {
            await message.delete();
            console.log(`Lien supprimé : ${message.content}`);
        } catch (err) {
            console.error("Erreur suppression lien :", err);
        }
    }
});

client.on('guildMemberAdd', async (member) => {
    try {
        const channel = member.guild.channels.cache.get("1553398596550918243");
        if (!channel) return;

        await channel.send({
            embeds: [{
                title: "🐯 Bienvenue chez les Tigres !",
                description: `<@${member.id}>    
Tu viens d’arriver dans le territoire du tigre.  
Ici, on protège les nôtres, on rugit ensemble,  
et on
