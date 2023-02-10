window.onload=function () {
//creamos el usuario predefinido
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("email","email@email.com");
        localStorage.setItem("contra","1234");
        localStorage.setItem("nombre","nombre");
        const users=[];    
        const usuario=[localStorage.getItem("nombre"),localStorage.getItem("email"),localStorage.getItem("contra")];
            let usuarios=usuario.join(";");
            users.push(usuarios);
            localStorage.setItem("users",users.join("*"));
    }
}
function notificacion() {
    

}