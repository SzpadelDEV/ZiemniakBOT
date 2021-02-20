module.exports = {
    name: "tempmute",
    aliases: ["tempmute", "tm", "czasowo-wycisz"],
    description: "Czasowo wycisz użytkownika!",
    perms: "MANAGE_MESSAGES",
    category: "mod",
    use: "tempmute <@Użytkownik/id> <czas(m/h/d)> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[1]) {
            if(msg.mentions.members.first()) {
                let user = msg.mentions.users.first()
                let member = msg.guild.member(user)
                if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                    let time = args[1].substring((args[1].length - 1), (args[1].length))
                    let timems = Number(args[1].substring(0, (args[1].length - 1)))
        
                    switch (time) {
                        case 'w':
                            timems = timems * 1000 * 60 * 60 * 24 * 7;
                            break;
        
                        case 'm':
                            timems = timems * 1000 * 60;
                            break;
        
                        case 'h':
                            timems = timems * 1000 * 60 * 60;
                            break;
        
                        case 'd':
                            timems = timems * 1000 * 60 * 60 * 24;
                            break;
        
                        default:
                            timems = timems * 1000;
                            break;
                    }
                    let reason = `Nie podano powodu!`
                    if(args[2]) {
                        reason = args.splice(2).join(' ')
                    }
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(rl) {
                        member.roles.add(rl).then(() => {
                            setTimeout(function() {
                                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                    member.roles.remove(rl)
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, timems)
                        })
                    } else {
                        msg.guild.roles.create({data: {
                            name: `Wyciszony`,
                            color: `BLACK`
                        }}, `Utworzenie roli wyciszony!`).then(role => {
                        role.setPosition(10)
                        msg.guild.channels.cache.forEach(ch => {
                            ch.updateOverwrite(role, {SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false})
                        })
                        member.roles.add(role).then(() => {
                            setTimeout(function() {
                                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                    member.roles.remove(rl)
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, timems)
                        })
                        })
                    }
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został wyciszony 🤫!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** ${args[1]}\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz wyciszyć wyższych lub równych siebie!`).setColor(`RED`))
                }
            } else if (args[0]) {
                let user = client.users.cache.find(us => us.id === args[0])
                let member = msg.guild.member(user)
                if(member) {
                    if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                        let time = args[1].substring((args[1].length - 1), (args[1].length))
                    let timems = Number(args[1].substring(0, (args[1].length - 1)))
        
                    switch (time) {
                        case 'w':
                            timems = timems * 1000 * 60 * 60 * 24 * 7;
                            break;
        
                        case 'm':
                            timems = timems * 1000 * 60;
                            break;
        
                        case 'h':
                            timems = timems * 1000 * 60 * 60;
                            break;
        
                        case 'd':
                            timems = timems * 1000 * 60 * 60 * 24;
                            break;
        
                        default:
                            timems = timems * 1000;
                            break;
                    }
                        let reason = `Nie podano powodu!`
                        if(args[2]) {
                            reason = args.splice(2).join(' ')
                        }
                        let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                        if(rl) {
                            member.roles.add(rl).then(() => {
                                setTimeout(function() {
                                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                    if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                        member.roles.remove(rl)
                                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                    }
                                }, timems)
                            })
                        } else {
                            msg.guild.roles.create({data: {
                                name: `Wyciszony`,
                                color: `BLACK`
                            }}, `Utworzenie roli wyciszony!`).then(role => {
                            role.setPosition(10)
                            msg.guild.channels.cache.forEach(ch => {
                                ch.updateOverwrite(role, {SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false})
                            })
                            member.roles.add(role).then(() => {
                                setTimeout(function() {
                                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                    if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                        member.roles.remove(rl)
                                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                    }
                                }, timems)
                            })
                        })
                    }
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) został wyciszony 🤫!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** ${args[1]}\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    } else {
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz wyciszyć wyższych lub równych siebie!`).setColor(`RED`))
                    }
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie ma tego użytkownika na serwerze!`).setColor(`RED`))
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś na ile czasu mam go zbanować!`).setColor(`RED`))
        }
    }
}