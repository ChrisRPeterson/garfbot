const { SlashCommandBuilder } = require('discord.js')
const { getComic } = require('../comicUtils')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calvin')
    .setDescription('Sends a random Calvin and Hobbes!'),
  async execute(interaction) {
    await interaction.deferReply()

    const comicName = 'calvinandhobbes'
    const firstComicDate = new Date(1985, 10, 18)

    try {
      const imageString = await getComic(comicName, firstComicDate)
      await interaction.editReply(imageString)
    } catch {
      await interaction.editReply('Bad garf, try again')
    }
  },
}
