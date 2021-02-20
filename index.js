const Discord = require(`discord.js`)
const fs = require(`fs`)
const config = require(`./config.json`)
const botpath = config.botpath



let nickmatrik = `Jebać Matrika`

const { prefix, token } = require(`./config.json`)

let dbs = new Object()
dbs.moderation = new Object()
dbs.moderation.modlogs = require(`${botpath}\\db\\moderations\\modlogs.json`)
dbs.moderation.warnings = require(`${botpath}\\db\\moderations\\warnings.json`)
dbs.tickets = require(`${botpath}\\db\\tickets\\tickets.json`)
dbs.backups = require(`${botpath}\\db\\backups\\backups.json`)

const client = new Discord.Client()
const cmdspath = `${botpath}\\cmds`

const interactions = require(`discord-slash-commands-client`)
client.interactions = new interactions.Client(config.token, "797925356807520287");

client.on(`ready`, () => {
    console.log(`Logged as ${client.user.tag} | ${client.user.id}`)

    client.guilds.cache.forEach(gld => {
        client.interactions.createCommand({name: "test", description: "Testowa komenda"}, gld.id).then(console.log)
    })

    client.user.setPresence({status: "idle", activity: {name: `Problem? PW! | Wersja 1.0`, type: `STREAMING`, url: `https://www.twitch.tv/playkid_dev`}})

    // let ziemniaczki = client.guilds.cache.find(gld => gld.id === "773278836522483733")
    // ziemniaczki.fetchBans().then(bans => {
    //     if(!bans.find(ban => ban.user.id === "419144390141935626")) {
    //         client.channels.cache.find(ch => ch.id === "802282989571801088").send(`Bot nie może działać gdyż użytkownik o id \`419144390141935626\` nie jest zbanowany!`)
    //     }
    // })
    let ziemniaczki = client.guilds.cache.find(gld => gld.id === "773278836522483733")
    ziemniaczki.roles.cache.find(rl => rl.name === `Dev`).setPosition(157)

    const pokeapi = require(`pokeapi-js-wrapper`)
    const pa = new pokeapi.Pokedex();
    const interval = {
        offset: 0,
        limit: 10000,
      }
      pa.getPokemonsList(interval).then(function(response) {
        let rand = Math.floor(Math.random() * response.length)
        console.log(response)
        console.log(response.results)
        let pokename = response.results[rand].name
        console.log(pokename)
        // console.log(response)
      })

    setInterval(function() {
        if(new Date(Date.now()).getHours() == "12" && new Date(Date.now()).getMinutes() == "0") {
            const pokeapi = require(`pokeapi-js-wrapper`)
            const pa = new pokeapi.Pokedex();
            const interval = {
                offset: 34,
                limit: 10,
              }
              pa.getPokemonsList(interval).then(function(response) {
                let rand = Math.floor(Math.random() * response.length)
                pa.getPokemonByName(response[rand - 1].name)
              })
        }
    }, 60 * 1000)
})

client.on("interactionCreate", (interaction) => {
    if (interaction.name === "test") {
      interaction.channel.send("pong");
    }
  });
  

