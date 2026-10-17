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

    // SALON PIÈGE
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

    // FILTRE LIENS
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

// MESSAGE DE BIENVENUE
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

// =========================
// SYSTÈME DES RÔLES TIGREBOT
// =========================

const rolesTigre = {
  1: "Tigreau Nouveau-Né",
  2: "Tigreau Curieux",
  3: "Tigreau Aventurier",
  4: "Tigreau Intrépide",
  5: "Jeune Tigre",
  6: "Tigre Apprenti",
  7: "Tigre Éclaireur",
  8: "Tigre Explorateur",
  9: "Tigre Agile",
  10: "Tigre des Forêts",
  11: "Tigre Chasseur",
  12: "Tigre Traqueur",
  13: "Tigre Furtif",
  14: "Tigre Prédateur",
  15: "Tigre Redoutable",
  16: "Tigre Combattant",
  17: "Tigre Guerrier",
  18: "Tigre Berserker",
  19: "Tigre Impitoyable",
  20: "Tigre de Guerre",
  21: "Tigre Dominant",
  22: "Tigre Alpha",
  23: "Tigre Sauvage",
  24: "Tigre Suprême",
  25: "Maître Tigre",
  26: "Tigre Élite",
  27: "Tigre Ravageur",
  28: "Tigre Destructeur",
  29: "Tigre Infernal",
  30: "Tigre de Feu",
  31: "Tigre Légendaire",
  32: "Tigre Impérial",
  33: "Tigre Royal",
  34: "Tigre Céleste",
  35: "Tigre d'Or",
  36: "Tigre des Ombres",
  37: "Tigre Fantôme",
  38: "Tigre Obscur",
  39: "Tigre Immortel",
  40: "Tigre Mythique",
  41: "Tigre Divin",
  42: "Tigre Éternel",
  43: "Tigre Cosmique",
  44: "Tigre Astral",
  45: "Tigre des Dieux",
  46: "Tigre Ancestral",
  47: "Tigre de l'Apocalypse",
  48: "Empereur des Tigres",
  49: "Dieu des Tigres",
  50: "TIGRE ULTIME CDRICPA"
};

// =========================
// SYSTÈME DE RÉCOMPENSES VIA DRAFTBOT
// =========================

const LEVEL_UP_CHANNEL = "1553416417376997417";
const REWARD_CHANNEL = "1553429611197632522";
const SPECIAL_ACTIVE_CHANNEL = "1561093302793805904"; // texte lvl 10+
const VIP_VOICE_CHANNEL = "1561093892806541342";     // vocal lvl 30+
const PANTHEON_CHANNEL = "1561094039359594616";      // panthéon

