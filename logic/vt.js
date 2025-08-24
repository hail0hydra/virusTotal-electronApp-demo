// import fs from 'fs/promises';
import { getFileHash } from './fileHash';

const api_key = process.env.VT_API_KEY;

const path = "../malware/malware.xlsm";
const hash = await getFileHash(path);

// const hash = "1b109efade90ace7d953507adb1f1563";

async function virusTotal(){
    const res = await fetch(`https://www.virustotal.com/api/v3/files/${hash}`, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'x-apikey': api_key
        }
    });

    const data = await res.json();

    // await fs.writeFile("out.json", JSON.stringify(data, null, 2), "utf-8");

    const point = Object.keys(data)[0]

    if (data[point].attributes.popular_threat_classification.popular_threat_name[0].count > 0){
        console.log("malicious 😈");
        return  data[point].attributes.popular_threat_classification.popular_threat_name[0].count;
    } else {
        console.log("safe! 😍");
        return 0;
    }


}

const file =  await virusTotal();

console.log(file);



export { virusTotal };
