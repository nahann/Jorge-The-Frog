import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Client from "../Struct/Client";
export default {
    ...new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command")
    .toJSON(),
    run: async(client: Client,interaction: CommandInteraction)=>{
        interaction.reply("Pong")
    },
    guild: true 
}