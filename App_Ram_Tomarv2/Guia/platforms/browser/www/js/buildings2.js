
const mapa = document.querySelector('#map');
mapa.style.height = '553px';
mapa.style.marginTop = '-18px';
mapa.style.zIndex = '1px';

let mymap = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 14});
var city = L.layerGroup();

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

//Point interest marker
const pointInterMarker = L.icon({
    iconUrl: 'images/icon.png',
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
 let posCurrent;
 navigator.geolocation.getCurrentPosition(function (location) {
    latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    //Criar o marcador do mapa na localizacão atual
    posCurrent = L.marker(latlng, { icon: markerCurrent}).addTo(mymap);
    
    let popupContext = document.createElement('h4');
    popupContext.style.color = "#FF8B00";
    popupContext.innerHTML = "Your current location";

    buildings();

    posCurrent.bindPopup(popupContext).openPopup();
});


//Funcão para fazer fetch das informacões 
//let coord;
let control;
const divPointInteres = document.querySelector('.divPointInter');
const div2PointInterres = document.querySelector('#div2PointInterres');
const markRoute = document.querySelector('.divMarkRoute');

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
                //coord = [info.coordinate1, info.coordinate2];
            //     circle = L.circle(coord, {
            //     color: '#ff9900',
            //     fillColor: '#aa3',
            //     fillOpacity: 0.5,
            //     radius: 100
            // }).addTo(mymap);
						
						//popup com informação do edificio
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
            
            //const mark = L.marker(coord, {icon: pointInterMarker}).addTo(mymap).bindPopup(divPopup);
            
						//página de detalhes do edificio
            const cont = document.querySelector('.cont');
            
            const txtDetails = document.querySelector('.divDetails');
            
            const titBuild = document.createElement('h2');
            const navTitBuild = document.createElement('div');
            navTitBuild.appendChild(titBuild);
            navTitBuild.setAttribute('class', 'titBuild');
            txtDetails.appendChild(navTitBuild);

            const locBuild = document.createElement('h4');
            locBuild.classList.add('localBuild');

            const descBuild = document.createElement('p');
            descBuild.classList.add('descripBuild');

            const dateBuild = document.createElement('h5');
            dateBuild.classList.add('dateBuild');

            const divImage = document.createElement('div');
            divImage.setAttribute('id', 'divImage');
            
            const autor = info.authors;
            const image = info.images;

            but.addEventListener('click', function(){
                cont.style.display = "none";
                div2PointInterres.style.display = "none";
                document.body.style.overflow = "auto";
                document.body.style.backgroundColor = "#fff5e6";
                txtDetails.style.visibility = 'visible';
                titBuild.innerHTML = info.buildingName;
                locBuild.innerHTML = `<b>Localizacão: ${info.location}</b>`;
                descBuild.innerHTML = info.description;
                dateBuild.innerHTML = `<b>Ano de construcão: ${info.dates}</b>`;

                $.each(autor, (i, el)=>{
                    const autBuild = document.createElement('p');
                    autBuild.classList.add('autBuild');
                    txtDetails.appendChild(autBuild);

                    autBuild.innerHTML = `<b>${el.name}</b>`;
                });
                txtDetails.appendChild(locBuild);
                txtDetails.appendChild(dateBuild);
                txtDetails.appendChild(descBuild);

                txtDetails.appendChild(hr);

                txtDetails.appendChild(divImage);

                $.each(image, (i, im)=>{
                    const imagem = document.createElement('img');
                    const pA = document.createElement('pA');
                    const br = document.createElement('br');
                   
                    imagem.classList.add('imagem');
                    pA.classList.add('pA');

                    br.innerHTML = '<br><br><br>';
                    pA.innerHTML = `Autor da imagem: ${im.sourceAuthor}`;
                    //imagem.src = `data:image/png;base64, ${im.base64}`;
                    imagem.src = im.base64;
                    divImage.appendChild(imagem);
                    divImage.appendChild(pA);
                    divImage.appendChild(br);
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
                div2PointInterres.style.display = "none";
                about.style.visibility = "visible";
            });

            //close info
            const clInfo = document.querySelector('.closeInfo');
            clInfo.addEventListener('click', function(){
                about.style.display = "none";
                div2PointInterres.style.display = "none";
                window.location.reload();

            });
        
            //Path Tracer
            but2.addEventListener('click', function(){
                const routingMsg = document.createElement('span');
                routingMsg.classList.add('routingMsg');
                routingMsg.innerHTML = "x";
                routingMsg.title = "Remover o caminho";

                removeRoutingControl();
                control = L.Routing.control({
                    waypoints: [
                        L.latLng(latlng), //latLang current position of the user
                        L.latLng([info.coordinate1, info.coordinate2]) //route coordinate 
                    ],
                    createMarker: function (i, wp, nWps) {
                        if (i === nWps - 1) {
                            // here change the starting and ending icons
                            return L.marker(wp.latLng, {
                                icon: pathTrace // here pass the custom marker icon instance
                            }).bindPopup(routingMsg, {closeButton: false, className: "routMPopup"});
                            
                        }
                    },
                    lineOptions: {
                        styles: [{ color: 'red', opacity: 1, weight: 5 }],
                    },
                    draggableWaypoints: false,

                }).addTo(mymap);

                routingMsg.addEventListener('click', function(){
                    removeRoutingControl();
                });
            });

            const mp = document.querySelector('#map');

            //mark the point of interest dynamically by user
            const buildingName2 = document.createElement('h4');
            buildingName2.setAttribute('id', 'buildingName2');
            buildingName2.textContent = info.buildingName;
            
            const spanR = document.createElement('span');
            spanR.className = 'glyphicon glyphicon-remove';
            spanR.setAttribute('id', 'spanR');
            spanR.title = 'remover ponto de interesse';

            const spanY = document.createElement('span');
            spanY.className = 'glyphicon glyphicon-ok';
            spanY.setAttribute('id', 'spanY');
            spanY.title = 'marcar ponto de interesse';
            buildingName2.appendChild(spanY);

            const rt = info.routes;
            $.each(rt, (i, rout)=>{
                const routes2 = document.createElement('h4');
                routes2.setAttribute('id', 'routes2');

                const labelPoint = document.querySelector('.labelPoint');
                const iPoint = document.querySelector('.iPoint');
                labelPoint.appendChild(iPoint);
                div2PointInterres.appendChild(labelPoint);

                //show by the point of interest
                divPointInteres.addEventListener('click', ()=>{
                    //mark.remove();
                    routes2.remove();
                    iPoint.textContent = "Escolhe um dos pontos em baixo para marcar no mapa:";

                    div2PointInterres.classList.remove('div2PointHidden');
                    div2PointInterres.classList.add('div2PointInterresses');
                    mp.style.zIndex = "-1";
                    buildingName2.className = 'btn btn-success btn-lg btn-block';
                    div2PointInterres.appendChild(buildingName2);

                });

                let buildCoord;
                spanY.addEventListener('click', ()=>{
                    spanY.style.visibility = "hidden";
                    spanR.style.visibility = "visible";
                    buildCoord = L.marker([info.coordinate1, info.coordinate2], {icon: pointInterMarker}).addTo(mymap).bindPopup(divPopup);
                    buildingName2.appendChild(spanR);
                    mp.style.zIndex = "1";
                });

                spanR.addEventListener('click', ()=>{
                    spanY.style.visibility = "visible";
                    spanR.style.visibility = "hidden";
                    buildCoord.remove();
                    removeRoutingControl();
                });

                //close span
                const closeP = document.querySelector('.closeP');
                closeP.addEventListener('click', ()=>{
                    div2PointInterres.classList.remove('div2PointInterresses');
                    mp.style.zIndex = "1";
                });
                
                //Show building by route marked on the map
                const spanRR = document.createElement('span');
                spanRR.className = 'glyphicon glyphicon-remove';
                spanRR.setAttribute('id', 'spanR');
                spanRR.title = 'remover a rota';

                const spanYY = document.createElement('span');
                spanYY.className = 'glyphicon glyphicon-ok';
                spanYY.setAttribute('id', 'spanY');
                spanYY.title = 'marcar a rota';
                
                
                markRoute.addEventListener('click', ()=>{
                    //mark.remove();
                    buildingName2.remove();
                    
                    iPoint.textContent = "Escolhe uma das rotas em baixo para ver os pontos de interesses no mapa:";

                    div2PointInterres.classList.remove('div2PointHidden');
                    div2PointInterres.classList.add('div2PointInterresses');
                    mp.style.zIndex = "-1";

                    routes2.textContent = rout.name;
                    routes2.appendChild(spanRR);
                    routes2.appendChild(spanYY);
                    routes2.className = 'btn btn-success btn-lg btn-block';
                    div2PointInterres.appendChild(routes2);
                });
								
								spanYY.addEventListener('click', ()=>{
									city.clearLayers();
								});
								
                let routeCoord;
                const pivot = rout.pivot;
                const ramTitle = document.querySelector('#title');
                $.each(pivot, (i, p)=>{
                    $.each(dados, (i, d)=>{
                        spanYY.addEventListener('click', ()=>{
														ramTitle.innerHTML = `<i class="glyphicon glyphicon-home"></i> ${rout.name}`;
                            if(p.building_id == d.id){
                                routeCoord = L.marker([d.coordinate1, d.coordinate2], {icon: pointInterMarker}).addTo(city).bindPopup(divPopup);
																city.addTo(mymap);
                                mp.style.zIndex = "1";
                            }
                        });

                        spanRR.addEventListener('click', ()=>{
														if(city.getLayers().length != 0){
															ramTitle.innerHTML = `<i class="glyphicon glyphicon-home"></i> RAM TOMAR`;
															city.clearLayers();
														}
                        });
                    });
                });
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



//Set map position to Tomar
const divTomar = document.querySelector('.divTomar');
divTomar.addEventListener('click', function(){
    navigator.geolocation.getCurrentPosition(function () {
        const latlng1 = ([39.60199, -8.40924]);
        let marker = L.marker(latlng1, { icon: markerCurrent}).addTo(mymap);
        
        let popupContext = document.createElement('h5');
        popupContext.style.color = "#FF8B00";
        popupContext.innerHTML = "Welcome to Tomar!";
    
        marker.bindPopup(popupContext).openPopup();
        posCurrent.remove();
    });
});


//Let info for routes
(async ()=>{
    //Target url to fetch
    const targetUrl = 'http://psi2020.tugamars.com/api/buildings';
    const response = await fetch(targetUrl);
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
                divTomar.style.display = "none";
                divPointInteres.style.display = "none";
                div2PointInterres.style.display = "none";
                markRoute.style.display = "none";
        
                txtRoute.innerHTML = id.name;
                divInfoRoute.appendChild(txtRoute);
            });

            //Close
            const closeSpan = document.querySelector('.closeS');
            closeSpan.addEventListener('click', ()=>{
                infomap.style.display = "flex";
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
            const paraf6 = document.createElement('p');
            const mp = document.querySelector('#map');

            const hr = document.createElement('hr');

            const closeSpnInfo = document.createElement('span');
            
            //const imgs = document.createElement('img');

            txtRoute.addEventListener('click', ()=>{
                document.body.style.overflow = "hidden";
                pointInter.classList.add('pointInteres');
                mdlPointInter.classList.add('mdlPointInter');
                paraf.classList.add('paraf');
                paraf2.classList.add('paraf2');
                paraf3.classList.add('paraf3');
                paraf4.classList.add('dateBuild');
                paraf5.classList.add('descripBuild');
                paraf6.classList.add('autBuild');

                hr.classList.add('hrAll');

                closeSpnInfo.classList.add('closeSpnInfo');

                mp.style.display = "none";
                closeSpnInfo.innerHTML = 'x';
                
                //building name
                if(infor.buildingName == 0){
                    paraf.innerHTML = "<i>Não tem nome do edificio</i>";
                }else{
                    paraf.innerHTML = infor.buildingName;
                }
                
                //location
                if(infor.location == 0){
                    paraf2.innerHTML = "<i>Localizacão desconhecido!</i>";
                }else{
                    paraf2.innerHTML = `<b>Localizacão: ${infor.location}</b>`;
                }
               
                //building date
                if(infor.dates == 0){
                    paraf4.innerHTML = "<i>Sem data previsto!</i>";
                }else{
                    paraf4.innerHTML = `<b>Ano de construcão: ${infor.dates}</b>`;
                }
               
                //description
                if(infor.description == 0){
                    paraf5.innerHTML = "<i>Não tem a descricao para este edificio!</i>";
                }else{
                    paraf5.innerHTML = infor.description;
                }
               

                const img = infor.images;
                const aut = infor.authors;

                //If no image, set to default image
                if(img == 0){
                    paraf3.src = "images/noimage.png";
                }else{                
                    $.each(img, (i, im)=>{
                        paraf3.src = `data:image/png;base64, ${im.base64}`;
                    });
                }

                //If no building authors, will set to "no authors"
                if(aut == 0){
                    paraf6.innerHTML = `<b><i>Autor desconhecido</i></b>`;
                }else{
                    $.each(aut, (i, au)=>{
                        paraf6.innerHTML = `<b>Autores: ${au.name}</b>`;
                    });
                }

                mdlPointInter.appendChild(closeSpnInfo);
                mdlPointInter.appendChild(paraf);
                mdlPointInter.appendChild(paraf2);
                mdlPointInter.appendChild(paraf4);
                mdlPointInter.appendChild(paraf6);
                mdlPointInter.appendChild(paraf5);
                mdlPointInter.appendChild(hr);
                mdlPointInter.appendChild(paraf3);
                pointInter.appendChild(mdlPointInter);
            });

            //Close info span
            closeSpnInfo.addEventListener('click', ()=>{
                document.body.style.overflow = "auto";

                closeSpnInfo.classList.remove('closeSpnInfo');
                pointInter.classList.remove('pointInteres');
                mdlPointInter.classList.remove('mdlPointInter');
                paraf.classList.remove('paraf');
                paraf2.classList.remove('paraf2');
                paraf3.classList.remove('paraf3');
                paraf4.classList.remove('dateBuild');
                paraf5.classList.remove('descripBuild');
                paraf6.classList.remove('autBuild');

                hr.classList.remove('hrAll');

                paraf.remove();
                paraf2.remove();
                paraf4.remove();
                paraf5.remove();
                closeSpnInfo.remove();
                paraf3.remove();
                paraf6.remove();
                hr.remove();
            });
        });

    });
   
})();

//Home page reload
title.addEventListener('click', function(){
    window.location.reload();
});

//Vanilla javascript to drag the div
(function() {
    const elRoot = document.querySelector('#div2PointInterres');

    // State variables
    let isDragging = false;
    let startX = null;
    let startY = null;
    let startLeft = null;
    let startTop = null;

    // Whenever mouse button is pressed
    elRoot.addEventListener('mousedown', (e) => {
        const rect  = elRoot.getBoundingClientRect();
        // Set component state to dragging
        isDragging = true;

        // Save mousedown coordinates
        startX = e.pageX;
        startY = e.pageY;

        // Save initial position values
        startLeft = rect.left;
        startTop = rect.top;
    });

    // Whenever mouse button is released
    window.addEventListener('mouseup', () => {
        // Reset all state values and turn dragging mode off
        isDragging = false;
        startX = null;
        startY = null;
        startLeft = null;
        startTop = null;
    });

    // Whenever mouse is moved
    window.addEventListener('mousemove', (e) => {
        // Do nothing if it's you're not in a dragging mode
        if (!isDragging) return;

        // Get the difference between current mouse cursor position and the mousedown position
        const deltaX = e.pageX - startX;
        const deltaY = e.pageY - startY;

        // Add the difference to initial card position
        // Event coordinates and card positions are stored separately because you can click somewhere inside the card,
        // but you need to know the top left coordinates of the card to move it either with top/left or with css transform.
        elRoot.style.left = `${startLeft + deltaX}px`;
        elRoot.style.top = `${startTop + deltaY}px`;
    });
})();

