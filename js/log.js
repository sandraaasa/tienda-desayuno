
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
    }
            //window.open("../index.html");
    
    
}
function signin(){

    let email = document.getElementById("floatingInput").value;
    let contra= document.getElementById("floatingPassword").value;

    if (localStorage.getItem("users")==null) {
        errorNoUsuario();
    } else {
        const users = JSON.parse(localStorage.getItem("users"));
        if (users.some(user=>user.email==email&&user.contra==contra)) {
            let nombre=users;
            localStorage.setItem("nombre",nombre);
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
        on=true;
    }
    return on;
}