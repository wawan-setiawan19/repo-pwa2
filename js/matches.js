function matches(data){
    let articlesHTML = "";
    data.matches.forEach(article => {
        let scoreHome = article.score.fullTime.homeTeam;
        let scoreAway = article.score.fullTime.awayTeam;
        articlesHTML += `
        <li>
            <div class="collapsible-header row">
                <div class="col s5 truncate"><b>${article.homeTeam.name}</b></div>
                <b>VS</b>
                <div class="col s5 truncate"><b>${article.awayTeam.name}</b></div>
            </div>
            <div class="collapsible-body">
                <div class="row">
                    <div class="col s10 offset-s1 center">${article.competition.name} - Matchday ${article.season.currentMatchday}</div>
                </div>
                <div class="center">
                        <h5>${scoreHome} - ${scoreAway}</h5>
                </div>
                <a href="./pages/last-matches.html?id=${article.id}" class="waves-effect waves-teal btn-small">Match Detail</a>
            </div>
        </li>
        `;
    });
    document.getElementById("recents").innerHTML = articlesHTML;
}

function getMatches(){
    let date = new Date().getDate()-1;
    let month = new Date().getMonth()+1;
    const year = new Date().getFullYear();

    if(date<10) date = `0${date}`;
    if(month<10) month = `0${month}`;

    console.log(date);

    if('caches' in window){
        caches.match(`${baseUrl}matches/?dateTo=${year}-${month}-${date}&dateFrom=${year}-${month}-${date}`).then((response)=>{
            if(response){
                response.json().then(data => {
                    document.querySelector(".progress").className= " hidden";
                    matches(data);
                    M.AutoInit();
                });
            }
        });
    }

    fetch(`${baseUrl}matches/?dateTo=${year}-${month}-${date}&dateFrom=${year}-${month}-${date}`,{method:methodUse,headers:AuthToken})
        .then(status)
        .then(json)
        .then(data => {
            matches(data);
            document.querySelector(".progress").className= " hidden";
            M.AutoInit();
        })
        .catch(error);
}

function getMatchesById(){
    return new Promise((resolve,reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    let idHome = "";
    let idAway = "";
    let logoHome = "";
    let logoAway = "";

    if("caches" in window){
        caches.match(`${baseUrl}matches/${idParam}`).then((response)=>{
            if(response){
                response.json().then(data => {
                    idHome = data.match.homeTeam.id;
                    idAway = data.match.awayTeam.id;
                    showDetail(data);
                    if('caches' in window){
                        caches.match(`${baseUrl}teams/${idHome}`).then((response)=>{
                            if(response){
                                response.json().then(data => {
                                    logoHome = data.crestUrl;
                                    document.getElementById("logoHome").setAttribute("src",logoHome);
                                    console.log(logoHome);
                                });
                            }
                        });
                    }
                    if('caches' in window){
                        caches.match(`${baseUrl}teams/${idAway}`).then((response)=>{
                            if(response){
                                response.json().then(data => {
                                    logoAway = data.crestUrl;
                                    document.getElementById("logoAway").setAttribute("src",logoAway);
                                    console.log(logoAway);
                                });
                            }
                        });
                    }

                    resolve(data);
                });
            }
        });
    }

    fetch(`${baseUrl}matches/${idParam}`,{method:methodUse,headers:AuthToken})
        .then(status)
        .then(json)
        .then(data => {
            idHome = data.match.homeTeam.id;
            idAway = data.match.awayTeam.id;

            fetch(`${baseUrl}teams/${idHome}`,{method:methodUse,headers:AuthToken})
                .then(status)
                .then(json)
                .then(data => {
                    logoHome = data.crestUrl;
                    document.getElementById("logoHome").setAttribute("src",logoHome);
                });
            
            fetch(`${baseUrl}teams/${idAway}`,{method:methodUse,headers:AuthToken})
                .then(status)
                .then(json)
                .then(data => {
                    logoAway = data.crestUrl;
                    document.getElementById("logoAway").setAttribute("src",logoAway);
                });
                showDetail(data);

            resolve(data);
        });
    });
}

function showDetail(data){
    let detail = data.match;
    detailMatch = `
        <div class="card">
            <div class="row">
                <div class="center grey-text">${detail.competition.name}</div>
                <div class="center grey-text">Macthday ${detail.matchday}</div>
            </div>
            <div class="row">
                <div class="col s3">
                    <img src="" class="responsive-img" id="logoHome" alt="logo">
                </div>
                <div class="center">
                    <div class="col s2">
                        <h4>${detail.score.fullTime.homeTeam}</h4>
                    </div>
                    <div class="col s2">
                        <h4>-</h4>
                    </div>
                    <div class="col s2">
                        <h4>${detail.score.fullTime.awayTeam}</h4>
                    </div>
                </div>
                <div class="col s3">
                    <img src="" class="responsive-img" id="logoAway" alt="logo">
                </div>
            </div>
            <div class="center grey-text">
                ${detail.venue}
            </div>
            <div class="row grey-text">
                <div class="col s4 offset-s2">Referee</div>
                <div class="col s5">${detail.referees[0].name}</div>
            </div>
            <div class="row grey-text">
                <div class="col s4 offset-s2">Ast. Referee</div>
                <div class="col s5">${detail.referees[1].name}</div>
            </div>
            <div class="row grey-text">
                <div class="col s4 offset-s2">Ast. Referee</div>
                <div class="col s5">${detail.referees[2].name}</div>
            </div>
            <div class="row grey-text">
                <div class="col s4 offset-s2">Fourth Official</div>
                <div class="col s5">${detail.referees[3].name}</div>
            </div>
            <div class="center grey-text">
                <h5>Head To Head</h5>
                <div class="row">
                    Total Match
                    <h4>${data.head2head.numberOfMatches}</h4>
                </div>
                <div class="row">
                    <div class="col s4">
                        Home
                        <h4>${data.head2head.homeTeam.wins}</h4>
                    </div>
                    <div class="col s4">
                        Draw
                        <h4>${data.head2head.homeTeam.draws}</h4>
                    </div>
                    <div class="col s4">
                        Away
                        <h4>${data.head2head.homeTeam.losses}</h4>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("body-content").innerHTML = detailMatch;
}