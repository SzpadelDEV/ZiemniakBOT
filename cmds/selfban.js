module.exports = {
    name: "selfban",
    aliases: ["selfban", "sb", "zbanujsie"],
    description: "Zbanuj siebie!",
    perms: "BAN_MEMBERS",
    category: "mod",
    use: "selfban",
    execute(msg, configs, args, client, Discord, prefix) {
        msg.member.ban({reason: `Selfban | Ziemniaczki`})
    }
}