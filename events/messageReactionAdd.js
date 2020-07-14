let Discord = require("discord.js")

module.exports = async (client, reaction, user) => {
  let message = reaction.message;

  // Sigh, use partials
  if (reaction.partial === true) {
    try {
      await reaction.fetch();
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
          .addFields(
            {
              name: "This message's ID is",
              value: message.id,
              inline: false
            },
            {
              name: "How to use this with ReplyOS?",
              value: `The command to do this is ros/reply ${message.id} (your message)`,
              inline: false
            },
            {
              name: "Disclaimer",
              value: `It will mention the user you are replying to.`,
              inline: false
            }
          )
          .setImage(
            "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
          )
          .setTimestamp()
          .setFooter(
            "ReplyOS by operator#7596",
            "https://cdn.glitch.com/bee3051e-6091-4e60-a089-1742ec8d31c7%2Fros-logo-white-cropped.png"
          );
        message.channel.send(embed);
      }
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      // Return as `reaction.message.author` may be undefined/null
      message.author.send("Oh, there was an error getting the info sadly. Try reacting again?")
      return;
    }
  } else {
    // Ignore all bots
    if (user.bot) return;

    // ignore DMs
    if (message.guild === null) return;

    // Detect if it (the reaction) is a LINK emoji
    if (reaction.emoji.name === "🔗") {
      // DM the ID of the message
      // Also send a tutorial on how to use ReplyOS
      message.author.send(
        `Hello! This message's ID is: ${message.id}\n
          You can reply using the command ros/reply ${message.id} (Message)\n
          It only works if you are in the same channel as the message you're replying to.`
      );
    }
  }
};
