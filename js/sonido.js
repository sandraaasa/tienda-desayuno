

document.getElementById('buscarmic').onclick= ejecutarSpeechAPI;

function ejecutarSpeechAPI() {
    //crear el objeto Speech Recognition
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // comienza el reconocimiento
    recognition.start();

    // Detecta cuando empieza a hablar(start) y muestra Escuchando...
    recognition.onstart = function () {
        console.log("Escuchando...");

    };
    // Detecta cuando deja de hablar (speechend) y para el reconocimiento(stop())  
    recognition.onspeechend = function () {
        console.log("Se detuvo de ejecutar");
        recognition.stop();
    };

    //Se ejecuta cuando obtiene los resultados del reconocimiento
    recognition.onresult = function (e) {
        console.log(e.results);
        var transcript = e.results[0][0].transcript;
        alert(transcript);
        document.getElementById('busqueda').value=transcript;
        
    };
}
