let dbPromised = idb.open("footbal-apps", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("competitions", {
    keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(competition){
    dbPromised
    .then(db => {
        const tx = db.transaction("competitions","readwrite");
        const store = tx.objectStore("competitions");
        store.put(competition);
        return tx.complete;
    })
    .then(() => {
        console.log("Kompetisi berhasil tersimpan");
    });
}

function getAll(){
    return new Promise((resolve,reject)=>{
        dbPromised
            .then(db => {
                const tx = db.transaction("competitions", "readonly");
                const store = tx.objectStore("competitions");
                return store.getAll();
            })
            .then(competitions => {
                resolve(competitions);
            });
    });
}

function getById(id){
    return new Promise((resolve,reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction("competitions", "readonly");
                const store = tx.objectStore("competitions");
                
                return store.get(parseInt(id));
            })
            .then(competition => {
                resolve(competition);
            });
    });
}

function deleteCompetition(id){
    dbPromised.then(function(db) {
        var tx = db.transaction('competitions', 'readwrite');
        var store = tx.objectStore('competitions');
        store.delete(parseInt(id));
        return tx.complete;
    }).then(function() {
        console.log('Item deleted');
    });
}