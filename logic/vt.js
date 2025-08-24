import { getFileHash } from './fileHash.js';


async function virusTotal(filePath, api_key) {
  if (!filePath) throw new Error("No file path provided");

  const hash = await getFileHash(filePath);
  console.log("MD5 hash:", hash);

  const res = await fetch(`https://www.virustotal.com/api/v3/files/${hash}`, {
    method: "GET",
    headers: {
      'accept': 'application/json',
      'x-apikey': api_key
    }
  });

  const data = await res.json();

  const stats = data.data?.attributes?.last_analysis_stats;
  console.log("last_analysis_stats:", stats);

  if (stats?.malicious > 0){
    console.log("malicious 😈");
    return stats.malicious;
  } else {
    console.log("safe! 😍");
    return 0;
  }
}

export { virusTotal };

