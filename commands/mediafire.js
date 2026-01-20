const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
    name: 'mediafire',
    alias: ['mf', 'mfire'],
    category: 'download',
    description: 'Descarga archivos de Mediafire',
    async run({ msg, conn, args }) {
        if (!args[0]) return msg.reply('Mael, envía el comando con un enlace de Mediafire.')
        if (!args[0].includes('mediafire.com')) return msg.reply('El enlace no es válido.')

        try {
            await msg.reply('Preparando la descarga... ⏳')
            
            const res = await axios.get(args[0])
            const $ = cheerio.load(res.data)
            const url = $('#downloadButton').attr('href')
            const name = $('div.dl-btn-label').attr('title')
            const size = $('ul.details li span').eq(1).text()

            if (!url) return msg.reply('No pude encontrar el archivo.')

            await conn.sendMessage(msg.from, { 
                document: { url }, 
                fileName: name, 
                mimetype: 'application/vnd.android.package-archive',
                caption: `✅ *Archivo:* ${name}\n📦 *Peso:* ${size}`
            }, { quoted: msg })

        } catch (e) {
            msg.reply('Error técnico al procesar el link.')
        }
    }
}
