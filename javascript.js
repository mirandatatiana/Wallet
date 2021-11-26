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


// const actualizarListaDeOperaciones = () => {
//     //deberia ir un if para saber si hay info a guardar o si solo se necesita tomar del local storage 
//     operacionesRealizadas.push(tomarInfoDeOperacion());
//     const operacionesAJSON = JSON.stringify(operacionesRealizadas);
//     localStorage.setItem('operacionesRealizadas', operacionesAJSON);
//     const listaActualizada = localStorage.getItem('operacionesRealizadas');
//     const listaActualizadaJS = JSON.parse(listaActualizada);
//     return listaActualizadaJS;
// }
//actualizacion de datos en el local storage
// const actualizarListasDelLocalStorage = (callback, nomLista) => {
//     //operacionesRealizadas.push(tomarInfoDeOperacion());
//     operacionesRealizadas.push(callback);
//     const operacionesAJSON = JSON.stringify(operacionesRealizadas);
//     localStorage.setItem(nomLista, operacionesAJSON);
// }
// const tomarInfoDelLocalStorage = (nomLista) => {
//     const listaActualizada = localStorage.getItem(nomLista);
//     const listaActualizadaJS = JSON.parse(listaActualizada);
//     return listaActualizadaJS;
// }
//actualizacion de datos en el local storage
const actualizarListasDelLocalStorage = (arrayObj, callback, nomLista) => {
    //operacionesRealizadas.push(tomarInfoDeOperacion());
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
// mostrar operaciones realizadas en el html
let acc = ""
const agregarOperacionesHTML = (arrayObj) => {
    const agregarOperaciones = arrayObj
    const lista = document.getElementById("operaciones-guardadas")
    const listaDeReportes = document.querySelector(".lista-reporte")

    const operacionesString = agregarOperaciones.reduce((acc, elemento, index) => {
        return acc = acc + `
    <div class= "columns is-multiline is-mobile is-vcentered">
          <div class= "column is-3-tablet is-6-mobile">
            <h3 class= "has-text-weight-semibold">${elemento.desripcion} 
        </h3>
          </div>
          <div class= "column is-3-tablet is-6-mobile has-text-right-mobile">
            <span class= "tag is-primary is-light"> ${elemento.categoria} </span>
    </div>
            <div class= "column is-2-tablet has-text-gray is-hidden-mobile has-text-right-tablet" >
         ${elemento.fecha}
       </div>
       
       <div class= "column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile">
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
    }, "")

    lista.innerHTML = operacionesString
    // listaDeReportes.innerHTML = `

    // `
}






//Pagina de Categorias
const categoriasCreadas = document.querySelector(".categorias-creadas")

categoriasCreadas.innerHTML = `
<div class="columns">
   <div class="column">
            <span class= "tag is-primary is-light"> Comida </span>
       </div>
<div>
   <p class="column">
   <a href="#" class="mr-4 is-size-7">Editar</a>    
   <a href="#" class="is-size-7"> Eliminar </a> 
   </p>
     </div>
     
</div>
<div class="columns">
   <div class="column">
            <span class= "tag is-primary is-light"> Servicio </span>
       </div>
<div>
   <p class="column">
   <a href="#" class="mr-4 is-size-7">Editar</a>    
   <a href="#" class="is-size-7"> Eliminar </a> 
   </p>
     </div>
     
</div>
<div class="columns">
   <div class="column">
            <span class= "tag is-primary is-light"> Salidas </span>
       </div>
<div>
   <p class="column">
   <a href="#" class="mr-4 is-size-7">Editar</a>    
   <a href="#" class="is-size-7"> Eliminar </a> 
   </p>
     </div>
</div>
<div class="columns">
   <div class="column">
            <span class= "tag is-primary is-light"> Educación </span>
       </div>
<div>
   <p class="column">
   <a href="#" class="mr-4 is-size-7">Editar</a>    
   <a href="#" class="is-size-7"> Eliminar </a> 0
   </p>
     </div>
     
</div>
<div class="columns">
   <div class="column">
            <span class= "tag is-primary is-light"> Trasnporte </span>
       </div>
<div>
   <p class="column">
   <a href="#" class="mr-4 is-size-7">Editar</a>    
   <a href="#" class="is-size-7"> Eliminar </a> 
   </p>
     </div>
     
</div>
<div class="columns">
   <div class="column">
            <span class= "tag is-primary is-light"> Trabajo </span>
       </div>
<div>
   <p class="column">
   <a href="#" class="mr-4 is-size-7">Editar</a>    
   <a href="#" class="is-size-7"> Eliminar </a> 
   </p>
     </div>
     
</div>

`
//sector balance
const gastoBalance = document.getElementById("gasto-balance");
const gananciaBalance = document.getElementById("ganancia-balance");
const totalBalance = document.getElementById("total-balance");

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
//sector generar nueva categoria
const inputCrearCategoria = document.getElementById("input-crear-categoria");
const botonCrearCategoria = document.getElementById("boton-crear-categoria");

//funcionalidad de generacion de nuevas categorias

const generarNuevaCategoria = () => {
    const categoria = {};
    categoria.categoria = inputCrearCategoria.value;
    return categoria;
}
//filtros para las opreaciones realizadas
const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroFecha = document.getElementById("filtro-fecha");
const modeloDeOrden = document.getElementById("modelo-de-orden");

filtroTipo.onchange = () =>{
    const mostrar = filtroDeTipoDeOperacion(operacionesRealizadas, filtroTipo.value);
    agregarOperacionesHTML(mostrar);
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
agregarOperacionesHTML(operacionesRealizadas);
botonSubmitOperacion.onclick = () => {

    // tomarInfoDeOperacion()
    // //actualizarListaDeOperaciones()


    // sinResultadosBackgruond.style.display = "none"
    // nuevasoperacionessection.style.display = "none"
    // balancesection.style.display = "block";

    actualizarListasDelLocalStorage(operacionesRealizadas, tomarInfoDeOperacion(), 'operacionesRealizadas');
    agregarOperacionesHTML(operacionesRealizadas)
    actualizacionDatosDeBalance(operacionesRealizadas);
}

const arrayCategorias = tomarInfoDelLocalStorage('categoriasAñadidas');
botonCrearCategoria.onclick = () => {
    actualizarListasDelLocalStorage(arrayCategorias, generarNuevaCategoria(), 'categoriasAñadidas');

    // agregarOperacionesHTML()

}

    //actualizarListasDelLocalStorage(tomarInfoDeOperacion(), 'operacionesRealizadas');



//agregarOperacionesHTML(actualizarListasDelLocalStorage(tomarInfoDeOperacion(), 'operacionesRealizadas'));
