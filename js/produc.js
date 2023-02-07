window.onload=function () {
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
    cargar();

}
function cargar() {
    fetch("../datos.json")
        .then (respuesta => respuesta.json())
        .then (json => cargarJSON(json))
        .catch(e => alert(e));
}
function cargarJSON( json ) {
    let content = document.getElementById("contenedor");
    
    for (let i = 0; i < json.length; i++) {
        content.innerHTML+='<div class="col">'
                           + '<div class="card shadow-sm">';
        content.innerHTML+='<img src="../'+json[i].img+'" alt="'+json[i].id+'" width="100%" >';
        content.innerHTML+='<div class="card-body">'
                            +'<h5 class="card-tittle">Ingredientes</h5>'
                            +'<div class="card-text">'
                            +'<ul>';
        for (let j = 0; j < json[i].ingredientes.length; j++) {
            content.innerHTML+="<li>"+json[i].ingredientes[j]+"</li>";
        }
        content.innerHTML+='</ul> </div>'
                            +'<div class="d-flex justify-content-between align-items-center">'
                                +'<div class="btn-group">'
                                    +'<button type="button" class="btn btn-sm btn-outline-secondary fav"><img src="../img/svg/heart.svg" alt="fav"></button>'
                                    +'<button type="button" class="btn btn-sm btn-outline-secondary buy"> <img src="../img/svg/bag-plus.svg" alt="buy"></button>'
                                +'</div>'
                            +'</div>'
                            +'</div></div></div>';


        
        
    }
}
