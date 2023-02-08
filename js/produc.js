window.onload=  function cargar() {
    fetch("../datos.json")
        .then (respuesta => respuesta.json())
        .then (json => cargarJSON(json))
        .then( productos => mas() )
        .catch(e => alert(e));
}
function cargarJSON( json ) {
    let content = document.getElementById("contenedor");
    
    for (let i = 0; i < json.length; i++) {
        
        
        content.innerHTML+="<div class='col'>"
                                +"<div class='card shadow-sm'>"
                                    +"<h3 class='card-header'>"+json[i].nombre+"</h3>"
                                    +"<img src='../"+json[i].img+"' alt='"+json[i].id+"' width='100%' >"
                                        +"<div class='card-body'>"
                                            +"<h5 class='card-title'>Ingredientes</h5>"
                                            +"<div class='card-text'>"
                                                +"<ul id='ing'>"+listaIngr(json[i])+"</ul>"
                                            +"</div>"
                                            +"<div class='d-flex justify-content-between align-items-center'>"
                                                +"<div class='btn-group'>"
                                                    +"<button type='button' class='btn btn-sm btn-outline-secondary fav'><img src='../img/svg/heart.svg' alt='fav'></button>"
                                                    +"<button type='button' class='btn btn-sm btn-outline-secondary buy'> <img src='../img/svg/bag-plus.svg' alt='buy'></button>"
                                                +"</div>"
                                            +"</div>"
                                        +"</div>"
                                +"</div>"
                            +"</div>";
    }
}

function listaIngr(json) {
    let ing="";
    
        const nombres= Object.values(json.ingredientes);
        for (let j = 0; j < json.ingredientes.length; j++) {
            
            if (Array.isArray(json.ingredientes[j])==true) {
                ing+="<li>opciones <ul>";
                for (let i = 0; i < json.ingredientes[j].length; i++) {
                    ing+="<li>"+json.ingredientes[j][i]+"</li>";
                }
                ing+="</ul></li>";
            }else{
                ing+="<li>"+json.ingredientes[j]+"</li>";
            }
            
        }
        
    return ing;
}
function mas() {
    const fav = document.getElementsByClassName("fav");
    
    for (let i = 0; i < fav.length; i++) {
        fav[i].addEventListener("click", ()=>{
            if (fav[i].firstElementChild.src.includes("fill")) {
                fav[i].firstElementChild.src="../img/svg/heart.svg";
            }else{
                fav[i].firstElementChild.src="../img/svg/heart-fill.svg";
            }
            
        });
    }
    const buy = document.getElementsByClassName("buy");
    for (let i = 0; i < buy.length; i++) {
        buy[i].addEventListener("click", ()=>{
            if (buy[i].firstElementChild.src.includes("fill")) {
                buy[i].firstElementChild.src="../img/svg/bag-plus.svg";
            }else{
                buy[i].firstElementChild.src="../img/svg/bag-plus-fill.svg";
            }
            
        });
    }
}