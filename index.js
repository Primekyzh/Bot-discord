const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// =========================
// BOT CONNECTÉ
// =========================

client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// =========================
// MESSAGE DE BIENVENUE TIGRE (EMBED)
// =========================

client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.cache.get("978326024070778940");
    if (!channel) return;

    const embedBienvenue = new EmbedBuilder()
        .setColor(0x8A2BE2)
        .setTitle("🐯🔥 BIENVENUE SUR LE TERRITOIRE DU TIGRE ! 🔥🐯")
        .setDescription(
`💜🧡 **TEAM CDRICPA** 🧡💜

🎉 Un nouveau guerrier vient de rejoindre la meute !

👋 Bienvenue à toi ${member} !

🐯 Tu viens de pénétrer sur le territoire du **TIGRE CDRICPA** !

Ici, on protège les nôtres, on rugit ensemble et on ne laisse jamais un membre de la team derrière ! 💪🔥

Que tu sois un joueur compétitif, un amateur de Warzone ou simplement là pour passer de bons moments, tu fais désormais partie de la **famille CSFra** ! ❤️

⚔️ Alors prends place, guerrier, et prépare-toi à rugir avec nous !

━━━━━━━━━━━━━━━━━━━━

🧭 📍 **DÉCOUVRE TON NOUVEAU TERRITOIRE**

📅・<#978680984310538270>  
🤖・<#978327756297355274>  
💬・<#978327703516229722>  
📸・<#978327734583427122>  
🔫・<#1083867615971266562>  
📺・<#1169058360813948938>  
🎧・<#1326137657990053959>  
🎥・<#978330403708502076>

━━━━━━━━━━━━━━━━━━━━

📜 🛡️ **LES RÈGLES DU TERRITOIRE**

🤝 RESPECT — Ici, tout le monde mérite sa place.  
💜 ENTRAIDE — Un tigre ne laisse jamais tomber les siens.  
😂 BONNE HUMEUR — Du fun, du chill et des fous rires !  
🔥 SOLIDARITÉ — Ensemble, la Team CDRICPA est plus forte !

━━━━━━━━━━━━━━━━━━━━

🎯 🔥 **TA PREMIÈRE MISSION !**

🐯 Présente-toi dans le salon <#978327703516229722> !

💬 Dis-nous depuis combien de temps tu joues à Call of Duty et quel est ton mode préféré : BR ou Résurgence ? 👀

❤️ N'hésite pas à participer aux discussions et à rejoindre les autres membres !

━━━━━━━━━━━━━━━━━━━━

🐯💜 **LE MOT DE CDRICPA**

« Ici, on ne cherche pas à être les meilleurs individuellement.  
On cherche à construire la meilleure communauté ensemble ! »

🔥 **UN TIGRE EST FORT, MAIS UNE MEUTE DE TIGRES EST INARRÊTABLE !** 🐯

🎥 TikTok : @cdricpa  
👑 Communauté : TEAM CDRICPA

🐯 **BIENVENUE DANS LA FAMILLE !** 💜🧡`
        )
        .setFooter({ text: "TEAM CDRICPA – La meute rugit ensemble 🐯🔥" });

    channel.send({ embeds: [embedBienvenue] });
});
// =========================
// CONFIG
// =========================

const TRAP_CHANNEL_ID = "1553398885181956177";
const LEVEL_UP_CHANNEL = "1562381652880269363";
const REWARD_CHANNEL = "1562381909286191134";
const SPECIAL_ACTIVE_CHANNEL = "1562020467626475541";
const PANTHEON_CHANNEL = "1561871939507847250";

const DRAFTBOT_ID = "318312854816161792";
const ALLOWED_LINK = "https://cdricpa.fr/";

// =========================
// ROLES TIGRE
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
// MESSAGE CREATE FUSIONNÉ
// =========================

