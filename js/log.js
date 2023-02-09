window.onload=function login() {
    let nombre=document.getElementById("floatingInputName").value;
    let email=document.getElementById("floatingInputEmail").value;
    let contra=document.getElementById("floatingInputPassword").value;
    localStorage.setItem("email",email);
    localStorage.setItem("contra",contra);
    localStorage.setItem("nombre",nombre);
}