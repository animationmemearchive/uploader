import { Client, Storage } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

const client = new Client();

const storage = new Storage(client);

client
    .setEndpoint("https://back.arti.lol/v1")
    .setProject("65a995acebc18055db26")
    .setKey(process.env.APPWRITE_KEY)
    ;

return;
const bucketid = "videos";

const promise = await storage.listFiles(bucketid);

promise.files.forEach(file => {
    storage.deleteFile(bucketid, file.$id);
    console.log("deleted " + file.$id);
});

