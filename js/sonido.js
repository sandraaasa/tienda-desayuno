var recognition;
let micro = document.getElementById("buscarmic");
let inputSearch = document.getElementById("busqueda");
var transcript="";

if (!('webkitSpeechRecognition' in window)) {
    alert("¡API no soportada!");
} else {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (e) {
        transcript = e.results[0][0].transcript;
        inputSearch.value=transcript.toLowerCase();
        
    }

    recognition.onerror = (e) => {
        console.log(e);
        console.log(e.message);
    }

    
    micro.addEventListener("click",()=>{
        if (micro.firstElementChild.src.includes("mute")) {
            micro.firstElementChild.src="../img/svg/mic-fill.svg";
            recognition.stop();
            console.log('dejo de escuchar');   
        } else {
            micro.firstElementChild.src="../img/svg/mic-mute-fill.svg";
             
            recognition.start();
            console.log('grabando...');
        }
    }) 
}
