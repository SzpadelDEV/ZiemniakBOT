const fs = require(`fs`)
const players = require(`mc-player-api`)

module.exports = {
    name: "skinmc",
    aliases: ["skinmc", "mcskin"],
    description: "Skin gracza minecraft",
    perms: "None",
    category: "4fun",
    use: "skin [nick]",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[0]) {
            players.getUser(args[0]).then(p => {
                let url = p.skin_renders.body_render;
                msg.channel.send(url)
            }).catch(e => {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`**Podaj nick istniejącego gracza!**`).setColor(`RED`))
            })
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`**Podaj nick gracza!**`).setColor(`RED`))
        }
    }
}