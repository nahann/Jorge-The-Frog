import fetch from "node-fetch"
import { MessageOptions } from "discord.js";
export const Screenshot: any = async(site : string)=>{
const BASE_URL = "https://image.thum.io/get/width/1920/crop/675/noanimate/";
if(["porn","sex","hentai","nude","fuck","xhamster"].some(idk => site.includes(idk))) return null 
const url = /^(https?:\/\/)/i.test(site) ? site : `http://${site}`
const { body } = await fetch(`${BASE_URL}${url}`);

return { files: [{ attachment: body, name: "Screenshot.png" }] } as MessageOptions
}