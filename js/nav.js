document.addEventListener("DOMContentLoaded",() => {
    M.AutoInit();

    loadNav();

    function loadNav(){
        // init XHR
        const xmlHttp = new XMLHttpRequest();
        const elementNavigation = document.querySelectorAll(".topnav, .sidenav");

        xmlHttp.onreadystatechange = () =>{
            if(xmlHttp.readyState === 4){
                if(xmlHttp.status != 200) return;
                // Load all element navigasi
                elementNavigation.forEach(elements => {
                    elements.innerHTML = xmlHttp.responseText;

                    // daftarkan click
                    elements.addEventListener("click", event => {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // muat konten
                        page = event.target.getAttribute("href").substr(1);

                        loadPage(page);
                    });
                });
            }
        };
        
        xmlHttp.open("GET","components/nav.html", true);
        xmlHttp.send();
    }

    let page = location.hash.substr(1);

    if(page == "") page = "matches";
    loadPage(page);

    function loadPage(page){
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
            if(xmlHttp.readyState == 4){
                const content = document.querySelector("#body-content");
                    if (page == "matches") getMatches();
                    if (page == "competitions") getCompetitions();
                    if (page == "saved") getSavedCompetitions();
                if(xmlHttp.status == 200){
                    content.innerHTML= xmlHttp.responseText;
                }else if(xmlHttp.status == 404){
                    content.innerHTML = `<p>Halaman tidak ada</p>`;
                }else{
                    content.innerHTML = `<p>Ups.. halaman tidak dapat diakses</p>`;
                }
            }
        };
        
        xmlHttp.open("GET",`pages/${page}.html`,true);
        xmlHttp.send();
    }
});