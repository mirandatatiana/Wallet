//Navegacion de la pagina
const navBalanceboton = document.querySelector(".pagina-principal-boton")
const navCategoriasboton = document.querySelector(".boton-categorias")
const navReportesboton = document.querySelector(".boton-reportes")
const navNuevasOperacionesboton = document.querySelector("#boton-nuevas-operaciones")
const balancesection = document.querySelector("#pagina-principal")
const categoriasection = document.querySelector("#categorias")
const reportessection = document.querySelector("#reportes")
const nuevasoperacionessection = document.querySelector("#nuevas-operaciones")
//InnerHTML
const sinResultadosBackgruond = document.getElementById("sin-resultados-operaciones")

//sector generar nueva opreacion
const descripcionDeOperacion = document.getElementById("descripcion-operacion");
const tipoDeOperacion = document.getElementById("tipo-de-operacion");
const montoOperacion = document.getElementById("monto-operacion");
const categoriaDeOperacion = document.getElementById("categoria-de-operacion");
const dateOperacion = document.getElementById("date-operacion");
const botonSubmitOperacion = document.getElementById("boton-submit-operacion");

//generar el obj de nueva operacion
const tomarInfoDeOperacion = () => {
    var operacion = {};
    operacion.desripcion = descripcionDeOperacion.value;
    operacion.tipo = tipoDeOperacion.value;
    operacion.monto = montoOperacion.value;
    operacion.categoria = categoriaDeOperacion.value;
    operacion.fecha = dateOperacion.value;
    return operacion;
}

const actualizarListasDelLocalStorage = (arrayObj, callback, nomLista) =>{
    //operacionesRealizadas.push(tomarInfoDeOperacion());
    arrayObj.push(callback);    
    const operacionesAJSON = JSON.stringify(arrayObj);
    localStorage.setItem(nomLista, operacionesAJSON);
}
const tomarInfoDelLocalStorage = (nomLista) =>{
    const listaActualizada = localStorage.getItem(nomLista);
    const listaActualizadaJS = JSON.parse(listaActualizada);
    if(listaActualizadaJS === null){
        return [];
    }else {
        return listaActualizadaJS;
    }
    
}
// mostrar operaciones realizadas en el html
// let acc = ""
// const agregarOperacionesHTML = () => {
//     const agregarOperaciones = actualizarListaDeOperaciones();
//     const lista = document.getElementById("operaciones-guardadas");

//     const operacionesString = agregarOperaciones.map((acc, elemento, index) => {
//         return acc = acc + `<div> ${acc.desripcion} </div>
//         <div> ${acc.monto} </div>
//         <div> ${acc.categoria} </div>
//         <div> ${acc.fecha} </div>c
//         `
//     }, "");
//     lista.innerHTML = operacionesString;
// }

const operacionesEnSistema = () => {
    sinResultadosBackgruond.classList.add("ocultar")
    nuevasoperacionessection.classList.add("ocultar")
    balancesection.classList.remove("ocultar");
}
//sector filtro de operaciones 
const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroFecha = document.getElementById("filtro-fecha");
const modeloDeOrden = document.getElementById("modelo-de-orden");

//sector balance
const gastoBalance = document.getElementById("gasto-balance");
const gananciaBalance = document.getElementById("ganancia-balance");
const totalBalance = document.getElementById("total-balance");

//filtrar los montos por ganancia o gasto
const filtroDeTipoDeOperacion = (arrayObj, condicion) => {
    if (condicion === "ganancia"){
        const ganancias = arrayObj.filter(function (obj) {
        return obj.tipo === "ganancia";
    });
    return ganancias;
    }
    if (condicion === "gasto"){
        const gastos = arrayObj.filter(function (obj) {
        return obj.tipo === "gasto";
    });
    return gastos;
    }
    if (condicion === "todos"){
        return arrayObj;
    }
}

//suma de montos para el balance 
const sumaDeMontos = (arrayObj) => {
    if(arrayObj === undefined){
        return 0;
    }
    const total = arrayObj.reduce(function (acc, elemento) {
        return acc + Number(elemento.monto);
    }, 0);
       return total; 
}

//funcion para cambio de numeros en estados de ganacia, gasto y total.
const actualizacionDatosDeBalance = (arrayObj) => {
    //filtro los valores de tipo ganacia 
    const ganancias = filtroDeTipoDeOperacion(arrayObj, "ganancia");
    const gastos = filtroDeTipoDeOperacion(arrayObj, "gasto");

    //se suman los montos y lo actualizamos en el html
    gananciaBalance.innerHTML = sumaDeMontos(ganancias);
    gastoBalance.innerHTML = sumaDeMontos(gastos);

    //actualiza el total de balance
    const montoTotalBalance = sumaDeMontos(ganancias) - sumaDeMontos(gastos);
    cambiarColorSegunGananciaOGasto(montoTotalBalance,totalBalance);
    totalBalance.innerHTML = montoTotalBalance;
}

const cambiarColorSegunGananciaOGasto = (monto, objetoACambiar) =>{
    if(monto > 0){
        objetoACambiar.classList.remove("has-text-danger");
        objetoACambiar.classList.add("has-text-success");
    }
    if(monto < 0){
        objetoACambiar.classList.remove("has-text-success");
        objetoACambiar.classList.add("has-text-danger");     
    }
}
//sector generar nueva categoria
const inputCrearCategoria = document.getElementById("input-crear-categoria");
const botonCrearCategoria = document.getElementById("boton-crear-categoria");

//funcionalidad de generacion de nuevas categorias

const generarNuevaCategoria = () =>{
    const categoria = {};
    categoria.categoria = inputCrearCategoria.value;
    return categoria;
}

//navegacion
navBalanceboton.onclick = () => {
    categoriasection.style.display = "none";
    reportessection.style.display = "none";
    nuevasoperacionessection.style.display = "none";
    balancesection.style.display = "block";

}

navCategoriasboton.onclick = () => {
    balancesection.style.display = "none";
    nuevasoperacionessection.style.display = "none";
    balancesection.style.display = "none";
    categoriasection.style.display = "block";
}

navReportesboton.onclick = () => {
    nuevasoperacionessection.style.display = "none";
    balancesection.style.display = "none";
    categoriasection.style.display = "none";
    reportessection.style.display = "block";

}
navNuevasOperacionesboton.onclick = () => {
    balancesection.style.display = "none";
    categoriasection.style.display = "none";
    reportessection.style.display = "none";
    nuevasoperacionessection.style.display = "block";
}

const operacionesRealizadas = tomarInfoDelLocalStorage('operacionesRealizadas');
actualizacionDatosDeBalance(operacionesRealizadas);
botonSubmitOperacion.onclick = () => {

    // tomarInfoDeOperacion()
    // //actualizarListaDeOperaciones()
    // agregarOperacionesHTML()
    // operacionesEnSistema()
    // sinResultadosBackgruond.style.display = "none"
    // nuevasoperacionessection.style.display = "none"
    // balancesection.style.display = "block";

    actualizarListasDelLocalStorage(operacionesRealizadas, tomarInfoDeOperacion(),'operacionesRealizadas');
    actualizacionDatosDeBalance(operacionesRealizadas);
}

const arrayCategorias = tomarInfoDelLocalStorage('categoriasAñadidas');
botonCrearCategoria.onclick = () =>{
    actualizarListasDelLocalStorage(arrayCategorias, generarNuevaCategoria(),'categoriasAñadidas');
}
filtroTipo.onchange = () =>{
  const tipo = filtroDeTipoDeOperacion(operacionesRealizadas, filtroTipo.value)
  console.log(tipo)
} 
