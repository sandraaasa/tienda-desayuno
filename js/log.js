window.addEventListener("load",()=>{
    setTimeout(function(){
        document.querySelector('.cookie-box').classList.add('show');
    }, 2000);
});
/* COOKIES */
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

/* REGISTRARSE */
function signup() {
    if (localStorage.getItem("users")==null) {
        localStorage.setItem("users","[]");
    }

    let nombre=document.getElementById("floatingInputName").value;
    let email=document.getElementById("floatingInputEmail").value;
    let contra=document.getElementById("floatingInputPassword").value;
    
    // almacenamos el usuario en un array con los demas usuarios
    if (validar()) {
        if (createUser(nombre,email,contra)) {
            window.location.href="/";
            localStorage.setItem("interruptor",true);
        }
    }else{
        console.log("no se ha podido realizar bien el registro");
    }
    
    
}
/* VALIDACION */
function validar() { 
    let on1 = false;
    let on2 = false;
    let on3 = false;
    let on4 = false;
    // misma contraseña
    let contra = document.getElementById("floatingInputPassword").value;
    if (contra === document.getElementById("floatingInputREpitPassword").value) {
        console.log("La contraseña es la misma");
        on1=true;
    } else {
        errorContraNIgual();
    }

    // contraseña valida
    let validap = /^[a-zA-Z0-9_@]+$/;
    if (validap.test(contra)) {
        console.log("La contraseña es valida");
        on2=true;
    } else {
        errorPass();
    }
    // nombre valido
    let nombre = document.getElementById("floatingInputPassword").value;
    let validan = /^[a-zA-Z0-9]+$/;
    if (validan.test(nombre)) {
        on3=true;
    } else {
        errorNombre();
    }

    // email valido
    let email = document.getElementById("floatingInputEmail").value;
    var validare = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (validare.test(email)) {
        on4=true;
    } else {
        errorEmail();
    }

}

/* INICIO SESION */
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

/* ERRORES */
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

function errorContraNIgual() {
    const alertPlaceholder = document.getElementById('AlertPlacecontra')
        const err = document.createElement('div')
        err.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>La contraseña no es la misma</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(err);
}

function errorPass() {
    const alertPlaceholder = document.getElementById('AlertPlacenombre')
        const err = document.createElement('div')
        err.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>La contraseña debe incluir mayúsculas, minúsculas y números</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(err);
}
function errorNombre() {
    const alertPlaceholder = document.getElementById('AlertPlacenombre')
        const err = document.createElement('div')
        err.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>El nombre no es correcto introduce solo numeros y letras</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(err);
}
function errorEmail() {
    const alertPlaceholder = document.getElementById('AlertPlacenombre')
        const err = document.createElement('div')
        err.innerHTML = [
          `<div class="alert alert-warning alert-dismissible" role="alert">`,
          `   <div>El email no es correcto introduce.<br> Formato: nombre123@nombre.com</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('');
      
        alertPlaceholder.append(err);
}

/* CREACION DE USUARIOS */
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