// Reply

let Discord = require("discord.js");

let news = [
  "yay",
  "made for you to uh... read"
];

let random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.run = (client, message, [id, ...msg]) => {
  if (message.partial === true) { return }
  
  const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("News Update:")
      .setDescription(
        "BREAKING NEWS: this is a help message, " + news[random(0, news.length)]
      )
      .setThumbnail(
        "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
      )
      .addFields({
        name: "How to reply?",
        value:
          "ros/reply [MESSAGE ID] [Message]",
        inline: false
      },
      {
        name: "What's a message ID and how do I get it?",
        value:
          "A message ID is the internal ID of a Discord message. You usually get it using Developer Mode, and pressing Copy ID, but we made a way to do it using the bot, for you non-developers.",
        inline: false
      },
      {
        name: "How do I get it then?",
        value: "Just react to the message with a link emoji 🔗 and the bot will DM it to you!",
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
    message.author.send(embed);
};
