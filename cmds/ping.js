module.exports = {
    name: "ping",
    aliases: ["ping"],
    description: "Ping bota!",
    perms: "None",
    category: "info",
    use: "ping",
    execute(msg, configs, args, client, Discord, prefix) {
        msg.channel.send(`🏓 Pong! Mój ping to \`${client.ws.ping}ms\`!`)
    }
}