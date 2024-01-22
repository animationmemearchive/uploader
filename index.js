import { Client, Storage, Databases, ID, InputFile } from "node-appwrite";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { exec } from 'child_process';

dotenv.config();

const client = new Client();

const storage = new Storage(client);
const databases = new Databases(client);

client
    .setEndpoint("https://back.arti.lol/v1")
    .setProject("65a995acebc18055db26")
    .setKey(process.env.APPWRITE_KEY)
    ;

async function uploadFile(filePath, creator) {
    // get datecreated from file
    const fileStats = fs.statSync(filePath);
    const dateCreated = fileStats.mtime;

    const fileName = path.basename(filePath, path.extname(filePath));

    const pngFilePath = path.join(path.dirname(filePath), `${fileName}.png`);

    let filestorage = await storage.createFile(
        "videos",
        ID.unique(),
        InputFile.fromPath(filePath, fileName)
    );

    let thumbstorage = await storage.createFile(
        "thumbnails",
        ID.unique(),
        InputFile.fromPath(pngFilePath, fileName)
    );

    const nameCleaned = fileName.replace(/_/g, ' ').toLowerCase();

    let videodoc = await databases.createDocument(
        'videos',
        'typh',
        ID.unique(),
        {
            title: nameCleaned,
            createdDate: dateCreated,
            videoID: filestorage.$id,
            thumbID: thumbstorage.$id,
            creators: creator,
        }
    );

    console.log(filestorage);
    console.log(videodoc);
}


const folderPath = process.env.FOLDER_PATH; // fuck you butterroach

fs.readdir(folderPath, async (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach(async file => {
        if (path.extname(file) != ".mp4") return;
        console.log(file);
        const filePath = path.join(folderPath, file);

        try {
            await uploadFile(filePath, process.env.CREATOR_ID);
        } catch (error) {
            console.error(error);
        }
    });
});
