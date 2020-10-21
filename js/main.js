if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker
            .register("/sw.js")
            .then(()=>{
                console.log("Pendaftaran SW berhasil");
            })
            .catch(()=>{
                console.log("SW gagal");
            });
    });
}else{
    console.log("Browser tidak support");
}