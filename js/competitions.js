function competitions(data){
    let articlesHTML = "";
        data.competitions.forEach((article)=>{
            let emblem = article.area.ensignUrl;
            if(emblem == null) {
                emblem = "img/Fifa.svg";
                if(article.emblemUrl != null){
                    emblem = article.emblemUrl;
                }
            };

        articlesHTML+= `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <a href="./pages/detail-competitions.html?id=${article.id}">
                            <img class="emblem responsive-img" src="${emblem}">
                        </a>
                    </div>

                    <div class="card-content">
                        <h5 class="truncate">${article.name}</h5>
                        <p>${article.area.name}</p
                        <p>Matchday ${article.currentSeason.currentMatchday}</p>
                    </div>
                </div>
            </div>
            `;
        });
    document.getElementById("competitions").innerHTML = articlesHTML;
}

function getCompetitions(){
    if('caches' in window){
        caches.match(`${baseUrl}competitions/?plan=TIER_ONE`).then((response)=>{
            if(response){
                response.json().then((data)=>{
                    competitions(data);
                    document.querySelector(".progress").className= " hidden";
                });
            }
        });
    }
    
    fetch(`${baseUrl}competitions/?plan=TIER_ONE`,{method:methodUse,headers:AuthToken})
        .then(status)
        .then(json)
        .then((data)=>{
            document.querySelector(".progress").className= " hidden";
            competitions(data);
        })
        .catch(error);
}

function getCompetitionsById(){
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    fetch(`${baseUrl}competitions`)
}