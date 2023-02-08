
window.onload = cargar;
function cargar() {
    
}
function cargarJSON(json){   
    document.getElementById("nombre").innerHTML+=json["@usuarios"][0].user;
} 