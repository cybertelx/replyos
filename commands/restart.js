// Reply

let Discord = require("discord.js");

let news = [
  "yay",
  "world erupts into chaos",
  "developer fired",
  "discord bankrupts",
  "karens complain"
];

let random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.run = (client, message, [id, ...msg]) => {
  if (message.partial === true) { return }
  
  let embed;
  
  if (message.author.id == client.config.creator) {
    embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("News Update:")
      .setDescription(
        "BREAKING NEWS: replyos restarts, " + news[random(0, news.length)]
      )
      .setThumbnail(
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      )
      .addFields({
        name: "Restarting the bot...",
        value:
          "Yeah, I'm restarting. See ya later!",
        inline: false
      },
      )
      .setImage(
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      )
      .setTimestamp()
      .setFooter(
        `ReplyOS by ${client.config.creatorname}`,
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      );
  } else {
    embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("News Update:")
      .setDescription(
        "BREAKING NEWS: you're not the owner, dummy"
      )
      .setThumbnail(
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      )
      .addFields({
        name: "Access denied.",
        value:
          "You can't restart it! You're not the creator!",
        inline: false
      },
      )
      .setImage(
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      )
      .setTimestamp()
      .setFooter(
        `ReplyOS by ${client.config.creatorname}`,
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      );
  }
  message.author.send(embed);
  
};