client.on(`message`, (msg) => {

    if(!msg.guild && !msg.author.bot) {
        let gld = client.guilds.cache.find(gl => gl.id === "773278836522483733")
        if(dbs.tickets.find(tc => tc.userid === msg.author.id)) {
            let tick = dbs.tickets.find(tc => tc.userid === msg.author.id)
            let channel = client.channels.cache.find(ch => ch.id === tick.channelid)
            if(channel) {
                channel.send(new Discord.MessageEmbed().setTitle(`Otrzymano wiadomość!`).setDescription(msg.content).setFooter(`By ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setColor(`GREEN`))
            }
        } else {
            let logsch = client.channels.cache.find(ch => ch.id === "802450287155347466")
            if(logsch) {
                logsch.send(new Discord.MessageEmbed().setTitle(`Nowy ticket!`).setDescription(`Temat: ` + msg.content).setFooter(`By ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setColor(`GREEN`).setImage(msg.attachments.first()))
            }
            gld.channels.create(`${msg.author.username.split(/ /g).join('-')}-${msg.author.discriminator}`).then(ch => {
                ch.setParent(client.channels.cache.find(c => c.id === "802450269290889216"))
                dbs.tickets.push({userid: msg.author.id, channelid: ch.id})
                fs.writeFile(`${botpath}\\db\\tickets\\tickets.json`, JSON.stringify(dbs.tickets), function(err) {
                    if(err) {
                        console.log(`Modmail err: ${err}`)
                    }
                })
                msg.author.send(new Discord.MessageEmbed().setTitle(`Utworzyłeś ticket!`).setDescription(`Brawo utworzyłeś ticket o temacie: ${msg.content}`))
                ch.send(new Discord.MessageEmbed().setTitle(`Nowy ticket!`).setDescription(`Temat: ` + msg.content).setFooter(`By ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setColor(`GREEN`).setImage(msg.attachments.first()))
            })
        }
    }
    if(msg.guild && !msg.author.bot && !msg.content.startsWith(`z/close`)) {
        let tick = dbs.tickets.find(tc => tc.channelid === msg.channel.id)
        if(tick) {
            let us = client.users.cache.find(us => us.id === tick.userid)
            if(us) {
                us.send(new Discord.MessageEmbed().setTitle(`Otrzymano wiadomość!`).setDescription(msg.content).setImage(msg.attachments.first()).setFooter(`By ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setColor(`GREEN`))
                msg.channel.send(new Discord.MessageEmbed().setTitle(`Wysłano wiadomość`).setDescription(msg.content).setFooter(`By ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setColor(`GREEN`).setImage(msg.attachments.first()))
                msg.delete()
            }
        }
    }
})

client.on(`message`, (msg) => {
    if(msg.guild) {
        
        if(!msg.author.bot) {

            servconf = {
                prefix: prefix
            }
            const args = msg.content.slice(servconf.prefix.lenght).trim().split(/ +/g)
    
            const cmd = args.shift().toLowerCase()

            const commandFiles = fs.readdirSync(cmdspath).filter(file => file.endsWith('.js'));
            var iscmd = false
            
            if(msg.author.id === "356100053850521600" || msg.author.id === "686270366976573540" && cmd === "zmiennick") {
                nickmatrik = args.join(' ')
            }

            for (const file of commandFiles) {
                const command = require(`${cmdspath}\\${file}`);

                if (command.aliases.includes(cmd.replace(servconf.prefix, "")) && msg.content.startsWith(servconf.prefix)) {
                    let perms = command.perms
                    configer = null;
                    let configs = {
                        conf: configer,
                        srvconf: servconf,
                        db: dbs,
                        config: config
                    }
                    if(perms === "None") {
                        command.execute(msg, configs, args, client, Discord, servconf.prefix)
                    } else if(msg.member.hasPermission(perms)) {
                        command.execute(msg, configs, args, client, Discord, servconf.prefix)
                    } else {
                        msg.channel.send(new Discord.MessageEmbed().setTitle(`Brak uprawnień!`).setDescription(`Brak permisji \`${perms}\`!`).setFooter(`Przez ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now()).setColor(`RED`))
                    }
                    var iscmd = true
                }
            }
        }
    }
})
client.on(`message`, (reactmessage) => {
    const yesnochannels = ["803899974173327360", "790240554667475004", "790240574938677289"]
    if(yesnochannels.includes(reactmessage.channel.id)) {
        reactmessage.react('803901597348266014') // Reacting with yes...
        reactmessage.react('803902204813639700') // Reacting with no...
    }
})

client.on(`guildMemberUpdate`, (member, mem2) => {
    if(member.nickname != mem2.nickname) {
        if(member.user.id === "746393005757562881") {
            mem2.setNickname(nickmatrik)
        }
        if(member.user.id === "686270366976573540") {
            mem2.setNickname(`PlayKid #TeamLudzkosc`)
        }
    }
})

client.on(`message`, (msg) => {
    if(msg.author.bot) {
        return;
    }
    if(msg.channel.id === "803899974173327360") {
        msg.react(`803901597348266014`)
        msg.react(`803902204813639700`)
    }
    if(msg.channel.id === "802287322229768242") {
        if(!msg.content.startsWith(`no:`)) {
            let cont = msg.content
            msg.channel.send(new Discord.MessageEmbed().setTitle(`📣 | Ogłoszenie!`).addFields(
                {name: `Utworzono: `, value: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`},
                {name: `Treść: `, value: `${cont}`},
                {name: `Ogłosił/a: `, value: `${msg.author.tag} | ${msg.author.id}`}
            ).setFooter(`Ogłaszał: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})))
            msg.channel.send(`Ping: <@&789971577986088960>`)
            msg.delete()
        }
    }
    if(msg.channel.id === "802457340035989535") {
        if(!msg.content.startsWith(`no:`)) {
            let cont = msg.content
            msg.channel.send(new Discord.MessageEmbed().setTitle(`📣 | Ogłoszenie!`).addFields(
                {name: `Utworzono: `, value: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`},
                {name: `Treść: `, value: `${cont}`},
                {name: `Ogłosił/a: `, value: `${msg.author.tag} | ${msg.author.id}`}
            ).setFooter(`Ogłaszał: ${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({dynamic: true})))
            msg.channel.send(`Ping: <@&789971675864629268>`)
            msg.delete()
        }
    }
    if(msg.content.toLowerCase().includes(`bruh`)) {
        msg.reply(`<:bruh:800676439691100190>`).then(sent => {
            sent.edit(`<:bruh:800676439691100190>`)
        })
    }
    if(msg.content.toLowerCase().includes(`nitro`)) {
        msg.channel.send(`Nitro może zostać wygrane na serwerze lub kupione u Pikacza.`)
    }
    // if(msg.content.toLowerCase().includes(`matrik`)) {
    //     msg.channel.send(`Jebać matrika!`)
    // }
    if(msg.content.toLowerCase().includes(`@everyone`) || msg.content.toLowerCase().includes(`@here`)) {
        msg.reply(`Skurwiaj stąd z tym pingiem!`).then(sent => {
            setTimeout(function() {
                sent.delete()
            }, 5000)
        })
    }
    if(msg.mentions.users.filter(us => !us.bot).size > 5) {
        
    }
    if(msg.content.toLowerCase().includes(`partner`) || msg.content.toLowerCase().includes(`współprac`)) {
        msg.channel.send(`Komenda \`z/partner\`!`)
    }
    if(msg.mentions.users.filter(u => !u.bot)[1] && !msg.content.startsWith(prefix)) {
        let users = [];
        msg.mentions.users.filter(u => !u.bot).forEach(us => {
            users.push(`${us.tag}`)
        })
        msg.delete()
        msg.channel.send(`Odczep sie od tych osób pingaczu jeden: ${users.join(`, `)}`)
        msg.channel.send(`Wiesz jak pingi przeszkadzają? O tak! <@${msg.author.id}>, <@${msg.author.id}>, <@${msg.author.id}>`).then(sent => {
            setTimeout(function() {
                sent.delete()
                msg.channel.send(`Wiesz jak pingi przeszkadzają? O tak! <@${msg.author.id}>, <@${msg.author.id}>, <@${msg.author.id}>`).then(sent => {
                    setTimeout(function() {
                        sent.delete()
                        msg.channel.send(`Wiesz jak pingi przeszkadzają? O tak! <@${msg.author.id}>, <@${msg.author.id}>, <@${msg.author.id}>`).then(sent => {
                            setTimeout(function() {
                                sent.delete()
                            }, 3000)
                        })
                    }, 3000)
                })
            }, 3000)
        })
    }
    if(msg.content.toLowerCase().includes(`hej`) || msg.content.toLowerCase().includes(`cześć`) || msg.content.toLowerCase().includes(`czesc`) || msg.content.toLowerCase().includes(`siema`) || msg.content.toLowerCase().includes(`wita`)) {
        msg.channel.send(`Siemka, co u cb?`)
    }
    if(msg.content.toLowerCase().includes(`aha`) && !msg.content.toLowerCase().includes(`haha`)) {
        msg.channel.send(`aha to słowo często używane przez discordowców`)
    }
})

client.login(token)