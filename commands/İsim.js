const Discord = require("discord.js"),
client = new Discord.Client();
const ayar = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
    let tamamlandiemoji = '☑️';
    let salvoembed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(`Safe Code ♥ Salvatore`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    if (!message.member.roles.cache.has(ayar.kayıtYetkilisi) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(salvoembed.setDescription(`Bu Yetkiyi Kullanabilmen İçin <@&${ayar.kayıtYetkilisi}> Rolüne Sahip Olmalısın`)).then(x => x.delete({timeout: 10000}));
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!victim) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Kullanıcı Etiketleyiniz`)).then(m => m.delete({timeout: 7000}));
    let rol = message.mentions.roles.first()
    let member = message.guild.member(victim)
    let isim = args[1];
    if(!isim) return message.channel.send(salvoembed.setDescription(`Lütfen Bir İsim Yazınız`)).then(m => m.delete({timeout: 7000}));
    let yas = args[2];
    if(!yas) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Yaş Yazınız`)).then(m => m.delete({timeout: 7000}));
   
    let kayıtmesaj = await message.channel.send(salvoembed.setDescription(`**__İşlem Başlatıldı;__**
    
    • \`Kullanıcı:\` ${victim}
    • \`Yetkili:\` ${message.author} 
    • \`Yeni İsim:\` **${isim} | ${yas}**
    
    İşlemi Tamamlamak veya Sonlandırmak İçin Emojilere Basın;
    ☑️ : \`Kabul Et\`, ❌ : \`İşlem İptal\``))
    
    kayıtmesaj.react("☑️").then(() => kayıtmesaj.react("❌"));
    const filter = (reaction, victim) => {
      return (
        ["☑️","❌"].includes(reaction.emoji.name) &&
        victim.id === message.author.id
      );
    };
    
    kayıtmesaj.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }).then((collected) => {
    const reaction = collected.first();
    if (reaction.emoji.name === "☑️") {
      kayıtmesaj.edit(salvoembed.setDescription(`${victim} İsimli Kullanıcının Adı ${message.author} Tarafından \`${isim} | ${yas}\` Olarak Değiştirildi`)).then(m => m.delete({timeout: 7000}))
      kayıtmesaj.reactions.removeAll().catch(error => console.error('Kayıt Siseminde Bir Sorun Oluştu: ', error));  
      kayıtsıGiris();
    } else if (reaction.emoji.name === "❌") {
      kayıtmesaj.delete();
    } 
    })
    
    //KAYITSIZ İŞLEM
    const kayıtsıGiris = async () => {
    victim.setNickname(`${isim} | ${yas}`)
    client.channels.cache.get(ayar.kayıtLogKanalı).send(salvoembed.setDescription(`**__Bir Kullanıcının Adı Değiştirildi__**

    • \`Kullanıcı:\` ${victim}
    • \`Yetkili:\` ${message.author}
    • \`Yeni İsim:\` ${isim} | ${yas}`))
    };
      
};

exports.config = {
  name: "İsim",
  guildOnly: true,
  aliases: ["isim","i"],
};