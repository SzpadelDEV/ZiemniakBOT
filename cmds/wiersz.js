module.exports = {
    name: "wiersz",
    aliases: ["wiersz", "wierszyk", "rym"],
    description: "Powiedz wierszyk!",
    perms: "None",
    category: "fun",
    use: "wiersz",
    execute(msg, configs, args, client, Discord, prefix) {
        let wiersze = ["Jebać Matrika i spam znika!", "Ziemniaczek je, fryteczke!", "Idź pan lepiej jebać pandzie i drago a nie!", "Idź pan lepiej jebać drago a nie!"]
        let randomwiersz = Math.floor((wiersze.length)*Math.random())
        msg.channel.send(wiersze[randomwiersz])
    }
}