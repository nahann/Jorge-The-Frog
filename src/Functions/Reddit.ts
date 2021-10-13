import { RedditFunction } from "../../types"
import { Reddit } from "../interfaces/reddit"
import { Subreddit } from "../interfaces/subreddit"
import fetch from "node-fetch"
export const reddit: RedditFunction = async(query)=>{
    const subreddit: Subreddit = await (await fetch(`https://reddit.com/r/${query}.json`)).json()
    console.log(subreddit)
    if(!subreddit.data.children.length) return { message: "Not found", error: 404 }
    if(subreddit.data.children[0].data.over_18) return { message: "NSFW not allowed" }
    const pst: Reddit = (await (await fetch(`https://reddit.com/r/${query}/random.json`)).json())[0]
    if(pst.error) return pst
    const { title, selftext: description,ups: upvotes,downs: downvotes, upvote_ratio, thumbnail: img,url, author } = pst.data.children[0].data
    return { title, description, upvote_ratio, upvotes, downvotes, img, url, author }
}