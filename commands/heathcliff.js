const { SlashCommandBuilder } = require('discord.js')
const { getComic } = require('../comicUtils')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('heathcliff')
    .setDescription('Sends a random heathcliff!'),
  async execute(interaction) {
    await interaction.deferReply()

    const comicName = 'heathcliff'
    const firstComicDate = new Date(2002, 0, 1)

    try {
      const imageString = await getComic(comicName, firstComicDate)
      await interaction.editReply(imageString)
    } catch {
      await interaction.editReply('Bad cat, try again')
    }
  },
}
