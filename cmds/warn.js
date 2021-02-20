const fs = require(`fs`)

module.exports = {
    name: "warn",
    aliases: ["warn", "w", "ostrzez", "ostrzeż"],
    description: "Wycisz użytkownika!",
    perms: "MANAGE_MESSAGES",
    category: "mod",
    use: "warn <@Użytkownik/id> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(msg.mentions.members.first()) {
            let user = msg.mentions.users.first()
            let member = msg.guild.member(user)
            if(msg.member.user.id === msg.guild.owner.user.id || msg.member.roles.highest.position > member.roles.highest.position) {
                let reason = `Nie podano powodu!`
                if(args[1]) {
                    reason = args.splice(1).join(' ')
                }
                configs.db.moderation.warnings.push({deleted: "false", userid: member.user.id, modid: msg.author.id, reason: reason, id: configs.db.moderation.warnings.length})
                fs.writeFile(`${configs.config.botpath}\\db\\moderations\\warnings.json`, JSON.stringify(configs.db.moderation.warnings), function(err) {
                    if(err) {
                        msg.reply(`Error: ${err}`)
                    }
                })
                if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 3) {
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(rl) {
                        member.roles.add(rl).then(() => {
                            setTimeout(function() {
                                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                    member.roles.remove(rl)
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 15 * 60 * 1000)
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
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 15 * 60 * 1000)
                        })
                        })
                    }
                    
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 15m\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Trzy ostrzeżenia to mute na 15 minut!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))

                    
                }

                if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 5) {
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(rl) {
                        member.roles.add(rl).then(() => {
                            setTimeout(function() {
                                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                    member.roles.remove(rl)
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 60 * 60 * 1000)
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
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 60 * 60 * 1000)
                        })
                        })
                    }
                    
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 1h\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Pięć ostrzeżeń to mute na godzinę!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))

                    
                }

                if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 7) {
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(rl) {
                        member.roles.add(rl).then(() => {
                            setTimeout(function() {
                                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                    member.roles.remove(rl)
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 5 * 60 * 60 * 1000)
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
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 5 * 60 * 60 * 1000)
                        })
                        })
                    }
                    
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 5h\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Siedem ostrzeżeń to mute na 5 godzin!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))

                    
                }

                if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 9) {
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(rl) {
                        member.roles.add(rl).then(() => {
                            setTimeout(function() {
                                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                    member.roles.remove(rl)
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 12 * 60 * 60 * 1000)
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
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 12 * 60 * 60 * 1000)
                        })
                        })
                    }
                    
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 12h\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Dziewięc ostrzeżeń to mute na 12 godzin!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))

                    
                }

                if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 11) {
                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                    if(rl) {
                        member.roles.add(rl).then(() => {
                            setTimeout(function() {
                                let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                    member.roles.remove(rl)
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 24 * 60 * 60 * 1000)
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
                                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                }
                            }, 24 * 60 * 60 * 1000)
                        })
                        })
                    }
                    
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 1d\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Jedenaście ostrzeżeń to mute na 1 dzień!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))

                    
                }

                if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 13) {
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
                    
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Trzynaście ostrzeżeń to mute na zawsze!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))

                    
                }

                msg.channel.send(new Discord.MessageEmbed().setDescription(`:warning: <@${user.id}>(${user.tag} | ${user.id}) dostał warna za ${reason} :warning:!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** WARN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz ostrzegać wyższych lub równych siebie!`).setColor(`RED`))
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
                    configs.db.moderation.warnings.push({deleted: "false", userid: member.user.id, modid: msg.author.id, reason: reason, id: configs.db.moderation.warnings.length})
                    fs.writeFile(`${configs.config.botpath}\\db\\moderations\\warnings.json`, JSON.stringify(configs.db.moderation.warnings), function(err) {
                        if(err) {
                            msg.reply(`Error: ${err}`)
                        }
                    })
                    if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 3) {
                        let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                        if(rl) {
                            member.roles.add(rl).then(() => {
                                setTimeout(function() {
                                    let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                    if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                        member.roles.remove(rl)
                                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                    }
                                }, 15 * 60 * 1000)
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
                                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                    }
                                }, 15 * 60 * 1000)
                            })
                            })
                        }

                        if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 5) {
                            let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                            if(rl) {
                                member.roles.add(rl).then(() => {
                                    setTimeout(function() {
                                        let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                        if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                            member.roles.remove(rl)
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 60 * 60 * 1000)
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
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 60 * 60 * 1000)
                                })
                                })
                            }
                            
                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 1h\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Pięć ostrzeżeń to mute na godzinę!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
        
                            
                        }
        
                        if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 7) {
                            let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                            if(rl) {
                                member.roles.add(rl).then(() => {
                                    setTimeout(function() {
                                        let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                        if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                            member.roles.remove(rl)
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 5 * 60 * 60 * 1000)
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
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 5 * 60 * 60 * 1000)
                                })
                                })
                            }
                            
                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 5h\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Siedem ostrzeżeń to mute na 5 godzin!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
        
                            
                        }
        
                        if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 9) {
                            let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                            if(rl) {
                                member.roles.add(rl).then(() => {
                                    setTimeout(function() {
                                        let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                        if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                            member.roles.remove(rl)
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 12 * 60 * 60 * 1000)
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
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 12 * 60 * 60 * 1000)
                                })
                                })
                            }
                            
                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 12h\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Dziewięc ostrzeżeń to mute na 12 godzin!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
        
                            
                        }
        
                        if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 11) {
                            let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                            if(rl) {
                                member.roles.add(rl).then(() => {
                                    setTimeout(function() {
                                        let rl = msg.guild.roles.cache.find(rl => rl.name === `Wyciszony`)
                                        if(member.roles.cache.find(rl => rl.name === `Wyciszony`)) {
                                            member.roles.remove(rl)
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 24 * 60 * 60 * 1000)
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
                                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNMUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                                        }
                                    }, 24 * 60 * 60 * 1000)
                                })
                                })
                            }
                            
                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Czas:** 1d\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Jedenaście ostrzeżeń to mute na 1 dzień!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
        
                            
                        }
        
                        if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 13) {
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
                            
                            user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** MUTE\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Trzynaście ostrzeżeń to mute na zawsze!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
        
                            
                        }


                        
                        
                    }

                    if(configs.db.moderation.warnings.filter(wn => wn.userid == member.user.id).length == 15) {
                        member.kick(`Piętnaście ostrzeżeń to kick | Przez: ${client.user.tag} | ${client.user.id}`)
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** KICK\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Piętnaście ostrzeżeń to kick!`).setFooter(`By: ${client.user.tag} | ${client.user.id}`, client.user.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    }

                    if(configs.db.moderation.warnings.filter(wn => wn.userid === member.user.id).length == 17) {
                        member.ban({reason: `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`}).then(() => {
                            setTimeout(function() {
                                msg.guild.members.unban(user.id)
                                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNBAN\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                            }, 15 * 60 * 1000)
                        })
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Czas:** 15m\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Siedemnaście ostrzeżeń to ban na 15 minut!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    }

                    if(configs.db.moderation.warnings.filter(wn => wn.userid === member.user.id).length == 19) {
                        member.ban({reason: `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`}).then(() => {
                            setTimeout(function() {
                                msg.guild.members.unban(user.id)
                                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNBAN\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                            }, 60 * 60 * 1000)
                        })
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Czas:** 1h\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Dziewietnaście ostrzeżeń to ban na godzinę!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    }

                    if(configs.db.moderation.warnings.filter(wn => wn.userid === member.user.id).length == 21) {
                        member.ban({reason: `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`}).then(() => {
                            setTimeout(function() {
                                msg.guild.members.unban(user.id)
                                user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNBAN\n**Moderator:** ${client.user.tag} | ${client.user.id}\n**Powód:** Czas minął`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                            }, 15 * 60 * 1000)
                        })
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** BAN\n**Czas:** 5h\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** Dwadzieścia jeden ostrzeżeń to ban na pięć godzin!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    }

                    msg.channel.send(new Discord.MessageEmbed().setDescription(`:warning: <@${user.id}>(${user.tag} | ${user.id}) dostał warna za ${reason} :warning:!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** WARN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie możesz ostrzegać wyższych lub równych siebie!`).setColor(`RED`))
                }
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie ma tego użytkownika na serwerze!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id/wzmianki użytkownika!`).setColor(`RED`))
        }
    }
}