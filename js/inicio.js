window.onload=function () {
//creamos el usuario predefinido
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("users","[]");
        let [ nombre, email, contra] = ["nombre", "nombre@nombre.com", "1234"];
        createUser(nombre,email,contra);
        
    }
    
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
