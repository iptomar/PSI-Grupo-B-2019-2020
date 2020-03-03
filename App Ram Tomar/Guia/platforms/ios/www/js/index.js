var container = document.getElementById('container');

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

    onDeviceReady: function () {
        this.receivedEvent('deviceready');


        var onSuccess = function (position) {
            var topo = document.getElementById('topo');
            var body = document.body;
            body.classList.add('overflow');


            //buscar o div criado no html
            var mapa = document.getElementById('mapid');
            //criar o mapa atraves da biblioteca da leaflet com a posiçao definida e zoom
            var mymap = L.map('mapid').setView([39.60360511, -8.40795278], 16);
            //.locate({setView: true, maxZoom: 16});
            var estado = 0;

            //criação dos eventos e suas funcoes para distinguir o estado online e offline
            document.addEventListener("offline", onOffline, false);


            function onOffline() {
                L.tileLayer('maps/{z}/{x}/{y}.png', {
                    maxZoom: 17,
                    minZoom: 15,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
                estado = 1;
                console.log(estado);
                alert('Entrou no modo Offline, vai encontrar algumas funcionabilidades limitadas.');

            }

            document.addEventListener("online", onOnline, false);

            function onOnline() {
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    minZoom: 15,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
                estado = 2;
                console.log(estado);
            }

            //verificação inicial para saber se o dispositivo encontra-se com conexão ou nao 
            if (navigator.onLine) {
                console.log("online");
                onOnline();
            } else {
                console.log("offline");
                onOffline();
            }




            // window.addEventListener("online", function online() {
            //     console.log("online");
            // L.tileLayer('maps/{z}/{x}/{y}.png', {
            //     maxZoom: 17, minZoom: 15,
            //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(mymap);

            // });

            // window.addEventListener("offline", function offline() {
            //     console.log("offline");
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //         maxZoom: 19,
            //         minZoom: 15,
            //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            //     }).addTo(mymap);
            // });

            //vai buscar a posição inicial quando inicia a app
            navigator.geolocation.getCurrentPosition(function (location) {
                var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
                //var marker = L.marker(latlng).addTo(mymap);
            });


            var jsonData;
            var control;
            //buscas do elementos criados no html
            var btPos = document.getElementById('btPosicao');
            var icon = document.getElementById('idIcon');
            var divInfo = document.getElementById('infoAdicional');



            var br = document.createElement('br');


            //metodo de jQuery para ir buscar e ler o ficheiro info.json
            $.getJSON("info.json", function (json) {
                jsonData = json;
                //let cada posição do ficheiro json e inserir numa variavel
                for (var i = 0; i < jsonData.length; i++) {
                    let jsons = jsonData[i];
                    //desenhar o poligno dos edificios consoantes as coordenadas lidas do json
                    var polygon = L.polygon([jsons.Coordernadas], {
                        color: 'red',
                        weight: '0.5',
                        fillOpacity: '0.2',
                    }).addTo(mymap);

                    //criação de elementos para mostrar no popup quando se clica num icon ou poligno de um edificio
                    var divPopup = document.createElement('div');
                    divPopup.setAttribute('id', 'iDdivPopup');
                    var popUpTipo = document.createElement('p');
                    popUpTipo.setAttribute('id', 'idPopUpTipo');
                    popUpTipo.classList.add('item1');
                    var popUpNome = document.createElement('p');
                    popUpNome.setAttribute('id', 'idPopUpNome');
                    popUpNome.classList.add('item2');

                    var btWaypoint = document.createElement('button');
                    btWaypoint.setAttribute('id', 'idBtWaypoint');
                    btWaypoint.classList.add('btn', 'btn-warning', 'item4');
                    btWaypoint.textContent = "Traçar caminho  ";
                    var iShoes = document.createElement('i');
                    iShoes.classList.add('fas', 'fa-shoe-prints');
                    btWaypoint.appendChild(iShoes);

                    //onclick do traçar trajeto e criação da rota com metodos do leaflet routing map
                    //em que vai buscar as coordenadas do user e faz rota ate as coordernadas do icon clicado
                    btWaypoint.onclick = waypoint => {

                        removeRoutingControl();

                        console.log(current_position._latlng.lat);

                        control = L.Routing.control({
                            waypoints: [
                                L.latLng(current_position._latlng),
                                L.latLng(jsons.IconCoordenadas)
                            ],
                            lineOptions: {
                                styles: [{ color: 'red', opacity: 1, weight: 5 }],
                                //addWaypoints:false
                            },
                            draggableWaypoints: false,

                        }).addTo(mymap);


                    }


                    popUpTipo.textContent = jsons.TipoEdificio;
                    popUpNome.textContent = jsons.NomeEdificio;
                    divPopup.appendChild(popUpTipo);
                    divPopup.appendChild(popUpNome);


                    //criação do icon dos edificios
                    var myIcon = L.icon({
                        iconUrl: 'icon.png',
                        iconSize: [30, 48],
                        iconAnchor: [24, 48],
                        popupAnchor: [-7, -45]

                    });
                    L.marker(jsons.IconCoordenadas, { icon: myIcon }).addTo(mymap).bindPopup(divPopup);

                    //atraves de jquery clicar nos detalhes de um edificio e ler as suas informações
                    var link = $('<a href="#"  class="item3" style="background-color: #17283B; color: white; text-align: center; margin-bottom: .5em; margin-left: .5em; padding: .75em; text-decoration: none; border-radius: .25rem; ">Detalhes  <i class="fas fa-info"></i></a>').click(function () {
                        // class="speciallink badge badge-info" margin-left: 0.7em; margin-right: -10em;

                        body.classList.remove('overflow');
                        btPos.classList.add('hidden');
                        divInfo.classList.remove("hidden");
                        mapa.classList.add('hidden');
                        mymap.closePopup();

                        //criação de elementos e adicionados ao html
                        var hr = document.createElement('hr');
                        hr.setAttribute('id', 'idHr');

                        var spanLinha = document.createElement('span');
                        spanLinha.setAttribute('id', 'idSpanLinha');
                        spanLinha.textContent = "";

                        var autoresTab = document.createElement('div');
                        autoresTab.setAttribute('id', 'idAutoresTab');
                        autoresTab.textContent = "Autores do projeto: ";


                        var pNomeEdificio = document.createElement('h2');
                        pNomeEdificio.setAttribute('id', 'idNomeEdificio');
                        var pLocalizacao = document.createElement('p');
                        pLocalizacao.setAttribute('id', 'idLocalizacao');
                        var pAutores = document.createElement('p');
                        pAutores.setAttribute('id', 'idAutores');
                        var pDescricao = document.createElement('p');
                        pDescricao.setAttribute('id', 'idDescricao');
                        var pTipoEdificio = document.createElement('h3');
                        pTipoEdificio.setAttribute('id', 'idTipoEdificio');
                        var pData = document.createElement('p');
                        pData.setAttribute('id', 'idData');



                        //atribuição dos valores existentes no json
                        pNomeEdificio.textContent = jsons.NomeEdificio;
                        pLocalizacao.textContent = jsons.Localizacao;
                        pAutores.textContent = jsons.Autores;
                        pDescricao.textContent = jsons.Descricao;
                        spanLinha.textContent = jsons.TipoEdificio;
                        pTipoEdificio.appendChild(spanLinha);
                        pData.textContent = jsons.Data;

                        divInfo.appendChild(pTipoEdificio);
                        divInfo.appendChild(pNomeEdificio);
                        divInfo.appendChild(pData);
                        divInfo.appendChild(pLocalizacao);
                        divInfo.appendChild(autoresTab);

                        //dividir a string dos autores por virgulas e let autor a autor
                        var rString = pAutores.textContent;
                        var rArray = rString.split(",");

                        for (var k = 0; k < rArray.length; k++) {
                            var sAutores = rArray[k];

                            var singleAutor = document.createElement('p');
                            singleAutor.setAttribute('id', 'idSingleAutors');
                            singleAutor.textContent = sAutores;

                            divInfo.appendChild(singleAutor);

                        }


                        divInfo.appendChild(hr);
                        divInfo.appendChild(pDescricao);

                        var divRow = document.createElement('div');
                        divRow.setAttribute('id', 'idDivRow');
                        divRow.setAttribute('class', 'row');

                        //ler arrays de imagens existente no json e criar os elementos para cada imagens com a legendas e o autores da imagem
                        for (var j = 0; j < jsons.Imagens.length; j++) {
                            var imgEdificio = jsons.Imagens[j];


                            var divColMd = document.createElement('div');
                            divColMd.setAttribute('id', 'idDivColMd');
                            divColMd.setAttribute('class', 'col-md-4');
                            divColMd.setAttribute('class', 'content');
                            var divThumb = document.createElement('div');
                            divThumb.setAttribute('class', 'thumbnail');
                            divThumb.setAttribute('id', 'idDivThumb');
                            var divCaption = document.createElement('div')
                            divCaption.setAttribute('id', 'idDivCaption');
                            divCaption.setAttribute('class', 'caption');
                            divCaption.setAttribute('class', 'rounded-bottom');

                            var img = document.createElement('img');
                            var imgLegenda = document.createElement('p');
                            var imgAutor = document.createElement('p');

                            //lida a path da imagem para a pasta das imagens
                            img.src = imgEdificio.Path;
                            img.setAttribute('id', 'idImagens');
                            img.setAttribute('class', 'rounded');

                            //onclick na imagem para ver esta com mais zoom que é mostrada inicialmente
                            img.setAttribute('data-Path', imgEdificio.Path);
                            img.onclick = fullImg => {
                                var pathId = fullImg.target.getAttribute('data-Path', imgEdificio.Path);



                                // var ref = cordova.InAppBrowser.open(pathId, '_self', 'location=no, enableViewportScale=true');
                                // ref.addEventListener('exit', function () {
                                //     window.scrollTo(0, 0);


                                    convertImgToBase64(pathId,function(dataUrl){
                                        window.FullScreenImage.showImageBase64(dataUrl, ' ', "jpg");
                                    });
                                    
                                    function convertImgToBase64(pathId, callback, outputFormat){
                                        var img = new Image();
                                        img.crossOrigin = 'Anonymous';
                                        img.onload = function(){
                                            var canvas = document.createElement('CANVAS');
                                            var ctx = canvas.getContext('2d');
                                            canvas.height = this.height;
                                            canvas.width = this.width;
                                            ctx.drawImage(this,0,0);
                                            var dataURL = canvas.toDataURL();
                                            callback(dataURL.substring(dataURL.indexOf(',')+1));
                                            canvas = null; 
                                        };
                                        img.src = pathId;
                                      }



                                });
                            }

                            //atribuição dos valores existentes no json
                            imgLegenda.textContent = imgEdificio.Legenda;
                            imgAutor.textContent = imgEdificio.AutorFonte;

                            divCaption.appendChild(imgLegenda);
                            divCaption.appendChild(imgAutor);

                            divThumb.appendChild(img);
                            divThumb.appendChild(divCaption);


                            divColMd.appendChild(divThumb);

                            divRow.appendChild(divColMd);

                            divInfo.appendChild(divRow);

                        }

                    })[0];
                    divPopup.appendChild(link);
                    divPopup.appendChild(br);
                    divPopup.appendChild(btWaypoint);

                    polygon.bindPopup(divPopup);
                }

            });

            //funcap +ara remover painel de direções gerado automaticamente para o trajeto
            function removeRoutingControl() {
                if (control != null) {
                    mymap.removeControl(control);
                    control = null;
                }
            };


            // var imgFull = document.createElement('img');
            // var full = document.getElementById('fullImg');
            function ecraImagem(imgP) {

                // imgFull.innerHTML = "";
                // full.classList.remove('hidden');
                // var topo = document.getElementById('topo');

                // topo.classList.add('hidden');
                // divInfo.classList.add("hidden");

                // imgFull.src = imgP;
                // imgFull.setAttribute('id', 'idImgFull');

                // var ref = cordova.InAppBrowser.open(imgFull.src, '_self', 'location=no,enableViewportScale=true');
                // ref.addEventListener('click', function (event) { alert(event.url); });

                // full.appendChild(imgFull);
                //console.log(imgFull);

            }



            /* Busca o div do Acerca e o Buttão do sobre e faz o onclick*/
            var divAcerca = document.getElementById('idAcerca');
            var btSobre = document.getElementById('idSobreBt');
            btSobre.onclick = mostraSobre => {
                divAcerca.classList.remove('hidden');
                mapa.classList.add('hidden');
                btPos.classList.add('hidden');
                body.classList.remove('overflow');
            }
            /****************************************************************/

            var idP = document.createElement('p');
            divInfo.appendChild(idP);

            //trabalha o evento do botao dos dispositivos para voltar atras
            document.addEventListener("backbutton", onBackKeyDown, false);
            function onBackKeyDown(e) {

                //sair da aplicação quando esta está no mapa
                if (mapa.classList.contains('hidden') === false) {

                    navigator.app.exitApp();

                    /* *************** para sair da imagem NAO IRÁ SER NECESSÁRIO (TESTES) ***************  */
                } else if (topo.classList.contains('hidden') === true) {

                    window.scrollTo(0, 0);
                    topo.classList.remove('hidden');
                    divInfo.classList.remove('hidden');
                    ref.close();

                    /******************************************************* */
                    /* *********** sair do Sobre para o mapa  *************  */
                } else if (divAcerca.classList.contains('hidden') === false) {
                    // imgFull.innerHTML = "";

                    divInfo.innerHTML = "";
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    btPos.classList.remove('hidden');
                    icon.classList.remove('hidden');
                    mapa.classList.remove('hidden');
                    divInfo.classList.add('hidden');
                    divAcerca.classList.add('hidden');
                    body.classList.add('overflow');
                    mymap.closePopup();
                    /******************************************************* */
                } else {
                    /* ***** sair da informação do edificio para o mapa **** */
                    //imgFull.innerHTML = "";

                    divInfo.innerHTML = "";
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    btPos.classList.remove('hidden');
                    icon.classList.remove('hidden');
                    mapa.classList.remove('hidden');
                    divInfo.classList.add('hidden');
                    body.classList.add('overflow');
                    mymap.closePopup();
                    /******************************************************* */
                }
            }

            /* =========  Função para o butão de ir para a posição do marker ===========*/
            $('.refreshButton').on('click', function () {
                mymap.locate({ setView: true, maxZoom: 17 });
            });
            mymap.on('locationfound', onLocationFound);
            function onLocationFound(e) {
                console.log(e);
                // e.heading will contain the user's heading (in degrees) if it's available,
                // and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed. 
                L.marker(e.latlng).addTo(mymap);
            }
            /* ======================================================================== */


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // placeholders for the L.marker and L.circle representing user's current position and accuracy    
            var current_position, current_accuracy;

            //funcoes que vao ler a posição do utilizador e marcar no mapa e remover a posição anterior
            function onLocationFound(e) {
                // if position defined, then remove the existing position marker and accuracy circle from the map
                if (current_position) {
                    mymap.removeLayer(current_position);
                    //mymap.removeLayer(current_accuracy);
                }

                //var radius = e.accuracy / 2;

                current_position = L.marker(e.latlng).addTo(mymap);
                //.bindPopup("You are within " + radius + " meters from this point").openPopup();

                //current_accuracy = L.circle(e.latlng, radius).addTo(mymap); 
            }

            function onLocationError(e) {
                alert(e.message);
            }

            mymap.on('locationfound', onLocationFound);
            // mymap.on('locationerror', onLocationError);

            // wrap map.locate in a function    
            function locate() {
                mymap.locate({ setView: false, maxZoom: 16 });
                //var marker = L.marker(latlng).addTo(mymap);
            }


            // call locate every 3 seconds... forever
            setInterval(locate, 3000);
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////



        }

        var onError = function (error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 10000, enableHighAccuracy: true });



    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
    }
};


app.initialize();