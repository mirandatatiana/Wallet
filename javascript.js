const navBalance = document.querySelector(".pagina-principal-boton")
const navCategorias = document.querySelector(".boton-categorias")
const navReportes = document.querySelector("#reportes")
const navNuevasOperaciones = document.querySelector(".nuevas-operaciones")

navBalance.onclick = () => {
    navCategorias.style.display = "none";
    navReportes.style.display = "none";
    navNuevasOperaciones.style.display = "none";

}

navCategorias.onclick = () => {
    navReportes.style.display = "none";
    navNuevasOperaciones.style.display = "none";
    navBalance.style.display = "none";
}

navReportes.onclick = () => {
    navNuevasOperaciones.style.display = "none";
    navBalance.style.display = "none";
    navCategorias.style.display = "none";
}
navNuevasOperaciones.onclick = () => {
    navBalance.style.display = "none";
    navCategorias.style.display = "none";
    navReportes.style.display = "none";
}