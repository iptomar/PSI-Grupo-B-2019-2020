 //buscar o div criado no html
 var mapa = document.getElementById('map');
//criar o mapa atraves da biblioteca da leaflet com a posiçao definida e zoom
//O maxZoom quando inicializa a aplicaão é 14 e vai localizar o longitude e latitude na posicão atual 
//do utilizador
var mymap = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 14});
//var mymap = L.map('map').setView([39.60360511, -8.40795278], 15);

//criação dos eventos e suas funcoes para distinguir o estado online e offline
//######################Estado OffLine##################################
document.addEventListener("offline", onOffline, false);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"></a>';
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


var marker;
var circle;
 //vai indicar a posição inicial quando inicia a app
 navigator.geolocation.getCurrentPosition(function (location) {
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    //Criar o marcador do mapa na localizacão atual
    marker = L.marker(latlng, { icon: markerCurrent}).addTo(mymap);
    
     //metodo de jQuery para ir buscar e ler o ficheiro info.json
    $.getJSON('json/info.json', function(data){
        let buildings = data.buildings;
        $.each(buildings, function(i, data){
             circle = L.circle([data.coordinate1, data.coordinate2], {
                color: 'green',
                fillColor: '#aa3',
                fillOpacity: 0.5,
                radius: 100
            }).addTo(mymap);

            L.marker([data.coordinate1, data.coordinate2]).bindPopup(`
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content" style="height:300px; width:300px;overflow:scroll;">
                            <div class="modal-header">
                                <h1 class="modal-title" id="exampleModalLabel">`+data.buildingName+`</h1><hr>
                                <h2 class="modal-title" id="exampleModalLabel">`+data.buildingType+`</h2>
                                <h4>Localizacão: `+data.location+`</h4>
                                <h5>Ano: `+data.dates+`</h5>
                            </div><hr>
                            <div class="modal-body">
                                <p>`+data.description+`</p>
                            </div>
                            <div class="modal-footer">
                                <a class="btn btn-primary" href="#">Ver detalhes</a>
                            </div><br>
                        </div>
                    </div>
                    </div>`).addTo(mymap);
        });
    });
    marker.bindPopup("<b>You are here now!</b>").openPopup();
    
});






































































