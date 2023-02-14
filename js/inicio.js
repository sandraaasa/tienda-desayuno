window.onload=function () {
//creamos el usuario predefinido
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("users","[]");
        let [ nombre, email, contra] = ["nombre", "nombre@nombre.com", "Contra02"];
        createUser(nombre,email,contra);
        localStorage.setItem("interruptor",false);
    }
// creamos el localstorage del carrito
    if (localStorage.getItem("carrito")==null) {
        localStorage.setItem("carrito","[]");
    }
// mostramos la notificacion de bienvenida   
    document.getElementById("toast-body").innerHTML="Hola "+localStorage.getItem("nombre")+"!!!";
    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();
// geolocalizacion
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('Brunch Pit<br> Estamos aqui.')
        .openPopup();


    // json
    myobj=[];
    fetch("../datos.json")
        .then (respuesta => respuesta.json())
        .then (json => cargarJSON(json))
        .catch(e => alert(e));
    
}
function cargarJSON(json) {

    json=myobj;
    document.getElementById("carrito").addEventListener("click",()=> {
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
});
}