window.onload=function () {
//creamos el usuario predefinido
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("users","[]");
        let [ nombre, email, contra] = ["nombre", "nombre@nombre.com", "1234"];
        createUser(nombre,email,contra);
        
    }

// mostramos la notificacion de bienvenida   
    document.getElementById("toast-body").innerHTML="Hola "+localStorage.getItem("nombre")+"!!!";
    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();
}