if("serviceWorker" in navigator){
    navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
        console.log("Pendaftaran SW berhasil");
    })
    .catch(() => {
        console.log("SW gagal");
    });
}else{
    console.log("Browser tidak support");
}

if ("Notification" in window) requestPermission();

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }
        
        navigator.serviceWorker.ready.then(() => {
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BFWfhkV_ydCffamzssMaSs1jDrDdZaW95bAounqsMxM5Eizr2KKv5z29VrrR3rGq1A5-DGhJM183dsy34nh-EBQ")
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    });
}
}
