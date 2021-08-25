import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
import fetch from "node-fetch";
import { Covid } from "../../interfaces/covid";
export default class CovidCommand extends ExCommand{
    constructor(){
        super("covid",{
            aliases: ["covid","corona"],
            description: "Get covid stats of a country",
            args: [{
                id: "country",
                type: "STRING"
            }]
        })
    }
    async exec(message: Message,{ country }: { country: string }){
        type notfound = { message: string }
        let json = await (await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}`)).json() as Covid | notfound
        function format(n:number){
            return n.toString().split("").reverse().join("").match(new RegExp('.{1,' + 3 + '}', 'g'))?.reverse().join(",") as string
        }
        function fixDown(n: number,digits: number) {
            var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
                m = n.toString().match(re);
            return m ? parseFloat(m[1]) : n.valueOf();
        };
        if((json as notfound).message == "Country not found or doesn't have any cases") return message.reply("Country not found")
        json = json as Covid
        const embeds = [
            this.client.embed({
                title: json.country,
                fields: [{
                    name: "Continent",
                    value: json.continent,
                    inline: true
                },{
                    name: "Total cases",
                    value: format(json.cases),
                    inline: true
                },{
                    name: "Total tests",
                    value: format(json.tests),
                    inline: true
                },{
                    name: "Recovered",
                    value: format(json.recovered),
                    inline: true
                },{
                    name: "Active cases",
                    value: format(json.active),
                    inline: true
                },{
                    name: "Critical cases",
                    value: format(json.critical),
                    inline: true
                },{
                    name: "Deaths",
                    value: format(json.deaths),
                    inline: true
                },{
                    name: "Today recovered",
                    value: format(json.todayRecovered),
                    inline: true
                },{
                    name: "Today cases",
                    value: format(json.todayCases),
                    inline: true
                },{
                    name: "Today deaths",
                    value: format(json.todayDeaths),
                    inline: true
                },{
                    name: "Active population percentage",
                    value: `${fixDown((json.active / json.population) * 100,2)}%`,
                    inline: true
                }]
            },message).setFooter(`Last updated at ${new Date(json.updated).toLocaleString()}`).setThumbnail(json.countryInfo.flag)
        ]
        message.reply({ embeds })
    }
}