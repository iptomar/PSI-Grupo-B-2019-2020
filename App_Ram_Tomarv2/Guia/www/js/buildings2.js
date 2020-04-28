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

 //vai indicar a posição inicial quando inicia a app
 navigator.geolocation.getCurrentPosition(function (location) {
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    //Criar o marcador do mapa na localizacão atual
    var marker = L.marker(latlng, { icon: markerCurrent}).addTo(mymap);
    
    var popupContext = document.createElement('h4');
    popupContext.style.color = "#00cc44";
    popupContext.innerHTML = "You are here now!";

    buildings();

    marker.bindPopup(popupContext).openPopup();
});


//Funcão para fazer fetch das informacões 
var coord;
async function buildings() 
{
    try {
        //let Access-Control-Allow-Origin across the CORS url
        //let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //Target url to fetch
        let targetUrl = 'json/info.json';
        let response = await fetch(targetUrl);
        let data = await response.json();
        let dados = data.buildings; 
        
        $.each(dados, function(i, info){
            coord = [info.coordinate1, info.coordinate2];
            circle = L.circle(coord, {
            color: 'green',
            fillColor: '#aa3',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(mymap);

       
        var marcador = L.marker(coord);
        marcador.bindTooltip(`<b>`+info.buildingName+`</b>`).openTooltip();
        marcador.bindPopup(`
                <div id="detalhe1" data-toggle="modal" data-target="#test1">
                    <div class="modal-header">
                        <h3 class="modal-title">`+info.buildingName+`</h3>
                    </div>
                    <div class="modal-body">
                        <h5 class="modal-title" id="exampleModalLabel"> Localizacão: `+info.location+`</h5>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-warning"><span class="glyphicon glyphicon-pushpin"> Traçar o caminho</button><br><br>
                        <a class="btn btn-info linkDetal" type="button" href="#detalhe"><span class="glyphicon glyphicon-eye-open"> Ver os detalhes</a>
                    </div><br>
                </div>
                <div id="detalhe" tabindex="-1" data-toggle="modal" data-target="#test2">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span id="btnClose" aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">`+info.buildingName+`</h4>
                    </div>
                    <div class="modal-body" id="col2">
                        <h5>Tipo edificio: `+info.buildingType+`</h5>
                        <h7>Ano: `+info.dates+`</h7><hr>
                        <p>`+info.description+`</p>
                        <hr />
                        <h4>`+info.authors[0].name+`</h4>
                        <h4>`+info.authors[1].name+`</h4>
                        <figure>
                            <div class="row">
                                <img style="width: 200px; height: 200px" src="`+info.images[0].base64+`" alt="`+info.images[0].description+`">
                                <figcaption> Autor da imagem: `+info.images[0].sourceAuthor+`</figcaption><br>
                                <img style="width: 200px; height: 200px" src="`+info.images[1].base64+`" alt="`+info.images[1].description+`">
                                <figcaption> Autor da imagem: `+info.images[1].sourceAuthor+`</figcaption>
                            </div>
                            </figure>
                       
                    </div>
                </div>
                `).addTo(mymap);
        });

    } catch (ex) {
        alert("O site que esta a buscar não existe. Tente de novo!");
    }
}



















































































