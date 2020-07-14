// Reply

let Discord = require("discord.js");

let news = [
  "biggest economic depression since 1929",
  "protests break out across the nation",
  "computer systems around the world explode",
  "everyone gets mad",
  "developer fired",
  "discord files for bankruptcy",
  "dead memes sweep the internet",
  "something happens idk what",
  "a dead meme is voted president",
  "kekistani president explodes",
  "secret north korean base gets found",
  "world war 69 happens"
];

let random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.run = (client, message, [id, ...msg]) => {
  // Turn msg into a string
  msg = msg.join(" ")
  
  function errorhappened() {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("News Update:")
      .setAuthor(`Sorry, ${message.author.tag} :(`)
      .setDescription(
        "BREAKING NEWS: replybot fails, " + news[random(0, news.length)]
      )
      .setThumbnail(
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      )
      .addFields({
        name: "oh noes",
        value:
          "An error occured. This is probably because the ID is invalid, the message was deleted or it's just the developer's fault and we should fire him!",
        inline: false
      })
      .setImage(
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      )
      .setTimestamp()
      .setFooter(
        `ReplyOS by ${client.config.creatorname}`,
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      );
    message.channel.send(embed);
    return;
  }

  try {
    if (message.partial) {
      return;
    }

    console.log("ID: " + id);
    if (!id) {
      errorhappened();
      return;
    }
    message.channel.messages
      .fetch(id, false)
      .then(fetchmessage => {
        console.log(fetchmessage);

        // Make an embed

        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Reply")
          .setAuthor(`Sent by ${message.author.tag}`)
          .setDescription(
            "Bring structured conversations to your Discord server."
          )
          .setThumbnail(
            "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
          )
          .addFields(
            {
              name: "Go to message",
              value: `[Yeehaw!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${fetchmessage.id})`
            },
            {
              name: "Replying to:",
              value: `${fetchmessage.author}`,
              inline: false
            },
            {
              name: "Message",
              value: msg,
              inline: false
            }
          )
          .setImage(
            "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
          )
          .setTimestamp()
          .setFooter(
            `ReplyOS by ${client.config.creatorname}`,
            "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
          );
        message.channel.send(embed);
      })
      .catch(() => {
        errorhappened();
        return;
      });
  } catch (e) {
    errorhappened();
    return;
  }
};
