const fs = require(`fs`)

module.exports = {
    name: "warnings",
    aliases: ["warnings", "warns", "ostrzezenia", "ostrzeżenia", "warnlist"],
    description: "Wszystkie ostrzeżenia użytkownika użytkownika!",
    perms: "MANAGE_MESSAGES",
    category: "mod",
    use: "warnings <@Użytkownik/id>",
    execute(msg, configs, args, client, Discord, prefix) {
        if(msg.mentions.members.first()) {
            let user = msg.mentions.users.first()
            let member = msg.guild.member(user)
            if(member) {
                let warns = configs.db.moderation.warnings
                let userwarns = warns.filter(wn => wn.userid == member.user.id && wn.deleted == "false")
                let warnsmsg = [];
                userwarns.forEach(usw => {
                    let mod = client.users.cache.find(us => us.id === usw.modid)
                    warnsmsg.push(`***Ostrzeżenie o id \`${usw.id}\`***\nModerator: ${mod.tag} | ${usw.modid}\nPowód: ${usw.reason}`)
                })
                if(userwarns.length < 1) {
                    warnsmsg.push(`Nie znaleziono ostrzeżeń!`)
                }
                msg.channel.send(new Discord.MessageEmbed().setTitle(`Ostrzeżenia ${member.user.tag}`).setDescription(`Znaleziono **${userwarns.length}** ostrzeżeń!\n\n${warnsmsg.join(`\n`)}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
            }
        } else if (args[0]) {
            let user = client.users.cache.find(us => us.id === args[0])
            let member = msg.guild.member(user)
            if(member) {
                let warns = configs.db.moderation.warnings
                let userwarns = warns.filter(wn => wn.userid === member.user.id && wn.deleted === "false")
                let warnsmsg = [];
                userwarns.forEach(usw => {
                    let mod = client.users.cache.find(us => us.id === usw.modid)
                    warnsmsg.push(`***Ostrzeżenie o id \`${usw.id}\`***\nModerator: ${mod.tag} | ${usw.modid}\nPowód: ${usw.reason}`)
                })
                if(userwarns.length < 1) {
                    warnsmsg.push(`Nie znaleziono ostrzeżeń!`)
                }
                msg.channel.send(new Discord.MessageEmbed().setTitle(`Ostrzeżenia ${member.user.tag}`).setDescription(`Znaleziono **${userwarns.length}** ostrzeżeń!\n\n${warnsmsg.join(`\n`)}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie ma tego użytkownika na serwerze!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
        }
    }
}