const { SlashCommandBuilder } = require("discord.js")
const { getImage } = require("gocomics-api")

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("garf")
    .setDescription("Replies with a garf or something..."),
  async execute(interaction) {
    const d = randomDate(new Date(2012, 0, 1), new Date())

    const imageString = await getImage({
      date: [d.getFullYear(), d.getMonth() + 1, d.getDate()],
      comicName: "garfield",
      URLOnly: true,
    })
    await interaction.reply(imageString)
  },
}
