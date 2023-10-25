import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '498a48d88a876dd75fa9ae2565fd1f79240931cf', queries });
export default client;
  