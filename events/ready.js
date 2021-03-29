const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `Safe Code ♥ Salvatore`}, status: 'idle' })
};


// Status
// online - Çevrimiçi
// idle - Boşta
// dnd - Rahatsız Etmeyin

// Type
// WATCHING - İZLİYOR
// PLAYING - OYNUYOR
// LISTENING - DİNLİYOR


// "Safe Code ♥ Salvatore" Yazan Kısıma İstediğiniz Durumunu Yazabilirsiniz 
