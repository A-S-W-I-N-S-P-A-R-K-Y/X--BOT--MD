const {
	Sparky,
	isPublic
} = require("../lib/");


Sparky({
		name: "jid",
		fromMe: isPublic,
		category: "misc",
		desc: "Gets the unique ID of a whatsapp chat or user."
	},
	async ({
		m
	}) => {
		return await m.reply(`${m?.quoted ? m?.quoted?.sender : m.jid}`);
	});


Sparky({
		name: "runtime",
		fromMe: isPublic,
		category: "misc",
		desc: "Shows the bot's current runtime."
	},
	async ({
		m
	}) => {
		return await m.reply(`_Runtime : ${await m.runtime()}_`);
	});


Sparky({
		name: "ping",
		fromMe: isPublic,
		category: "misc",
		desc: "Checks if the bot is online and responsive."
	},
	async ({
		m
	}) => {
		const start = new Date().getTime();
		let pong = await m.sendMsg(m.jid, "_Checking Ping..._", {
			quoted: m
		});
		const end = new Date().getTime();
		return await m.sendMsg(m.jid, `_🆇-𝗕𝗢𝗧 ѕρєє∂   ➳ : ${end - start} ʍȿ╏_`, {
			edit: pong.key
		});
	});


Sparky({
		name: "wame",
		fromMe: isPublic,
		category: "misc",
		desc: "Converts a phone number into a whatsapp link."
	},
	async ({
		m,
		args
	}) => {
		return await m.reply(`https://wa.me/${m?.quoted ? m?.quoted?.sender?.split("@")[0] : m?.sender?.split("@")[0]}${args ? `?text=${args}` : ''}`);
	});
