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
	"world war 69 happens"
];

let random = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

exports.run = async (client, message, [id, ...msg]) => {

	try {
		// ********************
		// FUNCTIONS TO BE USED IN OTHER PARTS OF THIS COMMAND
		// ********************

		function error() {
			console.log("Error happened!")
			let errorEmbed = new Discord.MessageEmbed()
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
					value: "An error occured. This is probably because the ID is invalid, the message was deleted or it's just the developer's fault and we should fire him!",
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
			message.channel.send(errorEmbed);
			return;
		}

		// Detect if the message is/has an embed
		function detectROSreply(message) {
			//console.log("Detect ROS Reply")
			let embed = message.embeds[0]

			if (embed === undefined) {
				return false
			}
			//console.log("Embed exists")

			if (embed.fields[1] === undefined) {
				return false
			}
			//console.log("embed.fields[1]")
			if (embed.fields[1].name !== "Replying to:") {
				return false
			}
			//console.log("embed.fields[1].name")

			return embed.fields[1].value
		}

		// Turn msg into a string
		msg = msg.join(" ")

		// ********************
		// DETECT PARAM ISSUES AND OTHER STUFF
		// ********************

		let authorMention;

		if (message.partial) {
			return;
		}

		console.log("ID: " + id);
		if (!id) {
			error();
			console.log("no id")
			return;
		}

		if (!msg) {
			error()
			console.log("no message")
			return
		}

		// ********************
		// FETCHING MESSAGE
		// ********************


		let fetchmessage = await message.channel.messages.fetch(id, false)
		console.log(fetchmessage);

		let isrosreply = detectROSreply(fetchmessage)

		if (isrosreply === false) {
			console.log("Not ROS Reply")
			authorMention = fetchmessage.author.toString()
		} else {
			console.log("Is ROS Reply")
			authorMention = isrosreply
		}

		// ********************
		// MAKE THE REPLY
		// ********************

		let replyembed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Reply")
			.setAuthor(`Sent by ${message.author.tag}`)
			.setDescription(
				"Bring structured conversations to your Discord server."
			)
			.setThumbnail(
				"https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
			)
			.addFields({
				name: "Go to message",
				value: `[Yeehaw!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${fetchmessage.id})`
			}, {
				name: "Replying to:",
				value: `${authorMention}`,
				inline: false
			}, {
				name: "Message",
				value: msg,
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
		message.channel.send(replyembed);


		// ********************
		// NOTIFY THE AUTHOR
		// ********************


		// Message the poster about someone replying to their message.
		// 1. Get ID from mention
		// 2. Get user from ID
		let authorid = authorMention.replace(/[\\<>@#&!]/g, "");
		let author = await client.users.fetch(authorid);

		console.log(author)

		let embed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("A user replied to your message.")
			.setAuthor(`Reply from ${message.author.tag}`)
			.setDescription(
				"Bring structured conversations to your Discord server."
			)
			.setThumbnail(
				"https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
			)
			.addFields({
				name: "Go to message",
				value: `[Yeehaw!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${fetchmessage.id})`
			}, {
				name: "Message",
				value: msg,
				inline: false
			})
			.setImage(
				"https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
			)
			.setTimestamp()
			.setFooter(
				`ReplyOS by ${client.config.creatorname}`,
				"https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
			)


		author.send(embed)
	} catch(e) {
    error()

    // console.log(e) // DEBUG
  }
};