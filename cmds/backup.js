const fs = require(`fs`)

module.exports = {
    name: "backup",
    aliases: ["backup", "copy", "copyserver", "bu"],
    description: "Zrób kopię zapasową serwera!",
    perms: "ADMINISTRATOR",
    category: "mod",
    use: "backup",
    execute(msg, configs, args, client, Discord, prefix) {
        msg.guild.fetchBans().then(bans => {
            let id = configs.db.backups.length
            configs.db.backups.push({id: id, roles: msg.guild.roles.cache.filter(r => r.name !== "@everyone")
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(r => {
              const role = {
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                permissions: r.permissions,
                mentionable: r.mentionable,
                position: r.position
              };
              return role;
            }), channels: msg.guild.channels.cache.sort(function(a, b) {
                return a.position - b.position;
              })
              .array()
              .map(c => {
                const channel = {
                    type: c.type,
                    name: c.name,
                    postion: c.calculatedPosition,
                    perms: c.permissionOverwrites.array().map(p => {
                        rl = msg.guild.roles.cache.find(rl => rl.id === p.id)
                        const perm = {
                            rl: {
                                name: rl.name,
                                position: rl.position
                            },
                            allows: p.allow,
                            denys: p.deny
                        };
                        return perm;
                    })
                };
                if (c.parent) channel.parent = c.parent.name;
                return channel;
              }), bans: bans, createdat: Date.now()})
            msg.channel.send(new Discord.MessageEmbed().setTitle(`Utworzono backup!`).setDescription(`Id znajdziesz na PV. Nie podawaj go nikomu!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
            msg.author.send(new Discord.MessageEmbed().setTitle(`Utworzono backup o id\`${id}\`!`).setDescription(`Id to \`${id}\`. Nie podawaj go nikomu!`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
            fs.writeFile(`${configs.config.botpath}\\db\\backups\\backups.json`, JSON.stringify(configs.db.backups), function(err) {
                if(err) {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Error: ${err}`).setColor(`RED`))
                }
            })
        })

    }
}