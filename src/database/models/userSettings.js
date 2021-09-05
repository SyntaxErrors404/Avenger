/** @format */

const { Schema, model } = require('mongoose')

const userSchema = Schema({
	userID: String,
	userName: String,
	userTag: String,
	userEmail: String,
	userAvatar: String,
	premium: { type: Boolean, default: false },
	premiumSince: String,
	// premium-only - custom rank background
	rankImage: Schema.Types.Buffer,
	// Will be used for the website (or DMs)
	Language: { type: String, default: 'en-US' },
	// If the user is banned from using commands or not
	cmdBanned: { type: Boolean, default: false },
	// Get all the guilds that user is in
	userGuilds: Array,
})

module.exports = model('User', userSchema)
