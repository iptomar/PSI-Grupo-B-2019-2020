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


var marker;
 //vai indicar a posição inicial quando inicia a app
 navigator.geolocation.getCurrentPosition(function (location) {
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    //Criar o marcador do mapa na localizacão atual
    marker = L.marker(latlng, { icon: markerCurrent}).addTo(mymap);
    
    buildings();
    marker.bindPopup("<b>You are here now!</b>").openPopup();
    
});


//Funcão para fazer fetch das informacões 
var coord;
async function buildings() 
{
    try {
        let response = await fetch('http://psi2020.tugamars.com/api/buildings');
        let data = await response.json();
        let dados = data.data; 
        
        $.each(dados, function(i, info){
            coord = [info.coordinate1, info.coordinate2];
            circle = L.circle(coord, {
            color: 'green',
            fillColor: '#aa3',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(mymap);

        L.marker(coord).bindPopup(`
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content" style="height:300px; width:300px;overflow:scroll;">
                        <div class="modal-header">
                            <h1 class="modal-title" id="exampleModalLabel">`+info.buildingName+`</h1><hr>
                            <h2 class="modal-title" id="exampleModalLabel">`+info.buildingType+`</h2>
                            <h4>Localizacão: `+info.location+`</h4>
                            <h5>Ano: `+info.dates+`</h5>
                        </div><hr>
                        <div class="modal-footer">
                            <a class+"btn btn-primary" type="button" href="#detalhe">Ver detalhes</a>
                        </div><br>
                    </div>
                </div>
                </div>`).addTo(mymap);
                
                $('#detalhe').html(
                    `<div class="modal-body">
                        <p>`+info.description+`</p>
                    </div>`
                );
        });

    } catch (ex) {
        alert("O site que esta a buscar não existe. Tente de novo!");
    }
}

// //<img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
// AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
// 9TXL0Y4OHwAAAABJRU5ErkJggg=="
// />


        

















































































