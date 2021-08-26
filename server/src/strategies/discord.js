const passport = require("passport");
const DiscordStrategy = require("passport-discord");
const User = require("../models/Schemas/User");

passport.serializeUser((user, done) => {
  done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await User.findOne({ discordId });
    return user ? done(null, user) : done(null, null);
  } catch (e) {
    console.error(e.message);
    done(e, null);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: process.env.CALLBACK,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, username, discriminator, avatar, guilds } = profile;
      try {
        const findUser = await User.findOneAndUpdate(
          { discordId: id },
          {
            discordtag: `${username}#${discriminator}`,
            avatar,
            guilds,
            username,
            discriminator,
          },
          { new: true }
        );
        if (findUser) {
          console.log("[INFO] - User was found");
          return done(null, findUser);
        } else {
          const newUser = await User.create({
            discordId: id,
            discordtag: `${username}#${discriminator}`,
            avatar,
            guilds,
            username,
            discriminator,
          });
          return done(null, newUser);
        }
      } catch (e) {
        console.error(e.message);
        return done(e, null);
      }
    }
  )
);
