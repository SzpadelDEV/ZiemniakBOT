const strona = "https://distok.top/stickers/"
const opcje1 = ["taniec","zdenerwowane","lekkiuśmiech","głód","nie","smutek","płacz","like","strach","dzięki","tkliwość","gratulacje","uśmiech","złość","aww","rumieniec","machanie","miłość","wdrodze","myślący","sfrustrowany","chory","niezadowolony","śmiech","spanko","doping","zły","ciekawy","zaskoczony"]
const kodyopcje1 = ["749043879713701898/749052944682582036","749043879713701898/749052011751932006","749043879713701898/749052707536371812","749043879713701898/749046077629399122","749043879713701898/749048937658449952","749043879713701898/749053210760577245","749043879713701898/749054292937277450","749043879713701898/749048750864990258","749043879713701898/749053441527251087","749043879713701898/749047112028651530","749043879713701898/749054468946919454","749043879713701898/749052505308266645","749043879713701898/749044136589393960","749043879713701898/749055120263872532","749043879713701898/749051341325729913","749043879713701898/754112474868875294","749043879713701898/749054660769218631","749043879713701898/749045492352155769","749043879713701898/749049128012742676","749043879713701898/749046696482439188","749043879713701898/749051844663181383","749043879713701898/749054120345993216","749043879713701898/749051158542417980","749043879713701898/749051158542417980","749043879713701898/749053927907131433","749043879713701898/749053689419006003","749043879713701898/749049357428326438","749043879713701898/749045743976710154","749043879713701898/749051517964648458"]
const popswitch = ["-corrupted","-small","-png"]
module.exports = {
    name: "sticker",
    aliases: ["sticker", "naklejka", "str"],
    description: "Wyślij naklejkę!",
    perms: "None",
    category: "fun",
    use: "sticker taniec/zdenerwowanie/lekkiuśmiech/głód/nie/smutek/płacz/like/strach/dzięki/tkliwość/gratulacje/uśmiech/złość/aww/rumieniec/machanie/miłość/wdrodze/myślący/sfrustrowany/chory/niezadowolony/śmiech/spanko/doping/zły/ciekawy/zaskoczkony (SWITCHE) -small (mały) -corrupted (zepsuty, brak kompatybilności z małym) -png (apng, domyślnie gif)",
    execute(msg, configs, args, client, Discord, prefix) {
      if(!opcje1.includes(args[0])) return msg.channel.send("Nie ma takiego stickera. Jest taniec/zdenerwowanie/lekkiuśmiech/głód/nie/smutek/płacz/like/strach/dzięki/tkliwość/gratulacje/uśmiech/złość/aww/rumieniec/machanie/miłość/wdrodze/myślący/sfrustrowany/chory/niezadowolony/śmiech/spanko/doping/zły/ciekawy/zaskoczkony")
      if(!popswitch.includes(args[1,2])) return msg.channel.send("Nie ma takiego switcha. Jest -corrupted, -small, -png")
      if(args[1] == "-corrupted" && args[2] == "-small" || args[1] == "-small" && args[2] == "-corrupted") return msg.channel.send("Taka kombinacja switchy nie jest wspierana :(")
      if(args[1] == "-png" || args[2] == "-png"){
        msg.channel.send(strona + kodyopcje1[opcje1.indexOf(args[0])] + args[1] + ".png")
      } else {
        msg.channel.send(strona + kodyopcje1[opcje1.indexOf(args[0])] + args[1] + ".gif")
      }
    }}