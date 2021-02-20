module.exports = {
    name: "kick",
    aliases: ["kick", "k", "wyrzuc", "wyrzuć"],
    description: "Wyrzuć użytkownika!",
    perms: "KICK_MEMBERS",
    category: "mod",
    use: "kick <@Użytkownik/id> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(msg.mentions.members.first()) {
            let user = msg.mentions.users.first()
            let member = msg.guild.member(user)
            if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                let reason = `Nie podano powodu!`
                if(args[1]) {
                    reason = args.splice(1).join(' ')
                }
                member.kick(`${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`)
                msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został wykopany z serwera!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** KICK\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz wyrzucić wyższych lub równych siebie!`).setColor(`RED`))
            }
        } else if (args[0]) {
            let user = client.users.cache.find(us => us.id === args[0])
            let member = msg.guild.member(user)
            if(member) {
                if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                    let reason = `Nie podano powodu!`
                    if(args[1]) {
                        reason = args.splice(1).join(' ')
                    }
                    member.kick(`${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`)
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został wykopany z serwera!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** KICK\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz wyrzucić wyższych lub równych siebie!`).setColor(`RED`))
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie ma tego użytkownika na serwerze!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
        }
    }
}