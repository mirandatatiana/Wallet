
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


//filtros para las opreaciones realizadas
const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroFecha = document.getElementById("filtro-fecha");
const modeloDeOrden = document.getElementById("modelo-de-orden");

//sector balance
const gastoBalance = document.getElementById("gasto-balance");
const gananciaBalance = document.getElementById("ganancia-balance");
const totalBalance = document.getElementById("total-balance");

//sector generar nueva categoria
const inputCrearCategoria = document.getElementById("input-crear-categoria");
const botonCrearCategoria = document.getElementById("boton-crear-categoria");

//actualizacion de datos en el local storage
const actualizarListasDelLocalStorage = (arrayObj, callback, nomLista) => {
    arrayObj.push(callback);
    const operacionesAJSON = JSON.stringify(arrayObj);
    localStorage.setItem(nomLista, operacionesAJSON);
}
const tomarInfoDelLocalStorage = (nomLista) => {
    const listaActualizada = localStorage.getItem(nomLista);
    const listaActualizadaJS = JSON.parse(listaActualizada);
    if (listaActualizadaJS === null) {
        return [];
    } else {
        return listaActualizadaJS;
    }

}

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

// mostrar operaciones realizadas en el html
let acc = ""
const agregarOperacionesHTML = (arrayObj) => {
    const agregarOperaciones = arrayObj
    const lista = document.getElementById("operaciones-guardadas")
    const listaDeReportes = document.querySelector(".lista-reporte")

    const operacionesString = agregarOperaciones.reduce((acc, elemento, index) => {
        return acc = acc + `
            <div class="columns is-multiline is-mobile is-vcentered">
                <div class="column is-3-tablet is-6-mobile">
                    <h3 class="has-text-weight-semibold">${elemento.desripcion}
                    </h3>
                </div>
                <div class="column is-3-tablet is-6-mobile has-text-right-mobile">
                    <span class="tag is-primary is-light"> ${elemento.categoria} </span>
                </div>
                <div class="column is-2-tablet has-text-gray is-hidden-mobile has-text-right-tablet">
                    ${elemento.fecha}
                </div>
            
                <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile">
                    ${elemento.monto}
                </div>
                <div class="column is-2-tablet is-6-mobile has-text-right">
                    <p class="is-fullwidht">
                        <a href="#" class="mr-3 is-size-7">Editarr</a>
                        <a href="#" class="is-size-7"> Eliminar </a>
                    </p>
                </div>
            </div>
        `
    }, "");
    lista.innerHTML = operacionesString
    // listaDeReportes.innerHTML = `

    // `
}

//Pagina de Categorias
const categoriasCreadas = document.querySelector(".categorias-creadas")

const agregarCategoriasHTML = (arrayObj) => {
    const agregarOperaciones = arrayObj

    const operacionesString = agregarOperaciones.reduce((acc, elemento) => {
        return acc = acc + `
        <div class="columns">
            <div class="column">
                <span class="tag is-primary is-light"> ${elemento.categoria} </span>
            </div>
            <div>
                <p class="column">
                    <a href="#" class="mr-4 is-size-7">Editar</a>
                    <a href="#" class="is-size-7"> Eliminar </a>
                </p>
            </div>
        </div>
        `
    }, "");
    categoriasCreadas.innerHTML = operacionesString;
    // listaDeReportes.innerHTML = `

    // `
}


//filtrar los montos por ganancia o gasto
const filtroDeTipoDeOperacion = (arrayObj, condicion) => {
    if (condicion === "ganancia") {
        const ganancias = arrayObj.filter(function (obj) {
            return obj.tipo === "ganancia";
        });
        return ganancias;
    }
    if (condicion === "gasto") {
        const gastos = arrayObj.filter(function (obj) {
            return obj.tipo === "gasto";
        });
        return gastos;
    }
    if(condicion === "todo"){
        return arrayObj;
    }
}

const filtroDeCategoriaDeOperacion = (arrayObj, condicion) =>{
    const operacionesXCategoria = arrayObj.filter((operacion) => {
        if (operacion.categoria === condicion) {
          return operacion;
        }
      });
      return operacionesXCategoria;
}

const mayorQue = (arrayObj, condicion) =>{
    var elementoMayor = arrayObj[0];
    arrayObj.forEach((elemento)=>{
        if(elemento.monto > elementoMayor.monto){
            elementoMayor = elemento;
        }
        
    });
    return elementoMayor;
}
const menorQue = (arrayObj, condicion) =>{
    var elementoMayor = arrayObj[0];
    arrayObj.forEach((elemento)=>{
        if(elemento.monto < elementoMayor.monto){
            elementoMayor = elemento;
        }
    });
    return elementoMayor;
}
const reporteGeneral = [];
const reporte = (arrayObj, condicion, callback, descripcion) =>{
    const lista = filtroDeTipoDeOperacion(arrayObj, condicion);
    const valor = callback(lista);
    console.log(valor)
    if(valor !== undefined){
        reporteGeneral.descripcion = descripcion;
        reporteGeneral.categoria = valor.categoria;
        reporteGeneral.mayorGanancia = valor.monto;  
    }

}

