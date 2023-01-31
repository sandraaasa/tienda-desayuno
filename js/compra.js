
window.onload = cargar;
function cargar(){
    
    fetch("datos.json")
        .then (respuesta => respuesta.json())
        .then (json => cargarJSON(json))
        .catch(e => alert(`Error: ${e}`));
}
function cargarJSON(json){   
    document.getElementById("nombre").innerHTML+=json["@usuarios"][0].user;
} 