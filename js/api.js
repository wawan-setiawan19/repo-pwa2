const baseUrl = "http://api.football-data.org/v2/";

// cek koneksi
function status(response){
    if(response.status !== 200){
        console.log(`Error: ${response.status}`);

        return Promise.reject(new Error(response.statusText));
    }else{
        return Promise.resolve(response);
    }
}

// parsing data
function json(response){
    return response.json();
}

// handle kesalahan
function error(error){
    console.log(`Error: ${error}`);
}

// request data
function getCompetitions(){
    fetch(`${baseUrl}competitions/?plan=TIER_ONE`,{method:'GET',headers:{'X-Auth-Token':'ac40da2ccc4d4cfb97446629eba68930'}
    })
     .then(status)
     .then(json)
     .then((data)=>{
        //  objek masuk ke paramater data

        // komponen card
        let articlesHTML = "";
        data.competitions.forEach((article)=>{
            articlesHTML+= `
                <div class="card">
                 <div class="card-image">
                    <img src="${article.emblemUrl}">
                 </div>
                 <div class="card-content">
                  ${article.name}
                 </div>
                </div>
            `;
            console.log(article.name);
        });
        // data.result.forEach((article)=>{
        //     console.log(article.id);
        // });
        console.log(data.competitions);
        document.getElementById("articles").innerHTML = articlesHTML;
     })
     .catch(error);
}