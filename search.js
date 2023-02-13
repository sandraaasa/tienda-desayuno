
const iconBuscar = document.getElementById('icon-buscar');
const divBuscar = document.getElementById('d-buscar');
const btnSearch = document.getElementById('input-search');
const articulos = document.getElementsByClassName('articulo');
const divCoincidencias = document.getElementById('d-coincidencias');
const divHeadArt = document.getElementsByClassName('d-headArt');
const btnGrabar = document.getElementById('btn-grabar');
const btnParar = document.getElementById('btn-parar');
var transcript="";
var valorDebusqueda ="";

window.addEventListener('load', function () {
    divCoincidencias.style.display = "none";
})

iconBuscar.addEventListener('click', mostrarBuscar);
btnSearch.addEventListener('keyup', buscador);

function mostrarBuscar() {
    if (divBuscar.style.top == "73px") {
        divBuscar.style.top = "-100px";

    } else {
        divBuscar.style.top = "73px";
        btnSearch.focus();
    }
}

function buscador() {
   valorDebusqueda = btnSearch.value.toLowerCase();


    for (let i = 0; i < articulos.length; i++) {
        if (articulos[i].firstElementChild.children[1].firstElementChild.textContent.toLowerCase().includes(valorDebusqueda)) {
            articulos[i].classList.remove('filtro');
            divCoincidencias.style.display = "block";
            for (let j = 0; j < divHeadArt.length; j++) {
                divHeadArt[j].classList.add('filtro');
            }

        } else {
            articulos[i].classList.add('filtro');
        }

        if (valorDebusqueda == "") {
            divCoincidencias.style.display = "none";
            for (let j = 0; j < divHeadArt.length; j++) {
                divHeadArt[j].classList.remove('filtro');
            }
        }
    }
}

//reconocimiento de voz

var recognition;

if (!('webkitSpeechRecognition' in window)) {
    alert("¡API no soportada!");
} else {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (e) {
        transcript = e.results[0][0].transcript;
        btnSearch.value=transcript.toLowerCase();
        buscador();
    }

    recognition.onerror = (e) => {
        console.log(e);
        console.log(e.message);
    }

    btnGrabar.addEventListener('click', () => {
        recognition.start();
        console.log('grabando...');
    });

    btnParar.addEventListener('click', () => {
        recognition.stop();
        console.log('dejo de escuchar');
    })
}