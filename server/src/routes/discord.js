const router = require("express").Router();
const { getBotGuilds } = require("../utils/api.js");
const User = require("../models/Schemas/User");
const { getMutualGuilds } = require("../utils/utils");
const GuildConfig = require("../models/Schemas/GuildConfig");

router.get("/guilds", async (req, res) => {
  const guilds = await getBotGuilds();
  const user = await User.findOne({ discordId: req.user.discordId });

  if (user) {
    const userGuilds = user.get("guilds");
    const mutualGuilds = getMutualGuilds(userGuilds, guilds);
    res.send(mutualGuilds);
  } else {
    return res.status(401).json({ msg: "unauthorized" });
  }
});

router.put("/guilds/:guildId/prefix", async (req, res) => {
  console.log(req.body, req.params)
  const { prefix } = req.body;
  const { guildId } = req.params;
  if (!prefix) return res.status(400).json({ msg: "prefix required" });
  const update = await GuildConfig.findOne({ guildId }) ? await GuildConfig.findOneAndUpdate({ guildId },{ prefix },{ new: true }) : await new GuildConfig({ guildId, prefix }).save()

  return update
    ? res.send(update)
    : res.status(404).json({ msg: "could not find document" });
});
router.get("/guilds/:guildid/config", async (req, res) => {
  const { guildid } = req.params;
  const config = await GuildConfig.findOne({ guildId: guildid });
  return config ? res.send(config) : res.json({ guildId: guildid, prefix: ';' })
});

module.exports = router;
