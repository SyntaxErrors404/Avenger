// Dependecies
const { get } = require('axios'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Hboobs extends Command {
	constructor(bot) {
		super(bot, {
			name: 'hboobs',
			nsfw: true,
			dirname: __dirname,
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Look at NSFW images.',
			usage: 'hboobs',
			cooldown: 2000,
		});
	}

	// Run command
	async run(bot, message, settings) {
		try {
			get('https://nekobot.xyz/api/image?type=hboobs')
				.then(res => {
					const embed = new MessageEmbed()
						.setImage(res.data.message);
					message.channel.send({ embeds: [embed] });
				});
		} catch (err) {
			if (message.deletable) message.delete();
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
			message.channel.error(settings.Language, 'ERROR_MESSAGE', err.message).then(m => m.delete({ timeout: 5000 }));
		}
	}
};
