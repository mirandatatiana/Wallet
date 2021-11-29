//Navegacion de la pagina
const botonInicio = document.getElementById("boton-inicio");
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
const nuevaOperacionNuevaSeccion = document.querySelector(".operaciones-nuevas")

//sector generar nueva opreacion
const descripcionDeOperacion = document.getElementById("descripcion-operacion");
const tipoDeOperacion = document.getElementById("tipo-de-operacion");
const montoOperacion = document.getElementById("monto-operacion");
const categoriaDeOperacion = document.querySelector(".categoria-de-operacion");
const dateOperacion = document.getElementById("date-operacion");
const botonSubmitOperacion = document.getElementById("boton-submit-operacion");


//filtros para las opreaciones realizadas
const ocultarFiltros = document.getElementById("ocultar-filtros");
const filtros = document.getElementById("filtros");
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
const botonEditarCategoria = document.querySelectorAll(".boton-editar-categoria");
const botonesEliminarCategoria = document.querySelectorAll(".boton-eliminar-categoria");

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
        if (nomLista === 'categoriasAñadidas') {
            return [{ categoria: "todas" },
            { categoria: "comidas" },
            { categoria: "servicios" },
            { categoria: "salidas" },
            { categoria: "educacion" },
            { categoria: "transporte" },
            { categoria: "trabajo" }];
        }
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


    lista.innerHTML = ` <div class="columns has-text-weight-semibold is-hidden-mobile" id="operaciones-filtro">
    <div class="column is-3">Descripcion</div>
    <div class="column is-3">Categoria</div>
    <div class="column is-2 has-text-right">Fecha</div>
    <div class="column is-2 has-text-right">Monton</div>
    <div class="column is-2 has-text-right">Acciones</div>
</div>  ` + operacionesString

}

//Pagina de Categorias
const categoriasCreadas = document.querySelector(".categorias-creadas")

const agregarCategoriasHTML = (arrayObj) => {
    const agregarCategorias = arrayObj

    const categoriasString = agregarCategorias.reduce((acc, elemento) => {
        return acc = acc + `
        <div class="columns">
            <div class="column">
                <span class="tag is-primary is-light"> ${elemento.categoria} </span>
            </div>
            <div>
                <p class="column">
                    <a class="mr-4 is-size-7 boton-editar-categoria" >Editar</a>
                    <a class="boton-eliminar-categoria is-size-7" > Eliminar </a>
                </p>
            </div>
        </div>
        `
    }, "");

    const selectDeCategoria = agregarCategorias.reduce((acc, elemento) => {
        return acc = acc + `<option id="catego" value="${elemento.categoria}">${elemento.categoria}</option>`
    }, "");
    categoriasCreadas.innerHTML = categoriasString;
    filtroCategoria.innerHTML = `
    <option value = "Comida"> Comida </option>
    <option value = "Servicio"> Servicio </option>
    <option value = "Salidas"> Salidas </option>
    <option value = "Transporte"> Transporte </option>
    <option value = "Trabajo"> Trabajo </option>

    ` + selectDeCategoria;
    categoriaDeOperacion.innerHTML = `
   <option value = "Comida"> Comida </option>
   <option value = "Servicio"> Servicio </option>
   <option value = "Salidas"> Salidas </option>
   <option value = "Transporte"> Transporte </option>
   <option value = "Trabajo"> Trabajo </option>
   ` + selectDeCategoria

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
    if (condicion === "todo") {
        return arrayObj;
    }
}

const filtroDeCategoriaDeOperacion = (arrayObj, condicion) => {
    const operacionesXCategoria = arrayObj.filter((operacion) => {
        if (operacion.categoria === condicion) {
            return operacion;
        }
    });
    return operacionesXCategoria;
}

const mayorQue = (arrayObj) => {
    var elementoMayor = arrayObj[0];
    arrayObj.forEach((elemento) => {
        if (elemento.monto > elementoMayor.monto) {
            elementoMayor = elemento;
        }

    });
    return elementoMayor;
}
const menorQue = (arrayObj) => {
    var elementoMayor = arrayObj[0];
    arrayObj.forEach((elemento) => {
        if (elemento.monto < elementoMayor.monto) {
            elementoMayor = elemento;
        }
    });
    return elementoMayor;
}
const reporteGeneral = [];
const resumenReporte = (arrayObj, condicion, callback, descripcion) => {
    var operacion = {};
    const lista = filtroDeTipoDeOperacion(arrayObj, condicion);
    if (condicion === "todos") {

    }
    const valor = callback(lista);
    if (valor !== undefined) {
        operacion.descripcion = descripcion;
        operacion.categoria = valor.categoria;
        operacion.mayorGanancia = valor.monto;
        reporteGeneral.push(operacion);
    }
}
const ordenarCategorias = (arrayObj) => {
    arrayObj.sort((categoria1, categoria2) => {
        if (categoria1.categoria < categoria2.categoria) {
            return -1;
        }
        if (categoria1.categoria > categoria2.categoria) {
            return 1
        }
        return 0;
    });
}

