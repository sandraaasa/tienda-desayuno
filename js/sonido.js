const salida = document.getElementById('busqueda');
const microfono = document.querySelector('#buscarmic');

microfono.addEventListener('click', ejecutarSpeechAPI);

function ejecutarSpeechAPI() {
//crear el objeto Speech Recognition
const SpeechRecognition =  webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang="ES-es";

// comienza el reconocimiento
recognition.start();

// Detecta cuando empieza a hablar(start) y muestra Escuchando...
recognition.onstart = function() {
    salida.placeholder = "Escuchando...";
    
};
// Detecta cuando deja de hablar (speechend) y para el reconocimiento(stop())  
recognition.onspeechend = function() {
    salida.innerHTML = "Se detuvo de ejecutar";
    recognition.stop();
};

//Se ejecuta cuando obtiene los resultados del reconocimiento
recognition.onresult = function(e) {
    console.log(e.results);
    var transcript = e.results[0][0].transcript;
    /* var confidence = e.results[0][0].confidence; */

    document.getElementById("busqueda").value=transcript;
};
}