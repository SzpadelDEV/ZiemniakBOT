module.exports = {
    name: "ban",
    aliases: ["ban", "b", "zbanuj"],
    description: "Zbanuj użytkownika!",
    perms: "BAN_MEMBERS",
    category: "mod",
    use: "ban <@Użytkownik/id> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(msg.mentions.members.first()) {
            let user = msg.mentions.users.first()
            let member = msg.guild.member(user)
            if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                let reason = `Nie podano powodu!`
                if(args[1]) {
                    reason = args.splice(1).join(' ')
                }
                member.ban({reason: `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`})
                msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
            } else {
               msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz zbanować wyższych lub równych siebie!`).setColor(`RED`))
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
                    member.ban({reason: `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`})
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz zbanować wyższych lub równych siebie!`).setColor(`RED`))
                }
            } else {
                let reason = `Nie podano powodu!`
                if(args[1]) {
                    reason = args.splice(1).join(' ')
                }
                msg.guild.members.ban(args[0], {reason: reason + ` | Przez ${msg.author.tag} | ${msg.author.id}`})
                let user = client.users.cache.find(us => us.id === args[0])
                if(user) {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${args[0]}>(${args[0]}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                }
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
        }
    }
}