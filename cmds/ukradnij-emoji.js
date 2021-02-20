module.exports = {
    name: "ukradnij-emoji",
    aliases: ["ukradnij-emoji", "getemoji", "kradnijemoji", "emojirob"],
    description: "Ukradnij emotke!",
    perms: "MANAGE_EMOJIS",
    category: "mod",
    use: "ukradnij-emoji <:ladneemoji:2801708430853892>",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[0]) {
            if(args[0].endsWith(`>`) && (args[0].startsWith(`<:`) || args[0].startsWith(`<a:`))) {
                if(args[0].startsWith(`<a:`)) {
                    args[0].replace(`<a:`, ``)
                } else if (args[0].startsWith(`<:`)) {
                    args[0].replace(`<:`, ``)
                }
                args[0].replace(`:>`, ``)
                let ems = args[0].split(`:`)
                if(args[0].startsWith(`<a:`)) {
                    msg.guild.emojis.create(`https://cdn.discordapp.com/emojis/` + ems[2].replace(`>`, ``) + `.gif`, ems[1], `skradziona przez ${msg.author.tag} | ${msg.author.id}`).then((emoji) => {
                        msg.channel.send(`:white_check_mark: Emotka ${emoji} skradziona!`)
                    }).catch((err) => {
                        msg.channel.send(`:x: Error!`)
                        console.log(`An error: ${err}`)
                    })
                } else {
                    msg.guild.emojis.create(`https://cdn.discordapp.com/emojis/` + ems[2].replace(`>`, ``) + `.png`, ems[1], `skradziona przez ${msg.author.tag} | ${msg.author.id}`).then((emoji) => {
                        msg.channel.send(`:white_check_mark: Emotka ${emoji} skradziona!`)
                    }).catch((err) => {
                        msg.channel.send(`:x: Error!`)
                        console.log(`An error: ${err}`)
                    })
                }
            } else {
                msg.reply(`A jakie to emoji ma kurła być?`)
            }
        } else {
            msg.reply(`A jakie to emoji ma kurła być?`)
        }
    }
}