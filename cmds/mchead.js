const fs = require(`fs`)
const players = require(`mc-player-api`)

module.exports = {
    name: "headmc",
    aliases: ["headmc", "mchead"],
    description: "Głowa gracza minecraft",
    perms: "None",
    category: "4fun",
    use: "heamc [nick]",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[0]) {
            players.getUser(args[0]).then(p => {
                let url = p.skin_renders.head_render;
                msg.channel.send(url)
            }).catch(e => {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`**Podaj nick istniejącego gracza!**`).setColor(`RED`))
            })
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`**Podaj nick gracza!**`).setColor(`RED`))
        }
    }
}