window.onload=  function cargar() {
//notificacion
    Notification.requestPermission()
        .then( resultado => {
            console.log('El resultado es ', resultado)
        }) 
// json
    myobj=[];
    fetch("../datos.json")
        .then (respuesta => respuesta.json())
        .then (json => cargarJSON(json))
        .then( productos => mas() )
        .catch(e => alert(e));
// geolocalizacion
    var map = L.map('map').setView([51.50, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('Brunch Pit.<br> Estamos aquí.')
        .openPopup();


}

function cargarJSON( json ) {
    let content = document.getElementById("contenedor");
    myobj=json;
    for (let i = 0; i < json.length; i++) {
        
        content.innerHTML+="<div class='col'>"
                                +"<div class='card shadow-sm'>"
                                    +"<h3 class='card-header font back-texto'>"+json[i].nombre+"</h3>"
                                    +"<img src='../"+json[i].img+"' alt='"+json[i].id+"' width='100%'>"
                                    +"<div class='d-flex justify-content-between align-items-center card-footer'>"
                                        +"<div class='btn-group'>"
                                            +"<button type='button' class='btn btn-sm btn-outline-secondary fav'><img src='../img/svg/heart.svg' alt='fav'></button>"
                                            +"<button type='button' class='btn btn-sm btn-outline-secondary buy'> <img src='../img/svg/bag-plus.svg' alt='buy'></button>"
                                        +"</div>"
                                        +"<small class='text-muted' id='"+json[i].id+"'>"+json[i].id+"</small>"
                                    +"</div>"
                                +"</div>"
                            +"</div>";
    }
    document.getElementById("carrito").addEventListener("click",carrito);
    
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

    const buy = document.getElementsByClassName("buy");
    for (let i = 0; i < buy.length; i++) {
        buy[i].addEventListener("click", ()=>{
            let id=document.getElementById(i).innerHTML;
            if (buy[i].firstElementChild.src.includes("fill")) {
                // icono desactivado
                buy[i].firstElementChild.src="../img/svg/bag-plus.svg";
                //carrito eliminar
                const carro=JSON.parse(localStorage.getItem("carrito"));
                carro.splice(carro.indexOf(id),1);
                localStorage.setItem("carrito", JSON.stringify(carro));
                
            }else{
                // icono activado
                buy[i].firstElementChild.src="../img/svg/bag-plus-fill.svg";
                
                // carrito añadir
                const carro=JSON.parse(localStorage.getItem("carrito"));
                if (carro.indexOf(id)<0) {
                    carro.push(id);
                }
                localStorage.setItem("carrito", JSON.stringify(carro));
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
function carrito() {
    json=myobj;
    let carrito=document.getElementById("compra");
    let total=0;
    if (carrito.innerHTML!="") {
        carrito.innerHTML="";
    }
    if (localStorage.getItem("carrito")!="[]") {
        const carro=JSON.parse(localStorage.getItem("carrito"));

        for (let i = 0; i < carro.length; i++) {
            carrito.innerHTML+="<li class='list-group-item d-flex justify-content-between lh-sm'>"
                                    +"<div class='col-6'>"
                                        +"<h6 class='my-0'>"+json[carro[i]].nombre+"</h6>"
                                        
                                    +"</div>"
                                    +"<button type='button' class='btn btn-danger col-1' height='5%' width='5%' onclick='restar()'>-</button>"
                                    +"<div></div>"
                                    +"<button type='button' class='btn btn-danger col-1' onclick='sumar()'>+</button>"
                                    +"<span class='text-muted col-3 text-end'>"+json[carro[i]].precio+"€</span>"
                                 +"</li>";
            total=total+Number(json[carro[i]].precio);
        }

    }
    carrito.insertAdjacentHTML('beforeend', "<li class='list-group-item d-flex justify-content-between'>"
                                                +"<span>Total </span>"
                                                +"<strong >"+total+"€</strong>"
                                            +"</li>");
    total=0;
}