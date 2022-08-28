const { SlashCommandBuilder } = require('discord.js')
const { getComic } = require('../comicUtils')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dilbert')
    .setDescription('Sends a random dilbert!'),
  async execute(interaction) {
    await interaction.deferReply()

    const comicName = 'dilbert-classics'
    const firstComicDate = new Date(2012, 5, 13)

    try {
      const imageString = await getComic(comicName, firstComicDate)
      await interaction.editReply(imageString)
    } catch {
      await interaction.editReply('Bad garf, try again')
    }
  },
}
