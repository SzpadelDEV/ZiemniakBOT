const fs = require(`fs`)

module.exports = {
    name: "delwarn",
    aliases: ["dw", "delwarn", "unwarn"],
    description: "Usuń ostrzeżenie!",
    perms: "MANAGE_GUILD",
    category: "mod",
    use: "delwarn <id warna>",
    execute(msg, configs, args, client, Discord, prefix) {
        if (args[0]) {
            let warn = configs.db.moderation.warnings.find(id => id.id === Number(args[0]))
            if(warn) {
                warn.deleted = "true"
                fs.writeFile(`${configs.config.botpath}\\db\\moderations\\warnings.json`, JSON.stringify(configs.db.moderation.warnings), function(err) {
                    if(err) {
                        msg.reply(`Error: ${err}`)
                    }
                })
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Usunięto warna o id ${args[0]}!`).setColor(`GREEN`))
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie ma takiego warna!`).setColor(`RED`))
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie podałeś id warna!`).setColor(`RED`))
        }
    }
}