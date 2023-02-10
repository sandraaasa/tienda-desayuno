function signup() {
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("users","");
    }

    let nombre=document.getElementById("floatingInputName").value;
    let email=document.getElementById("floatingInputEmail").value;
    let contra=document.getElementById("floatingInputPassword").value;
    
    // creamos el usuario
    localStorage.setItem("email",email);
    localStorage.setItem("contra",contra);
    localStorage.setItem("nombre",nombre);
    const users=[];
    if (localStorage.getItem("users")!="") {
        users.push(localStorage.getItem("users").split("*"));
    }
    // almacenamos el usuario en un array con los demas usuarios
    for (let i = 0; i < users.length; i++) {
        const usuario=users[i][0].split(";");
        if (usuario[1]===email) {
            errorYaRegis();
        }else{
            const usuario=[localStorage.getItem("nombre"),localStorage.getItem("email"),localStorage.getItem("contra")];
            let usuarios=usuario.join(";");
            users.push(usuarios);
            localStorage.setItem("users",users.join("*"));
            window.open("../index.html");
    
        }
    }
    
}
function signin(){

    let email = document.getElementById("floatingInput").value;
    let contra= document.getElementById("floatingPassword").value;
    let on=false;

    if (localStorage.getItem("users")==null) {
        errorNoUsuario();
    } else {
        const users=localStorage.getItem("users").split("*");
        for (let i = 0; i < users.length; i++) {
            const usuario=users[i].split(";");
            if (usuario[1]===email && usuario[2]===contra) {
                localStorage.setItem("email",email);
                localStorage.setItem("contra",contra);
                localStorage.setItem("nombre",usuario[0]);
                on=false;
            }else{
                on=true;
            }
        }
    }
    if (on==true) {
        errorNoUsuario();
    } else {

        // document.getElementById("exampleModal").style.display="none";
        // document.getElementById("exampleModal").setAttribute("aria-hidden","true");
        document.getElementById("toast-body").innerHTML="HOLAA "+localStorage.getItem("nombre")+"!!!";
        const toast = new bootstrap.Toast(document.getElementById("liveToast"));
        toast.show();
    }
    


}
function errorNoUsuario() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>Primero tienes que registrarte</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(wrapper);
}

function errorYaRegis() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>Ya estas registrado prueba a iniciar sesion</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(wrapper);
}