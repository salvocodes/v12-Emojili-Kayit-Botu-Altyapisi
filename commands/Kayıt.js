const Discord = require("discord.js"),
client = new Discord.Client();
const ayar = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
    let tamamlandiemoji = '✔️';
    let salvoembed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(`Safe Code ♥ Salvatore`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    let salvoerkekembed = new Discord.MessageEmbed().setColor(0x56aaff).setFooter(`Safe Code ♥ Salvatore`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    let salvokızembed = new Discord.MessageEmbed().setColor(0xff00ff).setFooter(`Safe Code ♥ Salvatore`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    if (!message.member.roles.cache.has(ayar.kayıtYetkilisi) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(salvoembed.setDescription(`Bu Yetkiyi Kullanabilmen İçin <@&${ayar.kayıtYetkilisi}> Rolüne Sahip Olmalısın`)).then(x => x.delete({timeout: 10000}));
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!victim) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Kullanıcı Etiketleyiniz`)).then(m => m.delete({timeout: 7000}));
    let rol = message.mentions.roles.first()
    let member = message.guild.member(victim)
    let isim = args[1];
    if(!isim) return message.channel.send(salvoembed.setDescription(`Lütfen Bir İsim Yazınız`)).then(m => m.delete({timeout: 7000}));
    let yas = args[2];
    if(!yas) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Yaş Yazınız`)).then(m => m.delete({timeout: 7000}));
    let kayıtmesaj = await message.channel.send(salvoembed.setDescription(`**__Kayıt İşlemi Başlatıldı;__**
    
    • \`Kullanıcı:\` ${victim}
    • \`Yetkili:\` ${message.author} 
    • \`Eski İsim:\` **${victim.user.username}**
    • \`Yeni İsim:\` **${isim} | ${yas}**
    
    Kayıt Türünü Emojilere Basarak Seçebilirsiniz;
    ♂️ : \`Erkek Kayıt\`, ♀️ : \`Kız Kayıt\`, ❌ : \`İşlem İptal\``))
    
    kayıtmesaj.react("♂️").then(() => kayıtmesaj.react("♀️").then(() => kayıtmesaj.react("❌")));
    const filter = (reaction, victim) => {
      return (
        ["♂️", "♀️","❌"].includes(reaction.emoji.name) &&
        victim.id === message.author.id
      );
    };
    kayıtmesaj.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }).then((collected) => {
    const reaction = collected.first();
    if (reaction.emoji.name === "♂️") {
      kayıtmesaj.edit(salvoembed.setDescription(`${victim} İsimli Kullanıcı ${message.author} Tarafından \`${isim} | ${yas}\` Adıyla Sunucuya <@&${ayar.erkekRol}> Olarak Kayıt Edildi`)).then(m => m.delete({timeout: 7000}))
      erkekKayıtGiris();
    } else if (reaction.emoji.name === "♀️") {
      kayıtmesaj.edit(salvoembed.setDescription(`${victim} İsimli Kullanıcı ${message.author} Tarafından \`${isim} | ${yas}\` Adıyla Sunucuya <@&${ayar.kızRol}> Olarak Kayıt Edildi`)).then(m => m.delete({timeout: 7000}))
      kızKayıtGiris();
    } else if (reaction.emoji.name === "❌") {
      kayıtmesaj.delete();
    } 
    })
    
    //ERKEK KAYIT İŞLEM
    const erkekKayıtGiris = async () => {
    victim.setNickname(`${isim} | ${yas}`)
    victim.roles.add(ayar.erkekRol);
    victim.roles.remove(ayar.kayıtsızRol);
    client.channels.cache.get(ayar.kayıtLogKanalı).send(salvoerkekembed.setDescription(`**__Bir Kayıt İşlemi Yapıldı [Erkek]__**
    
    • \`Kullanıcı:\` ${victim}
    • \`Yetkili:\` ${message.author} 
    • \`Eski İsim:\` **${victim.user.username}**
    • \`Yeni İsim:\` **${isim} | ${yas}**
    • \`Verilen Rol\` **<@&${ayar.erkekRol}>**
    • \`Alınan Rol\` **<@&${ayar.kayıtsızRol}>**`))
    };
    
    //KIZ KAYIT İŞLEM
    const kızKayıtGiris = () => {    
    victim.setNickname(`${isim} | ${yas}`)
    victim.roles.add(ayar.kızRol);
    victim.roles.remove(ayar.kayıtsızRol);
    client.channels.cache.get(ayar.kayıtLogKanalı).send(salvokızembed.setDescription(`**__Bir Kayıt İşlemi Yapıldı [Kız]__**
    
    • \`Kullanıcı:\` ${victim}
    • \`Yetkili:\` ${message.author} 
    • \`Eski İsim:\` **${victim.user.username}**
    • \`Yeni İsim:\` **${isim} | ${yas}**
    • \`Verilen Rol\` **<@&${ayar.kızRol}>**
    • \`Alınan Rol\` **<@&${ayar.kayıtsızRol}>**`))
    };
};

exports.config = {
  name: "Kayıt",
  guildOnly: true,
  aliases: ["kayıt","k","register"],
};