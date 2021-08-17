import { Config } from "./Config/Config";
import Client from "./Struct/Client";
const client = new Client()
client.login(Config.Token)