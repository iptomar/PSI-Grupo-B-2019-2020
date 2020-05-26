
const mapa = document.querySelector('#map');
mapa.style.height = '547px';
mapa.style.marginTop = '-18px';
mapa.style.zIndex = '1px';

let mymap = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 14});

//criação dos eventos e suas funcoes para distinguir o estado online e offline
//######################Estado OffLine##################################
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"></a>';
document.addEventListener("offline", onOffline, false);
function onOffline() {
    L.tileLayer('maps/{z}/{x}/{y}.png', {
        maxZoom: 17,
        minZoom: 15,
        attribution: attribution
    }).addTo(mymap);
    alert('Entrou no modo Offline, vai encontrar algumas funcionabilidades limitadas.',  "Alert Title");

}

//######################Estado Online##################################
document.addEventListener("online", onOnline, false);
function onOnline() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 14,
        attribution: attribution
    }).addTo(mymap); 
}


 //verificação inicial para saber se o dispositivo encontra-se com conexão ou nao 
 if (navigator.onLine) {
    console.log("online");
    onOnline();
} else {
    console.log("offline");
    onOffline();
}

//Custom icon for current position
const markerCurrent = L.icon({
    iconUrl: 'images/marker.png',
    iconSize: [50, 50],
    iconAnchor: [25, 16]
});

//Path tracer icon customize
const pathTrace = L.icon({
    iconUrl: 'images/gold.png',
    iconSize: [50, 50],
    iconAnchor: [25, 16]
});

 //vai indicar a posição inicial quando inicia a app
 let latlng;
 navigator.geolocation.getCurrentPosition(function (location) {
    latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    //Criar o marcador do mapa na localizacão atual
    let marker = L.marker(latlng, { icon: markerCurrent}).addTo(mymap);
    
    let popupContext = document.createElement('h4');
    popupContext.style.color = "#FF8B00";
    popupContext.innerHTML = "Your current location";

    buildings();

    marker.bindPopup(popupContext).openPopup();
});


