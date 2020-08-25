require("dotenv").config();

const { Client } = require("discord.js");
const bot = new Client({
  partials: ["MESSAGE", "REACTION"]
});
const PREFIX = "$";

bot.on("ready", () => {
  console.log(`${bot.user.tag} has logged in!`);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You do not have permission to use that command!");
      if (args.length === 0) return message.reply("Please provide an ID");
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        memeber
          .kick()
          .then(member => message.channel.send(`${member} was kicked`))
          .catch(err => message.channel.send("I cannot kick that user"));
      } else {
        message.channel.send("That memeber was not find!");
      }
    } else if (CMD_NAME === "ban") {
      if (message.member.hasPermission("BAN_MEMBERS"))
        return message.reply("You do not have permission to use that command!");
      if (args.length === 0) return message.reply("Please provide an ID");
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("User was banned successfully");
      } catch (err) {
        console.log(err);
        message.channel.send(
          "An error occured. Either I do not have permissions or the user was not found"
        );
      }
    }
  }
});

bot.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "747832332680953926") {
    switch (name) {
      case "🍌":
        member.roles.add("747826269894344756");
        break;
      case "🍇":
        member.roles.add("747827220344471693");
        break;
      case "🍑":
        member.roles.add("747827286249701468");
        break;
      case "🍎":
        member.roles.add("747827363194077276");
        break;
    }
  }
});

bot.on("messageReactionRemove", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "747832332680953926") {
    switch (name) {
      case "🍌":
        member.roles.remove("747826269894344756");
        break;
      case "🍇":
        member.roles.remove("747827220344471693");
        break;
      case "🍑":
        member.roles.remove("747827286249701468");
        break;
      case "🍎":
        member.roles.remove("747827363194077276");
        break;
    }
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);
