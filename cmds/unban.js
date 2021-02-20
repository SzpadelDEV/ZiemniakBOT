module.exports = {
    name: "unban",
    aliases: ["unban", "ub", "odbanuj"],
    description: "Odbanuj użytkownika!",
    perms: "BAN_MEMBERS",
    category: "mod",
    use: "unban <id> (Powód)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[0]) {
            msg.guild.fetchBans().then(bans => {
                if(bans.find(bn => bn.user.id === args[0])) {
                    let reason = "Nie podano powodu."
                    if(args[1]) {
                        reason = args.splice(1).join(' ')
                    }
                    msg.guild.members.unban(args[0], `${reason} | Przez: ${msg.author.tag} | ${msg.author.id}`)
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`<@${args[0]}>(${args[0]}) dostał młotkiem unbana! <:unban_user:801086517719072778>`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                    let user = client.users.cache.find(us => us.id === args[0])
                    if(user) {
                        user.send(new Discord.MessageEmbed().setDescription(`**Akcja:** UNBAN\n**Moderator:** ${msg.author.tag} | ${msg.author.id}\n**Powód:** ${reason}`).setFooter(`By: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`GREEN`))
                    }
                } else {
                    msg.channel.send(new Discord.MessageEmbed().setDescription(`Ta osoba nie jest zbanowana!`).setColor(`RED`))
                }
            })
        }
    }
}