const fileInput = document.getElementById("fileInput");


function onFilePicked(callback){
    fileInput.addEventListener("change", (event)=>{
        const file = event.target.files[0];

        if (file) {
            callback(file);
        }
    })
}


export { onFilePicked };
