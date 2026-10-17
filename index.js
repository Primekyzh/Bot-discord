const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// ID du salon piège
const TRAP_CHANNEL_ID = "1553398885181956177";

// Lien autorisé (boutique)
const ALLOWED_LINK = "https://cdricpa.fr/";

// MessageCreate unique
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // 🔥 1) SALON PIÈGE (prioritaire)
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

    // 🔥 2) ANTI-LIEN (GIF autorisés + lien spécifique autorisé)
    const urlRegex = /(https?:\/\/[^\s]+)/gi;

    if (urlRegex.test(message.content)) {

        // ✔️ Autoriser le lien spécifique
        if (message.content.includes(ALLOWED_LINK)) {
            console.log(`Lien autorisé (boutique) : ${message.content}`);
            return;
        }

        // ✔️ Autoriser GIF
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

        // ❌ Supprimer tous les autres liens
        try {
            await message.delete();
            console.log(`Lien supprimé : ${message.content}`);
        } catch (err) {
            console.error("Erreur suppression lien :", err);
        }
    }
});

// Message de bienvenue
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
et on chasse les intrus.  
Prends place, guerrier.  
Prends le temps de découvrir le Discord et de rejoindre la communauté !

**Salons principaux :**
• 📅 <#1553398597041787074>
• 🤖 <#1553398597549293620>
• 💬 <#1553398597549293619>
• 📸 <#1553398597549293621>
• 🔫 <#1553398597549293622>
• 📺 <#1553398597549293625>
• 🎧 <#1553398598039900272>
• 🎥 <#1553398597549293623>`,
                image: {
                    url: "https://cdn.discordapp.com/attachments/1552945997209014363/1552950076429832293/ezgif-50878ceaaba0744c.gif"
                },
                color: 0xFF9900
            }]
        });

        console.log(`Message de bienvenue tigre envoyé pour ${member.user.tag}`);
    } catch (err) {
        console.error("Erreur message de bienvenue tigre :", err);
    }
});

// LOGIN DU BOT
client.login(process.env.DISCORD_TOKEN);