//Funcão para fazer fetch das informacões 
let coord;
let control;
async function buildings() 
{
    try {
        //let Access-Control-Allow-Origin across the CORS url
        //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //Target url to fetch
        const targetUrl = 'json/info.json';
        //const targetUrl = 'http://psi2020.tugamars.com/api/buildings';
        const response = await fetch(targetUrl);
        const data = await response.json();
        const dados = data.data; 
        
        $.each(dados, function(i, info){
                //console.log(info);
                coord = [info.coordinate1, info.coordinate2];
                circle = L.circle(coord, {
                color: '#ff9900',
                fillColor: '#aa3',
                fillOpacity: 0.5,
                radius: 100
            }).addTo(mymap);

            let divPopup = document.createElement('div');
            divPopup.setAttribute('id', 'iDdivPopup');

            let buildName = document.createElement('h4');
            buildName.setAttribute('id', 'idBuildName');
            buildName.classList.add('item1');
            
            let buildLocation = document.createElement('h5');
            buildLocation.setAttribute('id', 'idBuildLoc');
            buildLocation.classList.add('item2');

            let hr = document.createElement('hr');
            hr.classList.add('hrAll');

            let but = document.createElement('button');
            let butContext = document.createTextNode(' Detalhes');
            but.appendChild(butContext);
            but.setAttribute('id', 'botDetalhe');
            but.className = "glyphicon glyphicon-info-sign";

            let but2 = document.createElement('button');
            let but2Context = document.createTextNode(' Tracar o caminho');
            but2.appendChild(but2Context);
            but2.setAttribute('id', 'botTracar');
            but2.className = "glyphicon glyphicon-map-marker";

            buildName.textContent = info.buildingName;
            buildLocation.textContent = info.location;
            divPopup.appendChild(buildName);
            divPopup.appendChild(buildLocation);
            divPopup.appendChild(hr);
            divPopup.appendChild(but);
            divPopup.appendChild(but2);
            
            L.marker(coord).addTo(mymap).bindPopup(divPopup);
            
            const cont = document.querySelector('.cont');
            
            const txtDetails = document.querySelector('.divDetails');
            
            const titBuild = document.createElement('h2');
            const navTitBuild = document.createElement('div');
            navTitBuild.appendChild(titBuild);
            navTitBuild.setAttribute('class', 'titBuild');
            txtDetails.appendChild(navTitBuild);

            const locBuild = document.createElement('h4');
            locBuild.classList.add('localBuild');

            const autBuild = document.createElement('p');
            autBuild.classList.add('autBuild');

            const descBuild = document.createElement('p');
            descBuild.classList.add('descripBuild');

            const dateBuild = document.createElement('h5');
            dateBuild.classList.add('dateBuild');

            const imagem = document.createElement('img');
            imagem.classList.add('imagem');

            const divImage = document.createElement('div');
            divImage.setAttribute('id', 'divImage');

            const descImage = document.createElement('p');
            descImage.setAttribute('class', 'descImage');
            descImage.innerHTML = "Autor da imagem: ";
            
            let autor = info.authors;
            let image = info.images;

            but.addEventListener('click', function(){
                cont.style.display = "none";
                document.body.style.overflow = "auto";
                document.body.style.backgroundColor = "#fff5e6";
                txtDetails.style.visibility = 'visible';
                titBuild.innerHTML = info.buildingName;
                locBuild.innerHTML = `<b>Localizacão: ${info.location}</b>`;
                descBuild.innerHTML = info.description;
                dateBuild.innerHTML = `<b>Ano de construcão: ${info.dates}</b>`;

                autor.forEach(function(el){
                    autBuild.innerHTML = `<b>Autores: ${el.name}</b>`;
                });
                txtDetails.appendChild(locBuild);
                txtDetails.appendChild(dateBuild);
                txtDetails.appendChild(autBuild);
                txtDetails.appendChild(descBuild);

                txtDetails.appendChild(hr);
                divImage.appendChild(imagem);
                divImage.appendChild(descImage);
                txtDetails.appendChild(divImage);

                image.forEach(function(im){
                    imagem.src = `data:image/png;base64, ${im.base64}`;
                });
            });

            const cl = document.querySelector('.closeD');
            cl.addEventListener('click', function(){
                txtDetails.style.display = "none";
                window.location.reload();

            });

            //Info
            const info1 = document.querySelector('#info');
            const about = document.querySelector('#about');
            info1.addEventListener('click', function(){
                cont.style.display = "none";
                about.style.visibility = "visible";
            });

            //close info
            const clInfo = document.querySelector('.closeInfo');
            clInfo.addEventListener('click', function(){
                about.style.display = "none";
                window.location.reload();

            });
        
            //Path Tracer
            but2.addEventListener('click', function(){
                removeRoutingControl();
                control = L.Routing.control({
                    waypoints: [
                        L.latLng(latlng),                                               //latLang current position of the user
                        L.latLng([info.coordinate1, info.coordinate2])                 //route coordinate 
                    ],
                    createMarker: function (i, wp, nWps) {
                        if (i === nWps - 1) {
                            // here change the starting and ending icons
                            return L.marker(wp.latLng, {
                                icon: pathTrace // here pass the custom marker icon instance
                            });
                        }
                    },
                    lineOptions: {
                        styles: [{ color: 'red', opacity: 1, weight: 5 }],
                    },
                    draggableWaypoints: false,

                }).addTo(mymap);
            });

        });

        //Remove the routing control if it's already marked
        function removeRoutingControl() {
            if (control != null) {
                mymap.removeControl(control);
                control = null;
            }
        };

    } catch (ex) {
        alert("O site que esta a buscar não existe. por favor tente de novo!");
    }
}


//Let info for routes
 //let Access-Control-Allow-Origin across the CORS url
 const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

(async ()=>{
    try {
        //Target url to fetch
        const targetUrl = 'http://psi2020.tugamars.com/api/routes';
        const response = await fetch(proxyUrl+targetUrl);
        const data = await response.json();
        const dados = data.data;
        
        $.each(dados, function(i, info){
            let divRoute = document.querySelector('.divRout');
            let divInfoRoute = document.querySelector('.routeDiv');
            let infomap = document.querySelector('#map');
            let txtRoute = document.createElement('button');
            txtRoute.className = 'btn btn-success btn-lg btn-block';

            divRoute.addEventListener('click', (e)=>{
                document.body.style.overflow = 'auto'
                document.body.style.backgroundColor = "#fff5e6";
                infomap.style.display = "none";
                divInfoRoute.style.visibility = "visible";
                divRoute.style.visibility = "hidden";

                txtRoute.innerHTML = `<h3 class="numRoute">`+info.id+`</h3>`+info.name;
                divInfoRoute.appendChild(txtRoute);
                e.preventDefault();
            });

            //Close
            const closeSpan = document.querySelector('.closeS');
            closeSpan.addEventListener('click', ()=>{
                infomap.style.visibility = "visible";
                window.location.reload();
            });

            txtRoute.addEventListener('click', ()=>{
                alert(info.id);
            });

        });

    }catch(ex){
        alert('Não consegue fazer o fetch deste api');
    }

//    //Target url to fetch
//    const targetUrl = 'http://psi2020.tugamars.com/api/buildings';
//    const response = await fetch(proxyUrl+targetUrl);
//    const data = await response.json();
//    const dados = data.data;
   
//    $.each(dados, function(i, infor){
//        const rt = infor.routes;
//        rt.forEach(function(r){
//         const rf = r.pivot.building_id;

//         txtRoute.addEventListener('click', function(){
//             alert(rf);
//         });
//        });
//    });
})();





        

















































































