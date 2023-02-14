/* SPEECH */
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
document.getElementById("buscar").addEventListener("click",buscar);
/* CARRITO */
function buscar() {
    let boton=document.getElementById("buscar");
    let inputBusc=boton.previousElementSibling.firstElementChild.firstElementChild;
    if (inputBusc.value=="") {
        console.log("introduce el producto a mostrar");
    } else {
        fetch("../datos.json")
            .then (respuesta => respuesta.json())
            .then (json => mostrarBusqueda(json))
            .then (fav => fav.mas())
            .catch(e => alert(e));
    }

}
function mostrarBusqueda(json) {
    let boton=document.getElementById("buscar");
    let inputBusc=boton.previousElementSibling.firstElementChild.firstElementChild;
    let printResult=document.getElementById("offcanvas-body");
    //borramos tras una nueva busqueda
    if (printResult.innerHTML!="") {
        printResult.innerHTML="";
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].nombre.toLowerCase().includes(inputBusc.value.toLowerCase())
            ||json[i].precio.toLowerCase().includes(inputBusc.value.toLowerCase())
            ||json[i].categoria.toLowerCase().includes(inputBusc.value.toLowerCase())) {
            document.getElementById("offcanvas").className += " show";
            printResult.insertAdjacentHTML("beforeend","<div class='col'>"
                                                    +"<div class='card shadow-sm' >"
                                                        +"<h3 class='card-header font back-texto'>"+json[i].nombre+"</h3>"
                                                        +"<img src='../"+json[i].img+"' alt='"+json[i].id+"' class='ajustar' width='100%'>"
                                                        
                                                        +"<div class='card-body'>"
                                                            +"<h5 class='card-title'>Ingredientes</h5>"
                                                            +"<div class='card-text'>"
                                                                +"<ul id='ing'>"+listaIngr(json[i])+"</ul>"
                                                            +"</div>"
                                                        +"</div>"
                                                        +"<div class='d-flex justify-content-between align-items-center card-footer '>"
                                                            +"<div class='btn-group'>"
                                                                +"<button type='button' class='btn btn-sm btn-outline-secondary fav'><img src='../img/svg/heart.svg' alt='fav'></button>"
                                                                
                                                            +"</div>"
                                                            +"<small class='text-muted' id='"+json[i].id+"'>"+json[i].id+"</small>"
                                                        +"</div>" 
                                                    +"</div>"
                                                  +"</div>"
        );
        }
        
    }
}

function listaIngr(json) {
    let ing="";
    
    const nombres= Object.values(json.ingredientes);
    for (let j = 0; j < json.ingredientes.length; j++) {
        
        if (Array.isArray(json.ingredientes[j])==true) {
            ing+="<li>opciones <ul>";
            for (let i = 0; i < json.ingredientes[j].length; i++) {
                ing+="<li>"+json.ingredientes[j][i]+"</li>";
            }
            ing+="</ul></li>";
        }else{
            ing+="<li>"+json.ingredientes[j]+"</li>";
        }
        
    }
        
    return ing;
}
function cerrar() {
    document.getElementById("offcanvas").className = "offcanvas offcanvas-start ";
}
function mas() {
    const fav = document.getElementsByClassName("fav");
    for (let i = 0; i < fav.length; i++) {
        fav[i].addEventListener("click", ()=>{
            if (fav[i].firstElementChild.src.includes("fill")) {
                fav[i].firstElementChild.src="../img/svg/heart.svg";
            }else{
                fav[i].firstElementChild.src="../img/svg/heart-fill.svg";
                mostrarNotificacion();
            }
        });
    }
}
function mostrarNotificacion() {
    if (Notification.permission == 'granted') {
        const notificacion = new Notification('Te notificamos...', { 
            icon:'../img/logo.png',
            body: "Le has dado like. "
        });
        notificacion.onclick = function() {
            window.open('/')
        }
    }
} 