const filtroPorFecha = (arrayObj, condicion) =>{
    const operacionesXFecha = arrayObj.filter((operacion) => {
        if (operacion.fecha === condicion) {
          return operacion;
        }
      });
      return operacionesXFecha;
}



//suma de montos para el balance 
const sumaDeMontos = (arrayObj) => {
    if (arrayObj === undefined) {
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
    cambiarColorSegunGananciaOGasto(montoTotalBalance, totalBalance);
    totalBalance.innerHTML = montoTotalBalance;
}

const cambiarColorSegunGananciaOGasto = (monto, objetoACambiar) => {
    if (monto > 0) {
        objetoACambiar.classList.remove("has-text-danger");
        objetoACambiar.classList.add("has-text-success");
    }
    if (monto < 0) {
        objetoACambiar.classList.remove("has-text-success");
        objetoACambiar.classList.add("has-text-danger");
    }
}

//funcionalidad de generacion de nuevas categorias
const generarNuevaCategoria = () => {
    const categoria = {};
    categoria.categoria = inputCrearCategoria.value;
    return categoria;
}

const filtroGeneral = (arrayObj) =>{
    const primerFiltro = filtroDeTipoDeOperacion(operacionesRealizadas, filtroTipo.value);
    const segundoFiltro = filtroDeCategoriaDeOperacion(primerFiltro, filtroCategoria.value);
    const mostrar = filtroPorFecha(segundoFiltro, filtroFecha.value);
    agregarOperacionesHTML(mostrar);
    return mostrar;
}
const funcionSegunElementosBotonNav = (cat, repor, nuevaO, balance) =>{
    categoriasection.classList.add = cat;
    reportessection.style.display = repor;
    nuevasoperacionessection.style.display = nuevaO;
    balancesection.style.display = balance;
}

const operacionesNoEncontradas = (mostrar) =>{
    if(mostrar === []){
        const parteHTML = document.getElementById("operaciones-filtro");
        sinResultadosBackgruond.style.display = "block";
        parteHTML.classList.add = "is-hidden";
    }
}

//actualizamos html de pagina
    //balance
const operacionesRealizadas = tomarInfoDelLocalStorage('operacionesRealizadas');
actualizacionDatosDeBalance(operacionesRealizadas);
agregarOperacionesHTML(operacionesRealizadas);
    //categorias
const arrayCategorias = tomarInfoDelLocalStorage('categoriasAñadidas');
agregarCategoriasHTML(arrayCategorias);
reporte (operacionesRealizadas, "ganancia", mayorQue, "Categoria con mayor ganancia");
reporte (operacionesRealizadas, "gasto", menorQue, "Categoria con mayor ganancia");
console.log(reporteGeneral)

//navegacion
    //nose por qué no me funciona si uso este formato de funcion navNuevasOperacionesboton.onclick = funcionSegunElementosBotonNav( "none", "none", "block", "none"); 
navBalanceboton.onclick = () => {  
    funcionSegunElementosBotonNav("none", "none", "none", "block");
}
navCategoriasboton.onclick = () => { 
    funcionSegunElementosBotonNav("block", "none", "none", "none");
}
navReportesboton.onclick = () => {  
    funcionSegunElementosBotonNav( "none", "block", "none", "none");
}
navNuevasOperacionesboton.onclick = () => { 
    funcionSegunElementosBotonNav( "none", "none", "block", "none");
}

botonSubmitOperacion.onclick = () => {
    sinResultadosBackgruond.style.display = "none"   
    funcionSegunElementosBotonNav("none", "none", "none", "block");
    actualizarListasDelLocalStorage(operacionesRealizadas, tomarInfoDeOperacion(), 'operacionesRealizadas');
    agregarOperacionesHTML(operacionesRealizadas)
    actualizacionDatosDeBalance(operacionesRealizadas);
}

botonCrearCategoria.onclick = () => {
    actualizarListasDelLocalStorage(arrayCategorias, generarNuevaCategoria(), 'categoriasAñadidas');
    agregarCategoriasHTML(arrayCategorias);
}

filtroTipo.onchange = () => {
    console.log(filtroGeneral(operacionesRealizadas)) 
operacionesNoEncontradas(filtroGeneral(operacionesRealizadas));   
}
filtroCategoria.onchange = filtroGeneral(operacionesRealizadas); 
filtroFecha.onchange = filtroGeneral(operacionesRealizadas);
    //actualizarListasDelLocalStorage(tomarInfoDeOperacion(), 'operacionesRealizadas');



//agregarOperacionesHTML(actualizarListasDelLocalStorage(tomarInfoDeOperacion(), 'operacionesRealizadas'));
