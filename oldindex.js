const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const folderPath = "C:\\Users\\Artificial\\Desktop\\media2";

const form = new FormData();
form.append('video', fs.createReadStream(folderPath + '\\albenia.mp4'));

axios.post('http://localhost:3000/upload', form, {
    headers: form.getHeaders()
})
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });

return;

const data = {
    "data": {
        "title": "My Video Title",
        "description": "This is a description of my video.",
        "date_created": "2022-01-01T00:00:00Z", // ISO 8601 date format
        "creator": 1 // ID of the related creator
    }
};

axios.post('http://localhost:1337/api/videos', data, {
    headers: {
        Authorization: 'Bearer b2c84d3c378cc9639d6df44d7ca229753e533120ad16f26c44cf37c4aa08410636f071df953ac676abf3673b424dc6dfac65bfc63cf116a57275676501fe26419a7e99d0740e2ceabe1ac0680feb4affecb122c04119c63db801f2c1ff34b1c0900bd64d870ec1b07c2f52f66e9c5d8614e65a76708a065a779eac1e5dd6ba74',
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

// Read the files in the folder
fs.readdir(folderPath, async (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }

    // Iterate through each file
    for (const file of files) {
        const filePath = path.join(folderPath, file);

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        try {
            // Send a POST request to the Strapi4 instance
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer b2c84d3c378cc9639d6df44d7ca229753e533120ad16f26c44cf37c4aa08410636f071df953ac676abf3673b424dc6dfac65bfc63cf116a57275676501fe26419a7e99d0740e2ceabe1ac0680feb4affecb122c04119c63db801f2c1ff34b1c0900bd64d870ec1b07c2f52f66e9c5d8614e65a76708a065a779eac1e5dd6ba74',
                }
            });

            console.log(`Uploaded ${file} successfully. Response:`, response.data);
        } catch (error) {
            console.error(`Error uploading ${file}:`, error.response.data);
        }
    }
});
