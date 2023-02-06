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
}