window.onload=function () {

}
function notificacion() {
    if (localStorage.getItem("nombre")!=null) {
        const usuario={};
        usuario.nombre=localStorage.getItem("nombre");
        usuario.email=localStorage.getItem("email");
        usuario.contra=localStorage.getItem("contra");
    }

}