const constadorCtaegoriasUtilizadas = () => {
    const acumulador = 0;
    operacionesRealizadas.forEach((elemento) => {
        if (elementoComparacion.categoria !== elemento.categoria) {
            acumulador++;
        }
        elementoComparacion = elemento;
    });
    return acumulador;
}

const totalXCategoria = () => {
    ordenarCategorias(lista);
    var operacion = {};
    const cantidadCategoriasUtilizadas = constadorCtaegoriasUtilizadas();
    for (let i = 0; i < cantidadCategoriasUtilizadas; i++) {
        const elementoComparacion = lista[0];
        const elementosCategoria = lista.filter((elemento) => {
            if (elementoComparacion.categoria === elemento.categoria) {
                if (elemento.tipo === "gasto") {
                    totalGasto += Number(elemento.monto);
                }
                if (elemento.tipo === "ganancia") {
                    totalGanancia += Number(elemento.monto);
                }
                totalXCategoria = totalGanancia - totalGasto;
                elementoComparacion = elemento;
                lista.shift();
                return elemento;
            }
        });
    }
    operacion.descripcion = "Categoria con mayor balance";
    operacion.categoria = valor.categoria;
    operacion.mayorGanancia = valor.monto;
    reporteGeneral.push(operacion);
}

const totalXMes = () => {

}
const filtroPorFecha = (arrayObj) => {
    const operacionesXFecha = arrayObj.map((operacion) => {
        const operacionUtilizada = operacion;
        operacionUtilizada.fecha = new Date(operacion.fecha).toLocaleDateString();
        return operacionUtilizada;
    });
    return operacionesXFecha;
}

