
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
//let Access-Control-Allow-Origin across the CORS url
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

async function buildings() 
{
    try {
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
(async ()=>{
    //Target url to fetch
    const targetUrl = 'http://psi2020.tugamars.com/api/buildings';
    const response = await fetch(proxyUrl+targetUrl);
    const data = await response.json();
    const dados = data.data;
    
    $.each(dados, (i, infor)=>{
        const rt = infor.routes;
        $.each(rt, (i, id)=>{

            const divRoute = document.querySelector('.divRout');
            
            const divInfoRoute = document.querySelector('.routeDiv');
        
            const infomap = document.querySelector('#map');
            const txtRoute = document.createElement('button');
            txtRoute.setAttribute('id', 'txtRoute');
            txtRoute.className = 'btn btn-success btn-lg btn-block';
        
            const info1 = document.querySelector('#info');
        
            divRoute.addEventListener('click', ()=>{
                document.body.style.overflow = 'auto'
                document.body.style.backgroundColor = "#fff5e6";
                infomap.style.display = "none";
                divInfoRoute.style.visibility = "visible";
                divRoute.style.visibility = "hidden";
                info1.style.display = "none";
        
                txtRoute.innerHTML = id.name;
                divInfoRoute.appendChild(txtRoute);
            });

            //Close
            const closeSpan = document.querySelector('.closeS');
            closeSpan.addEventListener('click', ()=>{
                infomap.style.visibility = "visible";
                window.location.reload();
            });


            const pointInter = document.querySelector('.pointInter');
            const mdlPointInter = document.createElement('div');
            const paraf = document.createElement('h2');
            paraf.classList.add('paraf');
            const paraf2 = document.createElement('h4');
            const paraf3 = document.createElement('img');
            const paraf4 = document.createElement('h5');
            const paraf5 = document.createElement('p');
            const mp = document.querySelector('#map');

            const hr = document.createElement('hr');

            const closeSpnInfo = document.createElement('span');
            
            //const imgs = document.createElement('img');

            txtRoute.addEventListener('click', ()=>{
                pointInter.classList.add('pointInteres');
                mdlPointInter.classList.add('mdlPointInter');
                paraf.classList.add('paraf');
                paraf2.classList.add('paraf2');
                paraf3.classList.add('paraf3');
                paraf4.classList.add('dateBuild');
                paraf5.classList.add('descripBuild');

                hr.classList.add('hrAll');

                closeSpnInfo.classList.add('closeSpnInfo');

                mp.style.display = "none";
                closeSpnInfo.innerHTML = 'x';
                paraf.innerHTML = infor.buildingName;
                paraf2.innerHTML = `<b>Localizacão: ${infor.location}</b>`;
                paraf4.innerHTML = `<b>Ano de construcão: ${infor.dates}</b>`;
                paraf5.innerHTML = infor.description;

                const img = infor.images;

                if(img == 0){
                    paraf3.src = "images/noimage.png";
                }else{                
                    $.each(img, (i, im)=>{
                        paraf3.src = `data:image/png;base64, ${im.base64}`;
                    });
                }

                mdlPointInter.appendChild(closeSpnInfo);
                mdlPointInter.appendChild(paraf);
                mdlPointInter.appendChild(paraf2);
                mdlPointInter.appendChild(paraf4);
                mdlPointInter.appendChild(paraf5);
                mdlPointInter.appendChild(hr);
                mdlPointInter.appendChild(paraf3);
                pointInter.appendChild(mdlPointInter);
            });

            //Close info span
            closeSpnInfo.addEventListener('click', ()=>{
                closeSpnInfo.classList.remove('closeSpnInfo');
                pointInter.classList.remove('pointInteres');
                mdlPointInter.classList.remove('mdlPointInter');
                paraf.classList.remove('paraf');
                paraf2.classList.remove('paraf2');
                paraf3.classList.remove('paraf3');
                paraf4.classList.remove('dateBuild');
                paraf5.classList.remove('descripBuild');

                hr.classList.remove('hrAll');

                paraf.innerHTML = ' ';
                paraf2.innerHTML = ' ';
                paraf3.src = "";
                paraf4.innerHTML = ' ';
                paraf5.innerHTML = ' ';
                closeSpnInfo.innerHTML = ' ';
                paraf3.remove();

                hr.remove();
                
            });
        });

    });
   
})();





        

















































































