const { SlashCommandBuilder } = require('discord.js')
const { getComic } = require('../comicUtils')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('garf')
    .setDescription('Sends a random garf!'),
  async execute(interaction) {
    await interaction.deferReply()

    const comicName = 'garfield'
    const firstComicDate = new Date(1978, 5, 19)

    try {
      const imageString = await getComic(comicName, firstComicDate)
      await interaction.editReply(imageString)
    } catch {
      await interaction.editReply('Bad garf, try again')
    }
  },
}
