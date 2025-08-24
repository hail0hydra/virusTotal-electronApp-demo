const api_key = process.env.VT_API_KEY;

const hash = "8c7120cb9643e650f00bfd5fb93a35842be5f15a7900576fba076c39108bd5cf";

async function virusTotal(){
    const res = await fetch(`https://www.virustotal.com/api/v3/files/${hash}`, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'x-apikey': api_key
        }
    });
    return res.json();
}

const file = await virusTotal();

console.log(`${JSON.stringify(file, null, 2)}`)
