const fs = require("node:fs")
const path = require("node:path")
const { Client, Collection, GatewayIntentBits } = require("discord.js")
const { token } = require("./config.json")

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const eventsPath = path.join(__dirname, "events")
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

client.commands = new Collection()
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command)
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    })
  }
})

client.login(token)
