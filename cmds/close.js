const fs = require(`fs`)

module.exports = {
    name: "close",
    aliases: ["ct", "close", "zamknij", "closeticket"],
    description: "Zamknij ticket!",
    perms: "MANAGE_MESSAGES",
    category: "mod",
    use: "close",
    execute(msg, configs, args, client, Discord, prefix) {
        let tick = configs.db.tickets.find(tc => tc.channelid === msg.channel.id)
        if(tick) {
            let user = client.users.cache.find(us => us.id === tick.userid)
            let reason = `Nie podano powodu!`
            if(args[0]) {
                reason = args.join(' ')
            }
            if(user) {
                user.send(new Discord.MessageEmbed().setTitle(`Ticket zamknięty!`).setDescription(`Zamknięto ticket z powodu: ${reason}`).setFooter(`By ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setColor(`RED`).setImage(msg.attachments.first()))
            }
            let logsch = client.channels.cache.find(ch => ch.id === "802450287155347466")
            if(logsch) {
                logsch.send(new Discord.MessageEmbed().setTitle(`Ticket zamknięty!`).setDescription(`Zamknięto ticket z powodu: ${reason}`).setAuthor(`${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setFooter(`By ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setColor(`RED`).setImage(msg.attachments.first()))
            }
            msg.channel.delete()
            configs.db.tickets.splice(configs.db.tickets.indexOf(tick))
            fs.writeFile(`${configs.config.botpath}\\db\\tickets\\tickets.json`, JSON.stringify(configs.db.tickets), function(err) {
                if(err) {
                    console.log(`Modmail err: ${err}`)
                }
            })
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`To nie kanał ticketu!`).setColor(`RED`))
        }
    }
}