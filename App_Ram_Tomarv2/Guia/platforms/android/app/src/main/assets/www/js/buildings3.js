 //criar o mapa atraves da biblioteca da leaflet com a posiçao definida e zoom
//O maxZoom quando inicializa a aplicaão é 14 e vai localizar o longitude e latitude na posicão atual 
//do utilizador
var mymap = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 14});

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
    iconSize: [75, 75],
    iconAnchor: [25, 16]
});
var control;
 //vai indicar a posição inicial quando inicia a app
var current_position =  navigator.geolocation.getCurrentPosition(function (location) {
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    //Criar o marcador do mapa na localizacão atual
    var marker = L.marker(latlng, { icon: markerCurrent}).addTo(mymap);
    
    
   buildings();
    marker.bindPopup("<b>You are here now!</b>").openPopup();
});

function tracarCam(coord1){
    var latlang = L.latLng(coord1);
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, latlang);

    return coord1;
}

function buildings(){
    try {
        //let Access-Control-Allow-Origin across the CORS url
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //Target url to fetch
        $.getJSON("json/info.json", function(data){
        let dados = data.buildings; 
        
        $.each(dados, function(i, info){
            coord = [info.coordinate1, info.coordinate2];
            circle = L.circle(coord, {
            color: 'green',
            fillColor: '#aa3',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(mymap);

        L.marker(coord).bindPopup(`
            <div id="detalhe1">
                <div class="modal-header">
                    <h6 class="modal-title">`+info.buildingName+`</h6>
                </div>
                <div class="modal-body">
                    <h7 class="modal-title" id="exampleModalLabel">`+info.buildingType+`</h7>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-warning" onclick=tracarCam(`+coord+`)><span class="glyphicon glyphicon-pushpin"> Traçar o caminho</button><br><br>
                    <a class="btn btn-info linkDetal" type="button" href="#detalhe"><span class="glyphicon glyphicon-eye-open"> Ver os detalhes</a>
                </div><br>
            </div>
            <div id="detalhe" tabindex="-1">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span id="btnClose" aria-hidden="true">&times;</span>
                    </button>
                    <h3 class="modal-title">`+info.buildingName+`</h3>
                </div>
                <div class="modal-body">
                    <h4>Localizacão: `+info.location+`</h4>
                    <h5>Ano: `+info.dates+`</h5><hr>
                    <p>`+info.description+`</p>
                    `+$.each(info.authors, function(i, autor){
                        `<p>`+autor.name+`</p>`
                    })+`
                    <img src="data:image/png;base64, `+info.images+`" />
                </div>
            </div>`).addTo(mymap);
        });
        control = L.Routing.control({
            waypoints: [
                L.latLng(current_position),
                L.latLng(coord)
            ],
            routeWhileDragging: true
        })
        control.addTo(mymap);
        
        });

    } catch (ex) {
        alert("O site que esta a buscar não existe. Tente de novo!");
    }
}


