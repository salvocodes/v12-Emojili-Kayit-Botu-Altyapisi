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
    let isim = args.splice(1).join(" ");
    if(!isim) return message.channel.send(salvoembed.setDescription(`Lütfen Bir İsim Yazınız \`Örnek: ${ayar.prefix}kayıtsız @üye Ses Teyit Alınacak\` `)).then(m => m.delete({timeout: 7000}));
    let kayıtmesaj = await message.channel.send(salvoembed.setDescription(`**__İşlem Başlatıldı;__**
    
    • \`Kullanıcı:\` ${victim}
    • \`Yetkili:\` ${message.author} 
    • \`Kayıtsız İsim:\` **${isim}**
    
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
      kayıtmesaj.edit(salvoembed.setDescription(`${victim} İsimli Kullanıcı ${message.author} Tarafından \`${isim}\` Adıyla Kayıtsıza Atıldı`)).then(m => m.delete({timeout: 7000}))
      kayıtmesaj.reactions.removeAll().catch(error => console.error('Kayıt Siseminde Bir Sorun Oluştu: ', error));  
      kayıtsıGiris();
    } else if (reaction.emoji.name === "❌") {
      kayıtmesaj.delete();
    } 
    })
    
    //KAYITSIZ İŞLEM
    const kayıtsıGiris = async () => {
    victim.setNickname(`${isim}`)
    victim.roles.cache.has(ayar.boosterRol) ? victim.roles.set([ayar.boosterRol, ayar.kayıtsızRol]) : victim.roles.set([ayar.kayıtsızRol]);
    if (victim.voice.channel) victim.voice.kick();
    client.channels.cache.get(ayar.kayıtLogKanalı).send(salvoembed.setDescription(`**__Bir Kullanıcı Kayıtsıza Atıldı__**
    
    • \`Kullanıcı:\` ${victim}
    • \`Yetkili:\` ${message.author}`))
    };
      
};

exports.config = {
  name: "Kayıtsız",
  guildOnly: true,
  aliases: ["kayıtsız"],
};