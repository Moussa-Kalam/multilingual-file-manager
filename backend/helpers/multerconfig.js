import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { cwd } from 'process';


const checkDirectory = directory => {
    if(!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true});
}

const fileDocumentStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        const fileDirectory = path.join(cwd(), "public","uploads");
        checkDirectory(fileDirectory)

       callback(null, fileDirectory);
    },
    filename: (request, file, callback) => {
        callback(null, `${file.originalname}`);
    },
})

export default multer({ storage: fileDocumentStorage }).array("files")  