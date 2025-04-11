const { Sparky, isPublic, spdl } = require("../lib");
const { getJson, extractUrlsFromText, getString, isUrl } = require("./pluginsCore");
const axios = require('axios');
const fetch = require('node-fetch');
const config = require("../config.js");
const lang = getString('download');


Sparky(
    {
        name: "insta",
        fromMe: isPublic,
        desc: "Instagram media downloader - download images and videos from Instagram",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply(lang.NEED_URL);
        //if (isUrl(args)) return await m.reply(lang.NOT_URL);
        let dl = await client.sendMessage(m.jid, {
            text: lang.DOWNLOADING
        }, {
            quoted: m
        })
        try {
            let response = await getJson(config.API + "/api/downloader/igdl?url=" + args);
            for (let i of response.data) {
                await m.sendMsg(m.jid, i.url, { quoted: m }, i.type)
            }
        } catch (e) {
            console.log(e);
            client.sendMessage(m.jid, {
                text: lang.ERROR, edit: dl.key
            })
        }
    }
);


// Sparky({
//     name: "apk",
//     fromMe: isPublic,
//     category: "downloader",
//     desc: "Find and download APKs from Aptoide by app ID",
// },
// async ({
//     m, client, args
// }) => {
//     let appId = args || m.quoted?.text;
//     if (!appId) return await m.reply(lang.NEED_Q);

//     try {
//         await m.react('⬇️');

//         const { result: appInfo } = await getJson(AP + "download/aptoide?id=" + appId);
        
//         await client.sendMessage(m.jid, {
//             document: {
//                 url: appInfo.link
//             },
//             fileName: appInfo.appname,
//             caption: `App Name: ${appInfo.appname}\nDeveloper: ${appInfo.developer}`,
//             mimetype: "application/vnd.android.package-archive"
//         }, {
//             quoted: m
//         });
//         await m.react('✅');
//     } catch (error) {
//         await m.react('❌');
//         console.error(error);
//     }
// });


Sparky({
    name: "pintrest",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download images and content from Pinterest",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
        //if (!match.includes("pin.it")) return await m.reply("_Please provide a valid Pinterest URL_");
        const result = await getJson(config.API + "/api/downloader/pin?url=" + match);
        await m.sendFromUrl(result.data.url, { caption: result.data.created_at });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        console.error(error);
    }
});

Sparky({
    name: "fb",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download files from Facebook by providing a valid URL",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
        const data = await getJson(config.API + "/api/downloader/fbdl?url=" + match);
        await m.sendFromUrl(data.data.high, { caption: data.data.title });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        return m.reply(error);
    }
});

Sparky({
    name: "spotify",
    fromMe: isPublic,
    category: "downloader",
    desc: "play a song"
  },
  async ({
    m, client, args
  }) => {
    try {
        args = args || m.quoted?.text;
        if(!args) return await m.reply(lang.NEED_Q);
  await m.react('🔎');
  const ser = await getJson(config.API + "/api/search/spotify?search=" + args)
  const play = ser.data[0];
        await m.react('⬇️');
        await m.reply(`_Downloading ${play.name} By ${play.artists}_`)
  const url = await spdl(play.link);
  await m.sendMsg(m.jid , url, { mimetype: "audio/mpeg" } , "audio")
   await m.react('✅');     
    } catch (error) {
        await m.react('❌');
        m.reply(error);
    }
  });

  Sparky({
    name: "spotifydl",
    fromMe: isPublic,
    category: "downloader",
    desc: "play a song"
  },
  async ({
    m, client, args
  }) => {
    try {
        args = args || m.quoted?.text;
        if(!args) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
  const url = await spdl(args);
  await m.sendMsg(m.jid , url, { mimetype: "audio/mpeg" } , "audio")
   await m.react('✅');     
    } catch (error) {
        await m.react('❌');
        m.reply(error);
    }
  });

Sparky({
    name: "xnxx",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download media from XNXX by search or URL",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_Q);
            await m.react('🔎');
            const { result } = await getJson(config.API + "/api/search/xnxx?search=" + match);
            await m.react('⬇️');
            var xnxx = result.result[0].link
            const xdl = await getJson(`${config.API}/api/downloader/xnxx?url=${xnxx}`)
            await m.sendFromUrl(xdl.data.files.high, { caption: xdl.data.title });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        m.reply(error);
    }
});


Sparky({
    name: "terabox",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download files from TeraBox by providing a valid URL",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
        const { data } = await getJson(config.API + "/api/downloader/terrabox?url=" + match);
        await m.sendFromUrl(data.dlink, { caption: data.filename });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        console.error(error);
    }
});


Sparky({
    name: "gitclone",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download GitHub repositories as ZIP files",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!isUrl(match)) return await m.reply(lang.NEED_URL)
        await m.react('⬇️');
        let user = match.split("/")[3];
        let repo = match.split("/")[4];
        const msg = await m.reply(lang.DOWNLOADING);
        await client.sendMessage(m.jid, {
            document: {
                url: `https://api.github.com/repos/${user}/${repo}/zipball`
            },
            fileName: repo,
            mimetype: "application/zip"
        }, {
            quoted: m
        });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        console.error(error);
    }
});
