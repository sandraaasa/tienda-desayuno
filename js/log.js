window.addEventListener("load",()=>{
    setTimeout(function(){
        document.querySelector('.cookie-box').classList.add('show');
    }, 2000);
});
// cookies
function aceptarCookies() {
    setCookie("cookieTienda","max-age=604800");
    document.querySelector('.cookie-box').classList.remove('show');

    function setCookie(c_name,exdays){
        // dia de hoy
        let fechActual= new Date();
        let fechActualFormat=fechActual.getUTCDate()+"/"+fechActual.getUTCMonth()+"/"+fechActual.getFullYear();
        // creacion de cookie
        document.cookie=c_name + "=" + fechActualFormat+";"+exdays;
    }
    
    document.querySelector('.cookie-box').classList.remove('show');
}

//registrarse
function signup() {
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("users","[]");
    }

    let nombre=document.getElementById("floatingInputName").value;
    let email=document.getElementById("floatingInputEmail").value;
    let contra=document.getElementById("floatingInputPassword").value;
    
    // almacenamos el usuario en un array con los demas usuarios

    if (createUser(nombre,email,contra)) {
        window.location.href="/";
        
        localStorage.setItem("interruptor",true);
    }
    
    
}

// iniciar sesion
function signin(){

    let email = document.getElementById("floatingInput").value;
    let contra= document.getElementById("floatingPassword").value;

    if (localStorage.getItem("users")==null) {
        errorNoUsuario();
    } else {
        const users = JSON.parse(localStorage.getItem("users"));
        if (users.some(user=>user.email==email&&user.contra==contra)) {
            let nombre=users.find(user=>user.email==email&&user.contra==contra).nombre;
            localStorage.setItem("nombre",nombre);
            localStorage.setItem("interruptor",true);

            document.getElementById("toast-body").innerHTML="Hola "+localStorage.getItem("nombre")+"!!!";
            const toast = new bootstrap.Toast(document.getElementById("liveToast"));
            toast.show();
            
            setTimeout(() =>{
                location.reload();
            },2000);
            
        }else{
            errorNoUsuario();
        }
        
    }
    


}

// errores
function errorNoUsuario() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const err = document.createElement('div')
        err.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>Primero tienes que registrarte</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(err);
}

function errorYaRegis() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const err = document.createElement('div')
        err.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>Ya estas registrado prueba a iniciar sesion</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(err);
}

// creacion de usuarios
function createUser(nombre, email, contra) {
    let on =false;
    const newUser = {
        "nombre":nombre,
        "email":email,
        "contra":contra
    }

    const users = JSON.parse(localStorage.getItem("users"));
    if (users.some(user=>user.email==email)) {
        errorYaRegis();
    }else{
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("nombre",nombre);
        localStorage.setItem("interruptor",true);
        on=true;
    }
    return on;
}