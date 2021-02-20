const fs = require(`fs`)

module.exports = {
    name: "partner",
    aliases: ["partner", "partnerstwo"],
    description: "Link do bota od zawierania partnerstw!",
    perms: "None",
    category: "info",
    use: "partner",
    execute(msg, configs, args, client, Discord, prefix) {
        msg.author.send(new Discord.MessageEmbed().setTitle(`Witaj!`).setDescription(`Myślę, że chcesz z nami zawrzeć partnerstwo, aby to zrobić, musisz dodać naszego bota od tego z [**tego linku**](https://discord.com/api/oauth2/authorize?client_id=801749926577045525&permissions=8&scope=bot)!`).setFooter(`System Partnerski Ziemniaczki`, `https://cdn.discordapp.com/avatars/801749926577045525/cc526b2ea84363489736b29dbb94d927.png?size=256`).setColor(`BLUE`).setTimestamp(Date.now()))
        msg.delete()
    }
}