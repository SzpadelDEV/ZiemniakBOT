const fs = require(`fs`)

module.exports = {
    name: "load",
    aliases: ["loadbackup", "loadcopy", "loadcopyserver", "load", "lbu"],
    description: "Odtwórz kopię zapasową serwera!",
    perms: "ADMINISTRATOR",
    category: "mod",
    use: "load <id>",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[0]) {
            let backup = configs.db.backups.find(bc => bc.id == args[0])
            if(backup) {
                msg.delete()
                msg.guild.fetchBans().then(bans => {
                    bans.forEach(ban => {
                        msg.guild.members.unban(ban.member.user.id, `Ładowanie kopii zapasowej serwera!`)
                    })
                })
                msg.guild.channels.cache.forEach(ch => {
                    ch.delete(`Ładowanie kopii zapasowej serwera!`)
                })
                msg.guild.roles.cache.forEach(role => {
                    role.delete(`Ładowanie kopii zapasowej serwera!`)
                })
                backup.roles.forEach(role => {
                    msg.guild.roles.create({data: {
                        name: role.name,
                        color: role.color,
                        permissions: role.permissions,
                        hoist: role.hoist,
                        mentionable: role.mentionable,
                        position: role.position
                    }}).then(rl => {
                        rl.setposition(role.position)
                    })
                })

                backup.channels.filter(ch => ch.type === `category`).forEach(ct => {
                    msg.guild.channels.create(ct.name, {
                        type: ct.type
                    }).then(c => {
                        c.setPosition(ct.position)
                        ct.perms.forEach(pm => {
                            let rl = msg.guild.roles.cache.find(r => r.position === pm.rl.position)
                            if(rl) {
                                c.overwritePermissions(rl, {
                                    deny: pm.denys,
                                    allow: pm.allows
                                })
                            }
                        })
                    })
                })

                backup.channels.filter(ch => ch.type != `category`).forEach(ch => {
                    msg.guild.channels.create(ch.name, {
                        type: ch.type
                    }).then(c => {
                        c.setPosition(ch.position)
                        ch.perms.forEach(pm => {
                            let rl = msg.guild.roles.cache.find(r => r.position == Number(pm.rl.position))
                            if(rl) {
                                c.overwritePermissions(rl, {
                                    deny: pm.denys.FLAGS,
                                    allow: pm.allows.FLAGS
                                })
                            }
                        })
                        if(ch.parent) {
                            let parent = msg.guild.channels.cache.find(par => par.type == `category` && par.name == ch.parent)
                            c.setParent(parent)
                        }
                    })
                })
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś poprwanego id!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id!`).setColor(`RED`))
        }
    }
}