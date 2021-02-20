const fs = require(`fs`)
//const achs = require(`mc-achievements`)
const {ICONS, AchievementCreator} = require(`mc-achievements`)

module.exports = {
    name: "achievement",
    aliases: ["mcachievement", "achievement"],
    description: "Osiągnięcie minecraft",
    perms: "None",
    category: "4fun",
    use: "achievement tytul | opis",
    execute(msg, configs, args, client, Discord, prefix) {
        let conts = args.join(' ').split('|');
        if(conts[1]) {
            //let icons = achs.ICONS.saddle;
            //let conts = args.join(' ').split("|");
            
            AchievementCreator.create(ICONS.random(), conts[0], conts[1]).then(ach => {
                msg.channel.send(new Discord.MessageAttachment(ach))
            })
        } else {
            msg.channel.send(new Discord.MessageEmbed().setDescription(`**Podaj tytuł i treść achievementu oddzielone znakiem \`|\`!**`).setColor(`RED`))
        }
    }
}