client.on("messageCreate", async (message) => {

    if (message.channel.id !== LEVEL_UP_CHANNEL) return;
    if (!message.content.includes("vous venez de passer au niveau")) return;

    const user = message.mentions.users.first();
    if (!user) return;

    const match = message.content.match(/niveau\s+(\d+)/i);
    if (!match) return;

    const niveau = parseInt(match[1]);
    const roleName = rolesTigre[niveau];
    if (!roleName) return;

    const member = await message.guild.members.fetch(user.id);

    const role = message.guild.roles.cache.find(r => {
        const clean = r.name.replace(/^[^\w]+/, "").trim();
        return clean === roleName;
    });

    if (!role) return;

    // RÔLE ÉVOLUTIF : retirer anciens rôles AVANT d'ajouter le nouveau
    const allTigreRoles = Object.values(rolesTigre);

    for (const r of member.roles.cache.values()) {
        const clean = r.name.replace(/^[^\w]+/, "").trim();
        if (allTigreRoles.includes(clean)) {
            await member.roles.remove(r.id).catch(() => {});
        }
    }

    // Ajouter le rôle du niveau actuel
    try {
        await member.roles.add(role.id);
    } catch (err) {
        console.error("Erreur attribution rôle :", err);
    }

    // Emoji du niveau
    const emojiName = `CDRICPA_Niveau_${String(niveau).padStart(2, '0')}`;
    const emoji = message.guild.emojis.cache.find(e => e.name === emojiName);

    if (emoji) {
        try {
            await emoji.roles.add(role.id);
        } catch (err) {
            console.error("Erreur ajout rôle à emoji :", err);
        }
    }

    // DÉBLOCAGE SALON TEXTE NIVEAU 10+
    if (niveau >= 10) {
        try {
            const specialChannel = message.guild.channels.cache.get(SPECIAL_ACTIVE_CHANNEL);
            if (specialChannel) {
                await specialChannel.permissionOverwrites.edit(member.id, {
                    ViewChannel: true,
                    SendMessages: true,
                    ReadMessageHistory: true
                });

                console.log(`Salon spécial (lvl 10+) débloqué pour ${member.user.tag}`);
            }
        } catch (err) {
            console.error("Erreur déblocage salon spécial :", err);
        }
    }

    // DÉBLOCAGE SALON VOCAL VIP NIVEAU 30+
    if (niveau >= 30) {
        try {
            const vipVoice = message.guild.channels.cache.get(VIP_VOICE_CHANNEL);
            if (vipVoice) {
                await vipVoice.permissionOverwrites.edit(member.id, {
                    ViewChannel: true,
                    Connect: true,
                    Speak: true
                });

                console.log(`Salon vocal VIP (lvl 30+) débloqué pour ${member.user.tag}`);
            }
        } catch (err) {
            console.error("Erreur déblocage salon vocal VIP :", err);
        }
    }

    // EMBED MULTICOLORE NÉON
    try {
        const rewardChannel = message.guild.channels.cache.get(REWARD_CHANNEL);
        if (rewardChannel) {
            await rewardChannel.send({
                embeds: [{
                    title: "🎖 RÉCOMPENSE DÉBLOQUÉE",
                    description: `
💜══════════════════════════════════════════════════════💙
**${member}** vient de passer au **niveau ${niveau}** !

🎖 **Rôle obtenu :** ${role.name}  
🔓 **Emoji débloqué :** ${emoji ? `<:${emoji.name}:${emoji.id}>` : "Aucun emoji configuré"}  

🔥 **Puissance du Tigre :** +${niveau * 2}  
⚡ **Énergie Cosmique :** Activée  
🌈 **Cadre Néon Multicolore :** ON

${niveau >= 10 ? "💎 **Salon spécial débloqué :** <#1561093302793805904>" : ""}
${niveau >= 30 ? "🎧 **Salon vocal VIP débloqué :** <#1561093892806541342>" : ""}

Continue ta progression, guerrier du territoire tigre.
💚══════════════════════════════════════════════════════💛
                    `,
                    color: 0xFF00FF,
                    thumbnail: {
                        url: emoji ? emoji.url : null
                    },
                    footer: {
                        text: "✨ TigreBot – Énergie cosmique en expansion ✨"
                    }
                }]
            });
        }
    } catch (err) {
        console.error("Erreur envoi récompense :", err);
    }

    // PANTHÉON DES TIGRES
    try {
        const pantheonChannel = message.guild.channels.cache.get(PANTHEON_CHANNEL);
        if (pantheonChannel) {

            const members = await message.guild.members.fetch();
            let classement = [];

            members.forEach(m => {
                const tigreRole = m.roles.cache.find(r => {
                    const clean = r.name.replace(/^[^\w]+/, "").trim();
                    return allTigreRoles.includes(clean);
                });

                if (tigreRole) {
                    const clean = tigreRole.name.replace(/^[^\w]+/, "").trim();
                    const niv = parseInt(Object.keys(rolesTigre).find(key => rolesTigre[key] === clean));
                    if (!isNaN(niv)) {
                        classement.push({ member: m, niveau: niv, roleName: clean });
                    }
                }
            });

            classement.sort((a, b) => b.niveau - a.niveau);

            let texte = `👑 **PANTHÉON DES TIGRES – CLASSEMENT OFFICIEL**\n\n`;

            classement.slice(0, 20).forEach((entry, index) => {
                const place = index + 1;
                const medal = place === 1 ? "🥇" : place === 2 ? "🥈" : place === 3 ? "🥉" : "🔥";
                texte += `${medal} **${entry.roleName}** — <@${entry.member.id}> *(Niveau ${entry.niveau})*\n`;
            });

            texte += `\n⚡ *Classement mis à jour automatiquement à chaque montée de niveau.*`;

            await pantheonChannel.send(texte);
        }
    } catch (err) {
        console.error("Erreur mise à jour Panthéon :", err);
    }

});

client.login(process.env.DISCORD_TOKEN);
