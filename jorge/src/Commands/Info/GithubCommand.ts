import ExCommand from "../../Struct/Command";
import { Message } from "discord.js"
import { GithubRepo } from "../../interfaces/githubrepo";
import fetch from "node-fetch";
export default class GithubCommand extends ExCommand{
    constructor(){
        super("github",{
            aliases: ["github","repo"],
            description: "Get any github repo's info",
            args: [{
                id: "repo",
                type: "string",
                default: "nahann/Jorge-The-Frog"
            }],
        })
    }
    async exec(message: Message,{ repo }: { repo: string}){
        type err = { message: string, documentation_url: string }
        if(!repo.includes("/") || repo.split("/").length < 2) return message.reply("The correct format is username/repo")
        const fetched = await (await fetch(`https://api.github.com/repos/${repo}`)).json() as err | GithubRepo
        if((fetched as err).message) return message.reply((fetched as err).message)
        const repository = fetched as GithubRepo
        const embeds = [
            this.client.embed({
                title: repository.name,
                url: `https://github.com/${repository.full_name}`,
                description: repository.description || "No description provided."
            },message).addField("Created at",new Date(repository.created_at).toString(),true).addField("Updated at",new Date(repository.updated_at).toString(),true).addField("Star Gazer count",repository.stargazers_count.toString(),true).addField("Watcher count",repository.watchers_count.toString(),true).addField("Forks count",repository.forks_count.toString(),true).addField("Language",repository.language,true).addField("Has issues?",repository.has_issues ? "Yes" : "No",true).addField("Has downloads?",repository.has_downloads ? "Yes" : "No",true).addField("Archived?",repository.archived ? "Yes" : "No",true).addField("Disabled",repository.disabled ? "Yes" : "No",true)
        ]
        message.reply({ embeds })
    }
}