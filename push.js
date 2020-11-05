var webPush = require('web-push');
    
const vapidKeys = {
    "publicKey": "BFWfhkV_ydCffamzssMaSs1jDrDdZaW95bAounqsMxM5Eizr2KKv5z29VrrR3rGq1A5-DGhJM183dsy34nh-EBQ",
    "privateKey": "nTki01ImmZPJT_mX1g6J8TFKSVb6a-ElHNTRw-iey_c"
};
    
    
webPush.setVapidDetails(
    'mailto:w.settiawan@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dDYNYduRGsQ:APA91bEJmJ5snt8ex6I2rh4YV125qKCvL3awoL3SZV6mgga_EatYJ3Zfko3K4wgUdaZsKpUkMNKdFDwH5VlUHqxb93Sf9SqRFijn39YvZbypFr85b9q9e1bXO0aylOf8hYQuKZLzvQHM",
    "keys": {
        "p256dh": "BF9OXjurp1WBRk7mNkuBB6/AJ3l+VtiD6QYalNgRPz/ESx/z5lBkTms+3OERW234GVpwfGz2NE0L/lnPzDgfucQ=",
        "auth": "main.js:40 Berhasil melakukan subscribe dengan auth key:  "
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
    
var options = {
    gcmAPIKey: '1044564341606',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);