import { Client, Storage, Databases, ID, InputFile } from "node-appwrite";
import fs from "fs";
import path from "path";

const client = new Client();

const storage = new Storage(client);

const databases = new Databases(client);

client
    .setEndpoint("https://back.arti.lol/v1")
    .setProject("65a995acebc18055db26")
    .setKey('432e8835a7f5bc1cd015c58e577b53e6fd22f0e3283a9f5178b182a449a28508fed4b8fd46517005ae2b8b5b1fcc765ecc396f66062a76fc6c02326e71c33de00b1e2907462693c914e0d05dff78ff7cf8c3a25068e57d57b64f0b6fedab186ead5c4fcdcb404ca4b1fd4968064d3d8fd2bb7a97ca1d6c1754183bafdf0a584c')
    ;

const filePath = "C:\\Users\\Artificial\\Desktop\\media\\minion vrchat.mp4";


async function uploadFile(filePath, creator) {
    // get datecreated from file
    const fileStats = fs.statSync(filePath);
    const dateCreated = fileStats.birthtime;

    const fileName = path.basename(filePath, path.extname(filePath));

    let filestorage = await storage.createFile(
        "videos",
        ID.unique(),
        InputFile.fromPath(filePath, fileName)
    );

    let videodoc = await databases.createDocument(
        'videos',
        'typh',
        ID.unique(),
        {
            title: fileName,
            createdDate: dateCreated,
            videoID: filestorage.$id,
            creators: creator,
        }
    );

    console.log(filestorage);
    console.log(videodoc);
}


const folderPath = "D:\\Server Stuff\\Misc. Websites\\animationmemes.arti.lol (10-15-2023)\\typh";

fs.readdir(folderPath, async (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    for (const file of files) {
        if (path.extname(file) !== ".mp4") return;
        const filePath = path.join(folderPath, file);
        await uploadFile(filePath, "65a9b33ef1b8e8743c0e");
    }
});