client.on("messageCreate", async (message) => {

    // 1️⃣ SALON PIÈGE (BAN)
    if (!message.author.bot && message.channel.id === TRAP_CHANNEL_ID) {
        try {
            await message.guild.members.ban(message.author.id, {
                reason: "Salon piège : activité suspecte"
            });

            const fetched = await message.channel.messages.fetch({ limit: 20 });
            const userMessages = fetched.filter(msg => msg.author.id === message.author.id);
            await message.channel.bulkDelete(userMessages);

            console.log(`🔥 ${message.author.tag} piégé et banni.`);
        } catch (err) {
            console.error("Erreur salon piège :", err);
        }
        return;
    }

    // 2️⃣ ANTI-LIEN (GIFs + attachments autorisés)
    if (!message.author.bot) {

        if (message.attachments.size > 0) {
            return;
        }

        if (message.embeds.length > 0) {
            return;
        }

        const urlRegex = /(https?:\/\/[^\s]+)/gi;

        if (urlRegex.test(message.content)) {

            if (message.content.includes(ALLOWED_LINK)) return;

            try {
                await message.delete();
            } catch (err) {
                console.error("Erreur suppression lien :", err);
            }
        }
    }

    // 3️⃣ RÉCOMPENSES COSMIQUES (DraftBot)
    if (message.channel.id === LEVEL_UP_CHANNEL && message.author.id === DRAFTBOT_ID) {

        const text =
            message.content ||
            message.embeds[0]?.description ||
            message.embeds[0]?.title ||
            "";

        console.log("Texte DraftBot détecté:", text);

        if (!text.toLowerCase().includes("vous venez de passer au niveau")) return;

        let match = text.match(/niveau\s+(\d+)/i);
        if (!match) {
            const cleaned = text.replace(/[^\d]/g, "");
            if (cleaned) match = [null, cleaned];
        }
        if (!match) return;

        const niveau = parseInt(match[1]);
        console.log("Niveau détecté:", niveau);

        const roleName = rolesTigre[niveau];
        if (!roleName) return;

        const roleNameClean = roleName.replace(/^[^\w]+/, "").trim();

        const role = message.guild.roles.cache.find(r => {
            const clean = r.name.replace(/^[^\w]+/, "").trim();
            return clean === roleNameClean;
        });

        console.log("Role recherché:", roleNameClean);
        console.log("Role trouvé:", role ? role.name : "AUCUN");

        if (!role) return;

        let user = message.mentions.users.first();
        if (!user) {
            const idMatch = text.match(/<@!?(\d+)>/);
            if (idMatch) {
                user = await message.guild.members.fetch(idMatch[1]).then(m => m.user).catch(() => null);
            }
        }
        if (!user) return;

        console.log("User détecté:", user.tag);

        const member = await message.guild.members.fetch(user.id);

        // Retirer tous les anciens rôles Tigre AVANT d'ajouter le nouveau
        const allTigreRoles = Object.values(rolesTigre);

        for (const r of member.roles.cache.values()) {
            const clean = r.name.replace(/[^\w]+/, "").trim();
            if (allTigreRoles.includes(clean)) {
                await member.roles.remove(r.id).catch(() => {});
            }
        }

        // Ajouter le nouveau rôle Tigre
        await member.roles.add(role.id).catch(() => {});
        // Emoji correspondant au niveau
        const emojiName = `CDRICPA_Niveau_${String(niveau).padStart(2, '0')}`;
        const emoji = message.guild.emojis.cache.find(e => e.name === emojiName);

        const emojiDisplay = emoji ? `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>` : "🔥";
        const imageUrl = emoji ? `https://cdn.discordapp.com/emojis/${emoji.id}.png` : null;

        const embed = {
            title: "🏅 RÉCOMPENSE DÉBLOQUÉE",
            color: 0x8A2BE2,
            thumbnail: imageUrl ? { url: imageUrl } : null,
            description: `💜\n────────────────────────────── 💙\n\n${member} vient de passer au **niveau ${niveau}** !\n\n`,
            fields: [
                { name: "🎖 Rôle obtenu :", value: `🐯 ${roleName}` },
                { name: "🎨 Emoji débloqué :", value: `${emojiDisplay}` },
                { name: "⚡ Puissance du Tigre :", value: `+${niveau * 2}`, inline: true },
                { name: "🌌 Énergie Cosmique :", value: "Activée", inline: true },
                { name: "🌈 Cadre Néon Multicolore :", value: "ON", inline: true },
                { name: "💬 Salon spécial débloqué :", value: `<#${SPECIAL_ACTIVE_CHANNEL}>` }
            ],
            footer: { text: "🐯 TigreBot – Énergie cosmique en expansion ✨" }
        };

        const rewardChannel = message.guild.channels.cache.get(REWARD_CHANNEL);
        if (rewardChannel) rewardChannel.send({ embeds: [embed] });

        // 4️⃣ PANTHÉON
        try {
            const pantheonChannel = message.guild.channels.cache.get(PANTHEON_CHANNEL);
            if (!pantheonChannel) return;

            const members = await message.guild.members.fetch();
            let classement = [];

            const allTigreRolesPantheon = Object.values(rolesTigre);

            members.forEach(m => {
                const tigreRole = m.roles.cache.find(r => {
                    const clean = r.name.replace(/^[^\w]+/, "").trim();
                    return allTigreRolesPantheon.includes(clean);
                });

                if (tigreRole) {
                    const clean = tigreRole.name.replace(/^[^\w]+/, "").trim();
                    const niv = parseInt(Object.keys(rolesTigre).find(key => rolesTigre[key] === clean));
                    if (!isNaN(niv)) {
                        classement.push({ member: m, niveau: niv, roleName: tigreRole.name });
                    }
                }
            });

            classement.sort((a, b) => b.niveau - a.niveau);

            let texte = `👑 **PANTHÉON DES TIGRES – CLASSEMENT OFFICIEL**\n\n`;
            classement.slice(0, 20).forEach((entry, index) => {
                const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🔥";
                texte += `${medal} **${entry.roleName}** — <@${entry.member.id}> *(Niveau ${entry.niveau})*\n`;
            });
            texte += `\n⚡ *Classement mis à jour automatiquement.*`;

            pantheonChannel.send(texte);

        } catch (err) {
            console.error("Erreur panthéon :", err);
        }
    }
});

// =========================
// TOKEN
// =========================

client.login(process.env.DISCORD_TOKEN);

