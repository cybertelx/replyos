// Reply

let Discord = require("discord.js");
const { Command } = require('discord.js-commando');

let news = [
  "yay",
  "world erupts into chaos",
  "developer fired",
  "discord bankrupts",
  "insert bad thing"
];

let random = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = class StopCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restart',
			aliases: ['stop', 'shutdown'],
			group: 'misc',
			memberName: 'restart',
			description: 'Replies with the text you provide.',
      ownerOnly: true
		});
	}

	async run(message) {
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
    await message.author.send(embed);


	}
};