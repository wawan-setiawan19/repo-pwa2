function showCompetitions(data){
    let articlesHTML = "";
    data.competitions.forEach(article => {
        if(article.plan == "TIER_ONE"){
            let emblem = article.area.ensignUrl;
            if(emblem == null) {
                emblem = "img/Fifa.svg";
                if(article.emblemUrl != null){
                    emblem = article.emblemUrl;
                }
            };
            let matchDay = "";
            if(article.currentSeason === null) matchDay = "0";
    
                articlesHTML += `
                <div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-image">
                            <a href="./pages/detail-competitions.html?id=${article.id}">
                                <img class="emblem responsive-img" src="${emblem}" alt="logo-competitions">
                            </a>
                        </div>
    
                        <div class="card-content">
                            <h5 class="truncate">${article.name}</h5>
                            <p>${article.area.name}</p
                            <p>Matchday ${matchDay}</p>
                        </div>
                    </div>
                </div>
                `;
            }
    });
    document.getElementById("competitions").innerHTML = articlesHTML;
}

function getCompetitions(){
    if('caches' in window){
        caches.match(`${baseUrl}competitions/`).then(response => {
            if(response){
                response.json().then(data => {
                    showCompetitions(data);
                    document.querySelector(".progress").className = " hidden";
                });
            }
        });
    }
    
    fetch(`${baseUrl}competitions/`,{method:methodUse,headers:AuthToken})
        .then(status)
        .then(json)
        .then(data => {
            document.querySelector(".progress").className = " hidden";
            showCompetitions(data);
        })
        .catch(error);
}

function showDetailCompetitions(){
    let detailCompetition = "";
    detailCompetition = `
            <div class="row">
                <div class="col s12 m8">
                    <div class="card">
                        <h5>Standing Tables</h5>
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
    document.getElementById("body-content").innerHTML = detailCompetition;
}

function getCompetitionsById(){
    return new Promise((resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        let tableStandings = "";
        showDetailCompetitions();

        if('caches' in window){
            caches.match(`${baseUrl}competitions/${idParam}/standings`).then(response => {
                if(response){
                    response.json().then(data => {
                        getStandings(data);
                        resolve(data);
                    });
                }
            });
        }

        fetch(`${baseUrl}competitions/${idParam}/standings`,{method:methodUse,headers:AuthToken})
            .then(status)
            .then(json)
            .then(data => {
                getStandings(data);
                resolve(data);
            })
            .catch(error);
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
    data.standings[0].table.forEach(dataTable=>{
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

function getSavedCompetitions(){
    getAll().then((competitions) => {
        let savedContent = "";
        competitions.forEach(data => {
            savedContent += `
                <div class="col s12">
                    <a href="../pages/detail-competitions.html?id=${data.id}&saved=true">
                        <div class="card">
                            <div class="card-content">
                                <h5>${data.name}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });
        document.getElementById("saved").innerHTML = savedContent;
    });
}

function getSavedCompetitionsById(){
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getById(idParam).then(competitions => {
        showDetailCompetitions();
        getStandings(competitions);
    });
}
