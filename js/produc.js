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
/* CARGAR PRODUCTOS */
function cargarJSON( json ) {
    let content = document.getElementById("contenedor");
    myobj=json;
    for (let i = 0; i < json.length; i++) {
        
        content.innerHTML+="<div class='col'>"
                                +"<div class='card shadow-sm h-100' >"
                                    +"<h3 class='card-header font back-texto'>"+json[i].nombre+"</h3>"
                                    
                                    +"<img src='../"+json[i].img+"' alt='"+json[i].id+"' class='ajustar' width='100%' height='300px'>"
                                    
                                    +"<div class='overlay'>"
                                            +"<small class='money'>"+json[i].precio+" €</small>"
                                    +"</div>"

                                        +"<div class='card-body'>"
                                            +"<h5 class='card-title'>Ingredientes</h5>"
                                            +"<div class='card-text'>"
                                                +"<ul id='ing'>"+listaIngr(json[i])+"</ul>"
                                            +"</div>"
                                        +"</div>"
                                        +"<div class='d-flex justify-content-between align-items-center card-footer '>"
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
    
    const imgs = document.getElementsByClassName("ajustar");
    
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("mouseover", ()=>{
            if (document.getElementsByClassName("overlay")[i].style.display=="block") {
                document.getElementsByClassName("overlay")[i].style.display="none";
            } else {
                document.getElementsByClassName("overlay")[i].style.display="block";
            }
        })
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
/* BOTONES DE ME GUSTA Y AÑADIR CARRITO */
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
                if (localStorage.getItem("interruptor")==true) {
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
                        const objeto={
                            "id":id,
                            "nombre":myobj[i].nombre,
                            "cantidad":1
                        }
                        if (carro.some(elem => elem.id == objeto.id)) {
                            console.log("este objeto ya esta añadido");
                        }else{
                            carro.push(objeto);
                        }
                        localStorage.setItem("carrito", JSON.stringify(carro));
                    }
                } else {
                    if (Notification.permission == 'granted') {
                        const notificacion = new Notification('Te notificamos...', { 
                            icon:'../img/logo.png',
                            body: "INICIA SESION "
                        });
                        notificacion.onclick = function() {
                            window.open('/html/regi.html')
                        }
                    }
                }
                
        });
    }
}
/* NOTIFICACION LIKE */
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

/* CARGAR CARRITO */
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
            let cost=Number(json[carro[i].id].precio)* Number(carro[i].cantidad);
            carrito.innerHTML+="<li class='list-group-item d-flex justify-content-between lh-sm'>"
                                    +"<div class='col-6 row'>"
                                        +"<h5 class='col-2'>"+i+". </h5>"
                                        +"<h6 class='my-0 col'>"+json[carro[i].id].nombre.toUpperCase()+"</h6>"
                                    +"</div>"
                                    +"<button type='button' class='btn btn-danger col-1' height='5%' width='5%' onclick='restar(this)'>-</button>"
                                    +"<div >"+carro[i].cantidad+"</div>"
                                    +"<button type='button' class='btn btn-danger col-1' onclick='sumar(this)'>+</button>"
                                    +"<span class='text-muted col-3 text-end'>"+cost+"€</span>"
                                 +"</li>";
            total=total+cost;
        }

    }
    carrito.insertAdjacentHTML('beforeend', "<li class='list-group-item d-flex justify-content-between'>"
                                                +"<span>Total </span>"
                                                +"<strong >"+total+"€</strong>"
                                            +"</li>");
    total=0;
}


function sumar(num) {
    /* se cambia en el html */
    let cantidad = Number(num.previousElementSibling.innerHTML);
    cantidad++;
    num.previousElementSibling.innerHTML=cantidad;

    /* lo añadimos al localstorage */
    const carro=JSON.parse(localStorage.getItem("carrito"));
    let posiEnArrayCarro=Number(num.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.innerHTML);
    carro[posiEnArrayCarro].cantidad=cantidad;
    localStorage.setItem("carrito", JSON.stringify(carro));
}
function restar(num) {
    let cantidad = Number(num.nextElementSibling.innerHTML);
    if (cantidad<=1) {
        /* cuando es cero o menor se elimina del localstorage */
        const carro=JSON.parse(localStorage.getItem("carrito"));
        let posiEnArrayCarro=Number(num.previousElementSibling.firstElementChild.innerHTML);
        carro.splice(posiEnArrayCarro,1);
        localStorage.setItem("carrito", JSON.stringify(carro));
        /* se elimina del  modal*/
        num.parentElement.remove(num.parentElement);
    }else{
        cantidad--;
        num.nextElementSibling.innerHTML=cantidad;
        /* lo añadimos al localstorage */
        const carro=JSON.parse(localStorage.getItem("carrito"));
        let posiEnArrayCarro=Number(num.previousElementSibling.firstElementChild.innerHTML);
        carro[posiEnArrayCarro].cantidad=cantidad;
        localStorage.setItem("carrito", JSON.stringify(carro));
    }
}