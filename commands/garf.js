const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios")
const { rapidAPIKey, rapidAPIHost } = require("../config.json")

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("garf")
    .setDescription("Replies with a garf or something..."),
  async execute(interaction) {
    const url = `https://www.mezzacotta.net/garfield/comics/${getRandomInt(
      0,
      4848
    )}.png`
    await interaction.reply(url)
  },
}
