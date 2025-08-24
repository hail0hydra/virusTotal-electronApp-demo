import fs from 'fs/promises';
import crypto from 'crypto';


async function getFileHash(path) {
    try{
        const file = await fs.readFile(path);
        const hash = crypto.createHash("md5").update(file).digest("hex");
        // console.log(`MD5 hash of the file ${path}: ${hash}`)
        return hash;
    } catch (err){
        console.log(`Error reading file: ${err}`);
    }
}


getFileHash("../malware/malware.xlsm");


export { getFileHash };
