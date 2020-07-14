let Discord = require("discord.js")

function info(client,reaction,user) {
	let message = reaction.message;
	
	// Ignore all bots
	if (user.bot) return;

	// ignore DMs
	if (message.guild === null) return;

	// Detect if it (the reaction) is a LINK emoji
	if (reaction.emoji.name === "🔗") {
			// DM the ID of the message
			// Also send a tutorial on how to use ReplyOS
			// Make an embed

			const embed = new Discord.MessageEmbed()
					.setColor("#0099ff")
					.setTitle("Reply")
					.setDescription(
							"Bring structured conversations to your Discord server."
					)
					.setThumbnail(
							"https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
					)
					.addFields({
							name: "This message's ID is",
							value: message.id,
							inline: false
					}, {
							name: "How to use this with ReplyOS?",
							value: `The command to do this is ros/reply ${message.id} (your message)`,
							inline: false
					}, {
							name: "Disclaimer",
							value: `It will mention the user you are replying to.`,
							inline: false
					})
					.setImage(
							"https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
					)
					.setTimestamp()
					.setFooter(
							"ReplyOS by operator#7596",
							"https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
					);
			user.send(embed);
	}
}
module.exports = async (client, reaction, user) => {

    // Sigh, use partials
    if (reaction.partial === true) {
        try {
            await reaction.fetch();
            info(client,reaction,user)
        } catch (error) {
            console.log("Something went wrong when fetching the message: ", error);
            // Return as `reaction.message.author` may be undefined/null
            user.send("Oh, there was an error getting the info sadly. Try reacting again?")
            return;
        }
    } else {
        info(client,reaction,user)
    }
}