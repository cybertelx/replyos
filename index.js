// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const { Client } = require("discord.js");
const http = require('http');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  
  var ip = request.connection.remoteAddress;
  
  response.sendStatus(200);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(
    `${client.config.log_name} Express is listening on port ${
      listener.address().port
    }`
  );
});

// Discord.JS

const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const config = require("./config.json");
const token = process.env.SECRET;
const fs = require("fs");

client.config = config;
client.commands = {};

client.on("ready", () => {
  client.user
    .setPresence({
      activity: {
        name: "ros/help",
        type: "WATCHING"
      },
      status: "online"
    })
    .catch(console.error);

  if (client.config.logging == true) {
    console.log(`${client.config.log_name} Up and ready!`);
  }
});

client.getUserFromMention = function(mention) {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
};

fs.readdir("./events/", (err, files) => {
  if (client.config.logging == true) {
    if (err) return console.error(err);
  }
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    if (client.config.logging == true) {
      console.log(
        `${client.config.log_name} Loaded an event, the name was ${eventName}`
      );
    }
//    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    if (client.config.logging == true) {
      console.log(
        `${client.config.log_name} Loading command ${config.prefix}${commandName}.`
      );
    }
    client.commands[commandName] = props;
  });
});

client.login(token);
