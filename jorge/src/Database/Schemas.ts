import mongoose from 'mongoose'

export const GuildConfigs = mongoose.model('JorgeGuildConfigs', new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,   
    }
}))