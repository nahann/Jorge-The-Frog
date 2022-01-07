import { request } from "undici"
export default async function fetch(url: string, options?: any) {
    return (await request(url, options)).body
}