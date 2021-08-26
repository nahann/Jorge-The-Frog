import axios from "axios";

export function getUserDetails() {
  return axios.get("http://localhost:3001/api/auth", { withCredentials: true });
}
export function getGuilds() {
  return axios.get("http://localhost:3001/api/discord/guilds", {
    withCredentials: true,
  });
}
export function getGuildConfig(guildId) {
  return axios.get(
    `http://localhost:3001/api/discord/guilds/${guildId}/config`,
    {
      withCredentials: true,
    }
  );
}

export function updateGuildPrefix(guildId, prefix) {
  return axios.put(
    `http://localhost:3001/api/discord/guilds/${guildId}/prefix`,
    { "prefix": prefix },
    { withCredentials: true }
  );
}
