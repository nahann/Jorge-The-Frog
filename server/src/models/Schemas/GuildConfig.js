const mongoose = require("mongoose");

const GuildConfigSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
  },
})

module.exports = mongoose.model("JorgeGuildConfigs", GuildConfigSchema);
