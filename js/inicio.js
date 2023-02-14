window.onload=function () {
//creamos el usuario predefinido
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("users","[]");
        let [ nombre, email, contra] = ["nombre", "nombre@nombre.com", "1234"];
        createUser(nombre,email,contra);
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

// sonido
    // document.getElementById("sonidoInicio").insertAdjacentElement("",)
}
/* CARRITO */
function buscar(boton) {
    let inputBusc=boton.previousElementSibling.firstElementChild.firstElementChild;
    if (inputBusc.value=="") {
        console.log("introduce el producto a mostrar");
    } else {
        fetch("../datos.json")
            .then (respuesta => respuesta.json())
            .then (json => mostrarBusqueda(json))
            .catch(e => alert(e));
    }

}
function mostrarBusqueda(json) {
    let inputBusc=boton.previousElementSibling.firstElementChild.firstElementChild;
    for (let i = 0; i < json.length; i++) {
        if (json[i].includes(inputBusc)) {
            console.log(json[i]);
        }
        
    }
}
