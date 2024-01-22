import ytpl from 'ytpl';
import ytdl from 'ytdl-core';
import { Client, Storage, Databases, ID, InputFile } from "node-appwrite";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const client = new Client();

const storage = new Storage(client);
const databases = new Databases(client);

client
    .setEndpoint("https://back.arti.lol/v1")
    .setProject("65a995acebc18055db26")
    .setKey(process.env.APPWRITE_KEY)
    ;

const playlist = await ytpl('UU_aEa8K-EOJ3D6gOs7HcyNg');

async function appwriteUpload(filePath, creator) {
    // get datecreated from file
    const fileStats = fs.statSync(filePath);
    const dateCreated = fileStats.birthtime;

    const fileName = path.basename(filePath, path.extname(filePath));



    console.log(filestorage);
    console.log(videodoc);
}



async function singleVideo(url, creator) {



    await new Promise((resolve, reject) => {
        ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
            .pipe(fs.createWriteStream('video.mp4'))
            .on('finish', resolve)
            .on('error', reject);
    });

    const videoInfo = await ytdl.getInfo(url);

    // console.log(videoInfo.videoDetails);

    let filestorage = await storage.createFile(
        "videos",
        ID.unique(),
        InputFile.fromPath('video.mp4', videoInfo.videoDetails.videoId)
    );

    console.log(filestorage);

    let videodoc = await databases.createDocument(
        'videos',
        'typh',
        ID.unique(),
        {
            title: videoInfo.videoDetails.title,
            createdDate: videoInfo.videoDetails.uploadDate,
            videoID: filestorage.$id,
            creators: creator,
        }
    );


    console.log(videodoc)
}

singleVideo('http://www.youtube.com/watch?v=aqz-KE-bpKQ');