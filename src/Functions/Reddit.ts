import { RedditFunction } from "../../types"
import { Reddit } from "../interfaces/reddit"
import { Subreddit } from "../interfaces/subreddit"
import fetch from "node-fetch"
export const reddit: RedditFunction = async(query)=>{
    const subreddit: Subreddit = await (await fetch(`https://reddit.com/r/${query}.json`)).json()
    if(!subreddit.data?.children?.length) return { message: "Not found", error: 404 }
    const pst: Reddit = (await (await fetch(`https://reddit.com/r/${query}/random.json`)).json())[0]
    console.log(pst)
    if(pst.data.children[0].data.over_18) return { message: "NSFW not allowed" }
    if(pst.error) return pst
    const { title, selftext: description,ups: upvotes,downs: downvotes, upvote_ratio, url_overridden_by_dest: img, url, author } = pst.data.children[0].data
    return { title, description, upvote_ratio, upvotes, downvotes, img, url, author }
}