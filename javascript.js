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

//añadir objeto al array de operaciones
const operacionesRealizadas = [];

const actualizarListaDeOperaciones = () => {
    //deberia ir un if para saber si hay info a guardar o si solo se necesita tomar del local storage 
    operacionesRealizadas.push(tomarInfoDeOperacion());
    const operacionesAJSON = JSON.stringify(operacionesRealizadas);
    localStorage.setItem('operacionesRealizadas', operacionesAJSON);
    const listaActualizada = localStorage.getItem('operacionesRealizadas');
    const listaActualizadaJS = JSON.parse(listaActualizada);
    return listaActualizadaJS;

}
const listaActualizadaJS = actualizarListaDeOperaciones();

let acc = ""
const agregarOperacionesHTML = () => {
    const agregarOperaciones = actualizarListaDeOperaciones()
    const lista = document.getElementById("operaciones-guardadas")


    const operacionesString = agregarOperaciones.map((acc, elemento, index) => {
        return acc = acc + `<div> ${acc.desripcion} </div>
        <div> ${acc.monto} </div>
        <div> ${acc.categoria} </div>
        <div> ${acc.fecha} </div>c
        `
    }, "")
    lista.innerHTML = operacionesString
}

const operacionesEnSistema = () => {
    sinResultadosBackgruond.classList.add("ocultar")
    nuevasoperacionessection.classList.add("ocultar")
    balancesection.classList.remove("ocultar");
}


//sector balance
const gastoBalance = document.getElementById("gasto-balance");
const gananciaBalance = document.getElementById("ganancia-balance");
const totalBalance = document.getElementById("total-balance");

//filtrar los montos por ganancia o gasto
const filtroDeTipoDeOperacion = (arrayObj, condicion) => {
    if (condicion === "ganacia"){
    arrayObj.filter(function (obj) {
        return obj.tipo.value === "ganacia";
    });
    }
    if (condicion === "gasto"){
    arrayObj.filter(function (obj) {
        return obj.tipo.value === "gasto";
    });
}
}
//suma de montos para el balance 
const sumaDeMontos = (arrayObj) => {
    arrayObj.reduce(function (acc, elemento) {
        return acc + elemento.monto.value;
    }, 0);
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
    totalBalance.innerHTML = sumaDeMontos(ganancias) - sumaDeMontos(gastos);
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


botonSubmitOperacion.onclick = () => {

    tomarInfoDeOperacion()
    actualizarListaDeOperaciones()
    agregarOperacionesHTML()
    operacionesEnSistema()
    // sinResultadosBackgruond.style.display = "none"
    // nuevasoperacionessection.style.display = "none"
    // balancesection.style.display = "block";

    actualizarListaDeOperaciones();


    actualizacionDatosDeBalance(listaActualizadaJS);
}