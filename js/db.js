let dbPromised = idb.open("footbal-apps", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("competitions", {
    keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(competition){
    dbPromised
    .then((db)=>{
        const tx = db.transaction("competitions","readwrite");
        const store = tx.objectStore("competitions");
        console.log(typeof(competition));
        store.put(competition);
        return tx.complete;
    })
    .then(()=>{
        console.log("Kompetisi berhasil tersimpan");
    });
}