module.exports = {
    name: "unmute",
    aliases: ["unmute", "um", "odcisz"],
    description: "Odcisz użytkownika!",
    perms: "MANAGE_MESSAGES",
    category: "mod",
    use: "unmute <@Użytkownik/id> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(msg.mentions.members.first()) {
            let user = msg.mentions.users.first()
            let member = msg.guild.member(user)
            //if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                let reason = `Nie podano powodu!`
                if(args[1]) {
                    reason = args.splice(1).join(' ')
                }
                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                    member.roles.remove(rl)
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został odciszony!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Ten użytkownik nie jest wyciszony!`).setColor(`RED`))
                }
                
            // } else {
            //     msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz odciszyć wyższych lub równych siebie!`).setColor(`RED`))
            // }
        } else if (args[0]) {
            let user = client.users.cache.find(us => us.id === args[0])
            let member = msg.guild.member(user)
            if(member) {
                //if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                    let reason = `Nie podano powodu!`
                    if(args[1]) {
                        reason = args.splice(1).join(' ')
                    }
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                        member.roles.remove(rl)
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został odciszony!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                    } else {
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`Ten użytkownik nie jest wyciszony!`).setColor(`RED`))
                    }
                    
                // } else {
                //     msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz odciszyć wyższych lub równych siebie!`).setColor(`RED`))
                // }
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie ma tego użytkownika na serwerze!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
        }
    }
}