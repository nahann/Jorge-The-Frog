import { RedditFunction } from "../../types"
import { Reddit } from "../interfaces/reddit"
import { Subreddit } from "../interfaces/subreddit"
import fetch from "./Undici";
export const reddit: RedditFunction = async(query)=>{
    const subreddit = await (await fetch(`https://reddit.com/r/${query}.json`)).json() as Subreddit
    if(!subreddit.data?.children?.length) return { message: "Not found", error: 404 }
    const pst = (await (await fetch(`https://reddit.com/r/${query}/top.json?limit=60`)).json()) as Reddit | Reddit[]
    let post = pst as Reddit
    if(pst.constructor == Array){
        post = pst[Math.floor(Math.random() * pst.length)]
    }
    if(post.data.children[0].data.over_18) return { message: "NSFW not allowed" }
    if(post.error) return post
    const { title, selftext: description,ups: upvotes,downs: downvotes, upvote_ratio, url_overridden_by_dest: img, permalink, author } = post.data.children[Math.floor(Math.random() * post.data.children.length)].data
    return { title, description, upvote_ratio, upvotes, downvotes, img, url: `https://reddit.com${permalink}`, author }
}