const eliminarObjetoDeArray = (arrayObj, id) => {
    arrayObj.splice(id, 1);
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

const filtroGeneral = (arrayObj) => {
    const primerFiltro = filtroDeTipoDeOperacion(arrayObj, filtroTipo.value);
    const segundoFiltro = filtroDeCategoriaDeOperacion(primerFiltro, filtroCategoria.value);
    segundoFiltro.sort((elemento1, elemento2) => {
        return new Date(elemento1.fecha) - new Date(elemento2.fecha)
    })
    const mostrar = filtroPorFecha(segundoFiltro);
    agregarOperacionesHTML(mostrar);
    return mostrar;
}
//El estado de la pagina al entrar
balancesection.style.display = "block";
categoriasection.style.display = "none";
sinResultadosBackgruond.style.display = "none";
reportessection.style.display = "none";
nuevaOperacionNuevaSeccion.style.display = "none";
//Funcion para redirigir
const funcionSegunElementosBotonNav = (cat, repor, nuevaO, balance) => {
    categoriasection.style.display = cat;
    reportessection.style.display = repor;
    nuevaOperacionNuevaSeccion.style.display = nuevaO;
    balancesection.style.display = balance;
}

//mostrar imagen de que no se encuentran resultados 
// const operacionesNoEncontradas = (mostrar) => {
//     if (mostrar === []) {
//         const parteHTML = document.getElementById("operaciones-filtro");
//         sinResultadosBackgruond.style.display = "block";
//         parteHTML.classList.add = "is-hidden";
//     }
// }

//actualizamos html de pagina
//balance
const operacionesRealizadas = tomarInfoDelLocalStorage('operacionesRealizadas');
actualizacionDatosDeBalance(operacionesRealizadas);
agregarOperacionesHTML(operacionesRealizadas);
//lista igual a operacionesRealizadas para utilizarla en las funciones de reporte 
const lista = operacionesRealizadas;
//categorias
const arrayCategorias = tomarInfoDelLocalStorage('categoriasAñadidas');
agregarCategoriasHTML(arrayCategorias);
resumenReporte(operacionesRealizadas, "ganancia", mayorQue, "Categoria con mayor ganancia");
resumenReporte(operacionesRealizadas, "gasto", menorQue, "Categoria con mayor gasto");

//navegacion
//nose por qué no me funciona si uso este formato de funcion navNuevasOperacionesboton.onclick = funcionSegunElementosBotonNav( "none", "none", "block", "none"); 
botonInicio.onclick = () => {
    funcionSegunElementosBotonNav("none", "none", "none", "block");
}
navBalanceboton.onclick = () => {
    funcionSegunElementosBotonNav("none", "none", "none", "block");
}
navCategoriasboton.onclick = () => {
    funcionSegunElementosBotonNav("block", "none", "none", "none");
}
navReportesboton.onclick = () => {
    funcionSegunElementosBotonNav("none", "block", "none", "none");
}
navNuevasOperacionesboton.onclick = () => {
    funcionSegunElementosBotonNav("none", "none", "block", "none");
}
//Funcion de enviar formulario de operaciones
botonSubmitOperacion.onclick = () => {
    sinResultadosBackgruond.style.display = "none";

    funcionSegunElementosBotonNav("none", "none", "none", "block");
    actualizarListasDelLocalStorage(operacionesRealizadas, tomarInfoDeOperacion(), 'operacionesRealizadas');
    agregarOperacionesHTML(operacionesRealizadas)
    actualizacionDatosDeBalance(operacionesRealizadas);
    descripcionDeOperacion.value = "";
    tipoDeOperacion.value = "";
    montoOperacion.value = "";
    categoriaDeOperacion.value = "";
    dateOperacion.value = "";
}
//Funcion de enviar formulario de crear categorias
botonCrearCategoria.onclick = () => {
    actualizarListasDelLocalStorage(arrayCategorias, generarNuevaCategoria(), 'categoriasAñadidas');
    agregarCategoriasHTML(arrayCategorias);
    inputCrearCategoria.value = "";
}

//eventos de box de filtros
ocultarFiltros.onclick = () => {
    filtros.classList.toggle("is-hidden");
}
filtroTipo.onchange = () => {
    operacionesNoEncontradas(filtroGeneral(operacionesRealizadas));
}
filtroCategoria.onchange = () => {
    filtroGeneral(operacionesRealizadas);
}
filtroFecha.onchange = () => {
    filtroGeneral(operacionesRealizadas);
}
console.log(botonesEliminarCategoria)
modeloDeOrden.onchange = () => {
    //no logre hacer una funcion unificada paa usarla todas las veces segun filtro modeloDeOrden
    if (modeloDeOrden.value === "mayormonto") {
        operacionesRealizadas.sort((categoria1, categoria2) => {
            return categoria1.monto - categoria2.monto;
        });
        filtroGeneral(operacionesRealizadas);
    }
    if (modeloDeOrden.value === "menormonto") {
        operacionesRealizadas.sort((categoria1, categoria2) => {
            return categoria1.monto - categoria2.monto;
        });
        operacionesRealizadas.reverse();
        filtroGeneral(operacionesRealizadas);
    }
    if (modeloDeOrden.value === "masreciente") {
        operacionesRealizadas.sort((categoria1, categoria2) => {
            return categoria1.fecha - categoria2.fecha;
        });
        filtroGeneral(operacionesRealizadas);
    }
    if (modeloDeOrden.value === "menosreciente") {
        operacionesRealizadas.sort((categoria1, categoria2) => {
            return categoria1.fecha - categoria2.fecha;
        });
        operacionesRealizadas.reverse();
        filtroGeneral(operacionesRealizadas);
    }
    if (modeloDeOrden.value === "az") {
        operacionesRealizadas.sort((categoria1, categoria2) => {
            return categoria1.descripcion - categoria2.descripcion;
        });
        filtroGeneral(operacionesRealizadas);
    }
    if (modeloDeOrden.value === "za") {
        operacionesRealizadas.sort((categoria1, categoria2) => {
            return categoria1.descripcion - categoria2.descripcion;
        });
        operacionesRealizadas.reverse();
        filtroGeneral(operacionesRealizadas);
    }
}
for (let i = 0; i < botonesEliminarCategoria.length; i++) {
    botonesEliminarCategoria[i].onclick = () => {
        console.log("jo")
        const id = botonesEliminarCategoria[i].id;
        eliminarObjetoDeArray(arrayCategorias, botonesEliminarCategoria[i].id);
        const operacionesABorrar = filtroDeCategoriaDeOperacion(operacionesRealizadas, arrayCategorias[id].categoria);
        operacionesRealizadas.foreach((elemento, i) => {
            if (operacionesABorrar[i].categoria === elemento.categoria) {
                operacionesRealizadas.splice(i, 1);
            }
        });
        actualizarListasDelLocalStorage(operacionesRealizadas, tomarInfoDeOperacion(), 'operacionesRealizadas');
        actualizarListasDelLocalStorage(arrayCategorias, generarNuevaCategoria(), 'categoriasAñadidas');
        agregarCategoriasHTML(arrayCategorias);
    }
}
    //actualizarListasDelLocalStorage(tomarInfoDeOperacion(), 'operacionesRealizadas');
//agregarOperacionesHTML(actualizarListasDelLocalStorage(tomarInfoDeOperacion(), 'operacionesRealizadas'));