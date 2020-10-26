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
    return new Promise((resolve, reject)=>{
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        let tableStandings = "";
        let detailCompetition = `
            <div class="row">
                <div class="col s12 m8">
                    <div class="card">
                        <h5 class="grey-text">Standing Tables</h5>
                        <table id="standings"></table>
                    </div>
                </div>
                <div class="col s12 m4 grey-text">
                    <div class="row">
                        <div class="card">
                            <h5>Top Scorers</h5>
                            <table id="scorers">SOON</table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="card">
                            <h5>Next Match</h5>
                            <table id="matches">SOON</table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if('caches' in window){
            caches.match(`${baseUrl}competitions/${idParam}/standings`).then((response)=>{
                if(response){
                    response.json().then((data)=>{
                        getStandings(data);
                        resolve(data);
                    });
                }
            });
        }

        fetch(`${baseUrl}competitions/${idParam}/standings`,{method:methodUse,headers:AuthToken})
            .then(status)
            .then(json)
            .then((data)=>{
                getStandings(data);
                resolve(data);
            })
            .catch(error);
        document.getElementById("body-content").innerHTML = detailCompetition;
    });
}

function getStandings(data){
    tableStandings = `
    <tr>
        <th>Pos.</th>
        <th>Club</th>
        <th>Win</th>
        <th>Draw</th>
        <th>Lose</th>
        <th>Points</th>
    </tr>`;
    data.standings[0].table.forEach((dataTable)=>{
        tableStandings += `
            <tr>
                <td class="center">${dataTable.position}</td>
                <td>${dataTable.team.name}</td>
                <td class="center">${dataTable.won}</td>
                <td class="center">${dataTable.draw}</td>
                <td class="center">${dataTable.lost}</td>
                <td class="center">${dataTable.points}</td>
            </tr>
        `;

    document.getElementById("standings").innerHTML = tableStandings;
    });
};
