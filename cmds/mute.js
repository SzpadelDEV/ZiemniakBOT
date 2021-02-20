module.exports = {
    name: "mute",
    aliases: ["mute", "m", "wycisz"],
    description: "Wycisz użytkownika!",
    perms: "MANAGE_MESSAGES",
    category: "mod",
    use: "mute <@Użytkownik/id> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(msg.mentions.members.first()) {
            let user = msg.mentions.users.first()
            let member = msg.guild.member(user)
            if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                let reason = `Nie podano powodu!`
                if(args[1]) {
                    reason = args.splice(1).join(' ')
                }
                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                if(rl) {
                    member.roles.add(rl)
                } else {
                    msg.guild.roles.create({data: {
                        name: `Wyciszony`,
                        color: `BLACK`
                    }}, `Utworzenie roli wyciszony!`).then(role => {
                    role.setPosition(10)
                    msg.guild.channels.cache.forEach(ch => {
                        ch.updateOverwrite(role, {SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false})
                    })
                    member.roles.add(role)
                    })
                }
                msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został wyciszony 🤫!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz wyciszyć wyższych lub równych siebie!`).setColor(`RED`))
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
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(rl) {
                        member.roles.add(rl)
                    } else {
                        msg.guild.roles.create({data: {
                            name: `Wyciszony`,
                            color: `BLACK`
                        }}, `Utworzenie roli wyciszony!`).then(role => {
                        role.setPosition(10)
                        msg.guild.channels.cache.forEach(ch => {
                            ch.updateOverwrite(role, {SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false})
                        })
                        member.roles.add(role)
                    })
                }
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został wyciszony 🤫!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz wyciszyć wyższych lub równych siebie!`).setColor(`RED`))
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie ma tego użytkownika na serwerze!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
        }
    }
}