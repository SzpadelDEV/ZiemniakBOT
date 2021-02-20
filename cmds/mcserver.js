const fs = require(`fs`)
const servers = require(`minecraft-server-util`)

module.exports = {
    name: "servermc",
    aliases: ["servermc", "mcserver"],
    description: "Status serwera minecraft",
    perms: "None",
    category: "4fun",
    use: "servermc [ip]",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[0]) {
            let ports = args[0].split(/:+/g)
            let port = "25565"
            if(ports[1]) {
                port = ports[1]
            }
            servers.status(ports[0], {port: port}).then(srv => {
                let embed = new Discord.MessageEmbed().setTitle(`Informacje o serwerze`)
                embed.addFields(
                    {name: `Gracze online:`, value: `${srv.onlinePlayers}/${srv.maxPlayers}`},
                    {name: `MOTD:`, value: srv.description},
                    {name: `IP:`, value: srv.host + ":" + srv.port},
                    {name: `Wersja:`, value: srv.version}
                )
                //embed.setThumbnail(srv.favicon)
                msg.channel.send(embed)
            }).catch(err => {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`**Niepoprawne ip!**`).setColor(`RED`))
            })
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`**Podaj ip serwera!**`).setColor(`RED`))
        }
    }
}