import fetch from "./Undici"
import { MessageOptions } from "discord.js";
import { ScreenshotFunction } from "../../types";
export const Screenshot: ScreenshotFunction = async(site) =>{
const BASE_URL = "https://image.thum.io/get/width/1920/crop/675/noanimate/";
if(["porn","sex","hentai","nude","fuck","xhamster"].some(idk => site.includes(idk))) return null 
const url = /^(https?:\/\/)/i.test(site) ? site : `http://${site}`
const body = await fetch(`${BASE_URL}${url}`);

return { files: [{ attachment: body, name: "Screenshot.png" }] } as MessageOptions
}