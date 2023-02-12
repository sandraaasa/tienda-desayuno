window.onload=  function cargar() {
    fetch("../datos.json")
        .then (respuesta => respuesta.json())
        .then (json => cargarJSON(json))
        .then( productos => mas() )
        .catch(e => alert(e));
    // GEOLOCALIZACION
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
}
function cargarJSON( json ) {
    let content = document.getElementById("contenedor");
    
    for (let i = 0; i < json.length; i++) {
        
        
        content.innerHTML+="<div class='col'>"
                                +"<div class='card shadow-sm'>"
                                    +"<h3 class='card-header'>"+json[i].nombre+"</h3>"
                                    +"<img src='../"+json[i].img+"' alt='"+json[i].id+"' width='100%' height='240px'>"
                                        +"<div class='card-body'>"
                                            +"<h5 class='card-title'>Ingredientes</h5>"
                                            +"<div class='card-text'>"
                                                +"<ul id='ing'>"+listaIngr(json[i])+"</ul>"
                                            +"</div>"
                                            +"<div class='d-flex justify-content-between align-items-center'>"
                                                +"<div class='btn-group'>"
                                                    +"<button type='button' class='btn btn-sm btn-outline-secondary fav'><img src='../img/svg/heart.svg' alt='fav'></button>"
                                                    +"<button type='button' class='btn btn-sm btn-outline-secondary buy'> <img src='../img/svg/bag-plus.svg' alt='buy'></button>"
                                                +"</div>"
                                                +"<small class='text-muted' id='"+json[i].id+"'>"+json[i].id+"</small>"
                                            +"</div>"
                                            
                                        +"</div>"
                                +"</div>"
                            +"</div>";
    }
    const buy = document.getElementsByClassName("buy");
    for (let i = 0; i < buy.length; i++) {
        buy[i].addEventListener("click", ()=>{
            carrito(json);
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
function mas() {
    const fav = document.getElementsByClassName("fav");
    
    for (let i = 0; i < fav.length; i++) {
        fav[i].addEventListener("click", ()=>{
            if (fav[i].firstElementChild.src.includes("fill")) {
                fav[i].firstElementChild.src="../img/svg/heart.svg";
            }else{
                fav[i].firstElementChild.src="../img/svg/heart-fill.svg";
            }

            
        });
    }
    const buy = document.getElementsByClassName("buy");
    for (let i = 0; i < buy.length; i++) {
        buy[i].addEventListener("click", ()=>{
            if (buy[i].firstElementChild.src.includes("fill")) {
                buy[i].firstElementChild.src="../img/svg/bag-plus.svg";
                //carrito eliminar
                const carro=JSON.parse(localStorage.getItem("carrito"));
                const carro2=carro.slice(i,1);
                localStorage.setItem("carrito", JSON.stringify(carro2));
            }else{
                buy[i].firstElementChild.src="../img/svg/bag-plus-fill.svg";
                
                let id=document.getElementById(i).innerHTML;
                const carro=JSON.parse(localStorage.getItem("carrito"));
                const objeto={"id":id}
                if (!carro.some(user=>user==objeto)) {
                    carro.push(objeto);
                }
                localStorage.setItem("carrito", JSON.stringify(carro));
                

            }
            
        });
    }


}
function carrito(json) {
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
                                        +"<h6 class='my-0'>"+json[carro[i].id].nombre+"</h6>"
                                        
                                    +"</div>"
                                    +"<span class='text-muted col-1'>"+json[carro[i].id].precio+"</span>"
                                    +"<button type='button' class='btn btn-danger col-2' height='5%' width='5%' onclick='restar()'>-</button>"
                                    +"<div></div>"
                                    +"<button type='button' class='btn btn-danger col-2' onclick='sumar()'>+</button>"
                                +"</li>";
            total=total+json[carro[i].id].precio;
        }

    }
    carrito.insertAdjacentHTML('afterend', "<li class='list-group-item d-flex justify-content-between'>"
                                                +"<span>Total </span>"
                                                +"<strong>"+total+"</strong>"
                                            +"</li>");
                                            total=0;
}