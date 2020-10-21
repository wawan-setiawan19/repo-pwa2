const baseUrl = "http://api.football-data.org/v2/";
const methodUse = 'GET';
const AuthToken = {'X-Auth-Token':'ac40da2ccc4d4cfb97446629eba68930'};


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
    fetch(`${baseUrl}competitions/?plan=TIER_ONE`,{method:methodUse,headers:AuthToken})
     .then(status)
     .then(json)
     .then((data)=>{
        //  objek masuk ke paramater data

        // komponen card
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
                            <a href="#">
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
        document.querySelector(".progress").className= " hidden";
        document.getElementById("competitions").innerHTML = articlesHTML;
     })
     .catch(error);
}

function getMatches(){
    fetch(`${baseUrl}matches/`,{method:methodUse,headers:AuthToken
    })
     .then(status)
     .then(json)
     .then((data)=>{
        //  objek masuk ke paramater data
        // komponen card
        let articlesHTML = "";
        data.matches.forEach((article)=>{
            let kickOff = article.utcDate;
            let kickOffHour = parseInt(kickOff.substring(11,13));
            kickOffHour+=7;
            if(kickOffHour>=24)kickOffHour-=24;
            let kickOffMinute = kickOff.substring(14,16);

            articlesHTML += `
            <li>
                <div class="collapsible-header row">
                    <div class="col s5 truncate"><b>${article.homeTeam.name}</b></div>
                    <div class="col s2">-</div>
                    <div class="col s5 truncate"><b>${article.awayTeam.name}</b></div>
                </div>
                <div class="collapsible-body">
                    <div class="row">
                        <div class="col s10 offset-s1 center">${article.competition.name} - Matchday ${article.season.currentMatchday}</div>
                    </div>
                    <div class="center">
                        <h5>${kickOffHour}:${kickOffMinute} WIB</h5>
                    </div>
                    <a class="waves-effect waves-teal btn-small">Look Match</a>
                </div>
            </li>
            `;
            
        });
        document.querySelector(".progress").className= " hidden";
        document.getElementById("recents").innerHTML = articlesHTML;
        M.AutoInit();
     })
     .catch(error);
}

