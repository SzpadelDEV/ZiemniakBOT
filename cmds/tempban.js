module.exports = {
    name: "ban",
    aliases: ["tempban", "tb", "czasowo-zbanuj"],
    description: "Czasowo zbanuj użytkownika!",
    perms: "BAN_MEMBERS",
    category: "mod",
    use: "tempban <@Użytkownik/id> <czas(m/h/d)> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[1]) {
        if(msg.mentions.members.first()) {
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

            let user = msg.mentions.users.first()
            let member = msg.guild.member(user)
            if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                    let reason = `Nie podano powodu!`
                    if(args[2]) {
                        reason = args.splice(2).join(' ')
                    }
                    member.ban({reason: `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`}).then(() => {
                        setTimeout(function() {
                            msg.guild.members.unban(user.id)
                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNBAN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Czas minął!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                        }, timems)
                    })
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Czas:** ${args[1]}\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz zbanować wyższych lub równych siebie!`).setColor(`RED`))
                }
            } else if (args[0]) {
                let user = client.users.cache.find(us => us.id === args[0])
                let member = msg.guild.member(user)
                if(member) {
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
                    if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                        let reason = `Nie podano powodu!`
                        if(args[2]) {
                            reason = args.splice(2).join(' ')
                        }
                        member.ban({reason: `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`}).then(() => {
                            setTimeout(function() {
                                msg.guild.members.unban(user.id)
                                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNBAN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Czas minął!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                            }, timems)
                        })
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    } else {
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz zbanować wyższych lub równych siebie!`).setColor(`RED`))
                    }
                } else {
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
                    msg.guild.members.ban(args[0], {reason: reason + ` | Przez ${msg.author.tag} | ${msg.author.id}`}).then(() => {
                        setTimeout(function() {
                            msg.guild.members.unban(args[0])
                        }, timems)
                    })
                    let user = client.users.cache.find(us => us.id === args[0])
                    if(user) {
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${user.id}>(${user.tag} | ${user.id}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN**Czas:** ${args[1]}\n\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    } else {
                        msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${args[0]}>(${args[0]}) got <a:Banned1:800969242304446496> <a:Banned2:800969274100285450> <a:Banned3:800969288231550982>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    }
                }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
        }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś czasu!`).setColor(`RED`))
        }
    }
}