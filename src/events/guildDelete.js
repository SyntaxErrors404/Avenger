// Dependencies
const { GiveawaySchema, RankSchema, WarningSchema } = require('../database/models'),
	{ MessageEmbed } = require('discord.js'),
	Event = require('../structures/Event');

module.exports = class guildDelete extends Event {
	async run(bot, guild) {
		bot.logger.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
		// Delete server settings
		await bot.DeleteGuild(guild);

		// Send message to channel that bot has left a server
		try {
			const embed = new MessageEmbed()
				.setTitle('Avenger left a server.')
				.setDescription(guild.name)
				.setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
				.setColor('RED')
				.addField('Owner', guild.owner.user.tag)
				.addField('Member Count', guild.memberCount)
				.setFooter(guild.id)
				.setTimestamp();
			// Find channel and send message
			const modChannel = await bot.channels.fetch(bot.config.SupportServer.GuildChannel);
			if (modChannel) bot.addEmbed(modChannel.id, embed);
		} catch (err) {
			bot.logger.error('Unable to fetch guild information.');
		}

		// Clean up database (delete all guild data)
		try {
			const r = await RankSchema.deleteMany({
				guildID: guild.id,
			});
			console.log(r);
		} catch (err) {
			bot.logger.error(`Failed to delete Ranked data, error: ${err.message}`);
		}

		try {
			await GiveawaySchema.deleteMany({
				guildID: guild.id,
			});
		} catch (err) {
			bot.logger.error(`Failed to delete Giveaway data, error: ${err.message}`);
		}

		try {
			await WarningSchema.deleteMany({
				guildID: guild.id,
			});
		} catch (err) {
			bot.logger.error(`Failed to delete Warning data, error: ${err.message}`);
		}
	}
};