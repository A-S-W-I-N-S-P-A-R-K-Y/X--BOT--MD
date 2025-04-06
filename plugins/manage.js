const {
    Sparky,
    isPublic,
    setData,
    getData
} = require('../lib');
const {getString} = require('./pluginsCore');
const lang = getString('group');

// Sparky({
//     name: "antidemote",
//     fromMe: true,
//     desc: "manage",
//     category: "manage",
// },
// async ( { args, m }) => {
//     if (!m.isGroup) return await m.reply(lang.NOT_GROUP);
//     const { antidemote } = await getData(m.jid);
//     if (!args) return await m.reply(`_*Antidemote manager*_\n_Current status: ${antidemote.status}_\n_Use antidemote on/off_`);
//     if (args != 'on' && args != 'off') return m.reply('_antidemote on_');
//     if (args === 'on') {
//         if (antidemote && antidemote.status == 'true') return m.reply('_Already activated_');
//         await setData(m.jid, "active", "true", "antidemote");
//         return await m.reply('_activated_');
//     } else if (args === 'off') {
//         if (antidemote && antidemote.status == 'false') return m.reply('_Already Deactivated_');
//         await setData(m.jid, "disactive", "false", "antidemote");
//         return await m.reply('_deactivated_')
//     }
// }
// )

Sparky({
    name: "pair",
    fromMe: isPublic,
    category: "misc",
    desc: ""
},
async ({
    m, client, args
}) => {
    try {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        if (!args) {
            return await m.reply("_Example : .pair 917012984396_");
        }
        const pair = await getJson(`https://x-bot-md-qr.koyeb.app/code?number=${args}`);
        if (!pair || !pair.code) {
            return await m.reply("Failed to retrieve pairing code. Please check the phone number and try again.");
        }
        const pairingCode = pair.code;
        await m.reply(`*PAIR CODE : ${pairingCode}*\n\n How to Link: 
1. Open WhatsApp on your phone.
2. Go to Settings > Linked Devices.
3. Tap Link a Device then Link with Phone.
4. Enter the pair code above.
5. Alternatively, tap the WhatsApp notification sent to your phone.
\n⏳ *Code expires in 2 minutes!*`);
        await sleep(2000);
        await m.reply(`${pairingCode}`);
    } catch (error) {
        console.error(error);
        await m.reply(error);
    }
});