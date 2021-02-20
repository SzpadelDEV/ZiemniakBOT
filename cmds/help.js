const fs = require(`fs`)

module.exports = {
    name: "help",
    aliases: ["help", "pomoc"],
    description: "Komenda pomocy!",
    perms: "None",
    category: "info",
    use: "help (komenda)",
    execute(msg, configs, args, client, Discord, prefix) {
        if(args[0]) {
            const commandFiles = fs.readdirSync(`${configs.config.botpath}\\cmds`).filter(file => file.endsWith('.js'));
            const cmd = commandFiles.find(fl => require(`${configs.config.botpath}\\cmds\\${fl}`).aliases.includes(args[0]))
            if(cmd) {
                const command = require(`${configs.config.botpath}\\cmds\\${cmd}`)
                let category = "Nie znana";
                if(command.category === "info") {
                    category = `**\`🎆Informacyjne🎆\`**`
                }
                msg.channel.send(new Discord.MessageEmbed().setTitle(`Komenda **\`${command.name}\`** z kategorii ${category}`).setDescription(`Użycie: \`${command.use}\`\nOpis: ${command.description}\nUprawnienia: ${command.perms}\nAliasy: ${command.aliases.join(', ')}`))
            } else {
                msg.channel.send(new Discord.MessageEmbed().setDescription(`Nie znaleziono komendy z aliasem ${args[0]}!`).setColor(`RED`))
            }
        } else {
            const commandFiles = fs.readdirSync(`${configs.config.botpath}\\cmds`).filter(file => file.endsWith('.js'));

            var cmds = {
                moderation: [],
                information: [],
                developer: [],
                configuration: [],
                fun: [],
                partner: []
            }
        
            for (const file of commandFiles) {
                const command = require(`${configs.config.botpath}\\cmds\\${file}`);
                if(command.category === "info") {
                    cmds.information.push(`Komenda ${command.name}\nAliasy: ${command.aliases.join(', ')}`)
                } else if(command.category === "mod") {
                    cmds.moderation.push(`Komenda ${command.name}\nAliasy: ${command.aliases.join(', ')}`)
                } else if(command.category === "fun") {
                    cmds.fun.push(`Komenda ${command.name}\nAliasy: ${command.aliases.join(', ')}`)
                }
            }
    
            msg.channel.send(new Discord.MessageEmbed().setDescription(`***__\`🎊Menu Pomocy🎊\`__***\n\n**\`🎆Informacyjne🎆\`**\n${cmds.information.join('\n\n')}\n\n\`🔨Moderacyjne🔨\`\n${cmds.moderation.join(`\n\n`)}\n\n\`🚛Zabawa🚛\`\n${cmds.fun.join(`\n\n`)}`))
        }
    }
}