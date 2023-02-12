window.addEventListener('load', function() {
    const requestJSON = 'assets/viajes.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestJSON);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const viajes = request.response;
        showViajes(viajes);
    }
});

function showViajes(jsonObj, nombre = null) {
    const viajes = jsonObj['viajes'];
    const divViajes = document.getElementById("viajes");

    if(nombre){
        divViajes.innerHTML = ``;
        for (var i = 0; i < viajes.length; i++) {
            if(viajes[i].nombre == nombre){
                divViajes.innerHTML += `
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="${viajes[i].url}" alt="${viajes[i].nombre}" />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">${viajes[i].nombre}</h5>
                                <span class="text-muted text-decoration-line-through">${viajes[i].precio_oferta}€</span>
                                ${viajes[i].precio}€
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><button class="btn btn-outline-dark mt-auto carrito" data-nombre="${viajes[i].nombre}" onclick="cuandoSeHaceClick()">Añadir al carrito</button></div>
                        </div>
                    </div>
                </div>`;
            }
        }
    }else{
        for (var i = 0; i < viajes.length; i++) {
            divViajes.innerHTML += `
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="${viajes[i].url}" alt="${viajes[i].nombre}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${viajes[i].nombre}</h5>
                            <span class="text-muted text-decoration-line-through">${viajes[i].precio_oferta}€</span>
                            ${viajes[i].precio}€
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><button class="btn btn-outline-dark mt-auto carrito" data-nombre="${viajes[i].nombre}" onclick="agregarCarrito('${viajes[i].nombre}')">Añadir al carrito</button></div>
                    </div>
                </div>
            </div>`;
        }
    }

    
}

// Reconocimiento de voz

const btnGrabar = document.getElementById('btnGrabar');
const btnStop = document.getElementById('btnStop');
const busqueda = document.getElementById('busqueda');

let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    const results = event.results;
    const frase = results[results.length - 1][0].transcript;
    busqueda.value += frase;

    const requestJSON = 'assets/viajes.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestJSON);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const viajes = request.response;
        showViajes(viajes, frase);
    }
}

recognition.onend = (event) => {
    console.log("El microfono deja de escuchar");
}

recognition.onerror = (event) => {
    console.log(event.error);
}

btnGrabar.addEventListener('click', () => {
    recognition.start();
});

btnStop.addEventListener('click', () => {
    recognition.abort();
})

const agregarCarrito = function (viaje) {
	var usuarioLogueado = sessionStorage.getItem('usuarioLogueado');
    if(!usuarioLogueado){
        window.location.href = "login.html";
    }
}