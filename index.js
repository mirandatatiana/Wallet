//Navegacion de la pagina
const botonInicio = document.getElementById("boton-inicio");
const navBalanceboton = document.querySelector(".pagina-principal-boton")
const navCategoriasboton = document.querySelector(".boton-categorias")
const navReportesboton = document.querySelector(".boton-reportes")
const navNuevasOperacionesboton = document.querySelector("#boton-nuevas-operaciones")
// usen camelCase: balanceSection,  categoriaSection, etc
const balancesection = document.querySelector("#pagina-principal")
const categoriasection = document.querySelector("#categorias")
const reportessection = document.querySelector("#reportes")
// esta variable se declara pero nunca se usa: mejor borrarla
const nuevasoperacionessection = document.querySelector("#nuevas-operaciones")

//InnerHTML

// ojo con los nombres: "background". Este tipo de confusiones pueden ser fuente de errores dificiles de encontrar
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
// esta variable se declara pero nunca se usa: mejor borrarla
const botonEditarCategoria = document.querySelectorAll(".boton-editar-categoria");
const botonesEliminarCategoria = document.querySelectorAll(".boton-eliminar-categoria");
// esta variable se declara pero nunca se usa: mejor borrarla
const editarCategoria = document.querySelector(".editar-categoria")

//actualizacion de datos en el local storage

// Ojo: un callback es una función que pasamos como parametro. Pasamos la función sin ejecutar, 
// y la otra función la ejecuta. por ejemplo:

// const funcion1 = (mensaje) => {
//     console.log("funcion 2")
// }

// const funcion2 = (mensaje, callback) => {
//     console.log(mensaje)
//     callback()
// }

// funcion2("hola", funcion1)

// Ustedes no estan haciendo esto. El parametro "callback" es en realidad lo que retornan otras funciones:
// en general, objetos que representan operaciones o categorias. Seria mejor llamarlo "objeto" o "elemento"
// ya que no es un callback. 


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
            // No entiendo acá por qué retornan un montón de categorías vacías. 
            // Esto hace que se vean opciones vacías en los select. 
            return [{ categoria: "todas" },
            { categoria: "" },
            { categoria: "" },
            { categoria: "" },
            { categoria: "" },
            { categoria: "" },
            { categoria: "" }];
        }
        return [];
    } else {
        return listaActualizadaJS;
    }

}

//generar el obj de nueva operacion
const tomarInfoDeOperacion = () => {
    // usen let o const, no var
    var operacion = {};
    // descripcion, no desripcion!
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

// no es necesario declarar el index si no lo usan
    const operacionesString = agregarOperaciones.reduce((acc, elemento, index) => {

     //   en el HTML que tienen aqui siempre queda de color rojo el texto del monto, 
     // a pesar de que en el modelo
    //   cuando es una ganancia aparece en verde, y rojo cuando es un gasto
    //   hagan una funcion auxiliar que reciba el tipo y retorne el color que quieren: 

    //   const aplicarColorAlMonto = (elemento) => {
    //     if (elemento.tipo === "ganancia") {
    //         return "has-text-success";
    //     }
    //     else {
    //         return "has-text-danger";
    //     }
    // }

    // y luego pueden usarla en la linea 152:
    //  <div class=`${aplicarColorAlMonto(elemento.tipo)} column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile`>
   

    // Ojo que estan diciendo "editarr" en lugar de "editar"
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


    // Monto, no monton
    lista.innerHTML = ` <div class="columns has-text-weight-semibold is-hidden-mobile" id="operaciones-filtro">
    <div class="column is-3">Descripcion</div>
    <div class="column is-3">Categoria</div>
    <div class="column is-2 has-text-right">Fecha</div>
    <div class="column is-2 has-text-right">Monton</div>
    <div class="column is-2 has-text-right">Acciones</div>
</div>  ` + operacionesString

}

//Pagina de Categorias
const categoriasCreadas = document.querySelector(".categorias-creadas");
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

    // No Logrammos que el boton editar categoria funcionen
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
//funcion box filtro
const filtroDeCategoriaDeOperacion = (arrayObj, condicion) => {
    const operacionesXCategoria = arrayObj.filter((operacion) => {
        if (operacion.categoria === condicion) {
            return operacion;
        }
    });
    return operacionesXCategoria;
}
const filtroPorFecha = (arrayObj) => {
    const operacionesXFecha = arrayObj.map((operacion) => {
        const operacionUtilizada = operacion;
        operacionUtilizada.fecha = new Date(operacion.fecha).toLocaleDateString();
        return operacionUtilizada;
    });
    return operacionesXFecha;
}

// filtro general de box de filtros
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
const totalXTipo = (arrayObj, condicion, callback, descripcion) => {
    var operacion = {};
    const lista = filtroDeTipoDeOperacion(arrayObj, condicion);
    const valor = callback(lista);
    if (valor !== undefined) {
        operacion.descripcion = descripcion;
        operacion.categoria = valor.categoria;
        operacion.mayorMonto = valor.monto;
        reporteGeneral.push(operacion);
    }
}

//ordena las categorias en ascendente, funcion para resumenReporte
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

//suma de montos enviados por parametro en general 
const sumaDeMontos = (arrayObj) => {
    if (arrayObj === undefined) {
        return 0;
    }
    const total = arrayObj.reduce(function (acc, elemento) {
        return acc + Number(elemento.monto);
    }, 0);
    return total;
}

//cuenta las categorias que se usaron en operaciones realizadas
const constadorCtaegoriasUtilizadas = () => {
    var acumulador = 0;
    var elementoComparacion = lista[0];
    operacionesRealizadas.forEach((elemento) => {
        if (elementoComparacion.categoria !== elemento.categoria) {
            acumulador++;
        }
        elementoComparacion = elemento;
    });
    return acumulador;
}

// funcion para la parte del resumen general, en el cual queriamos formar un array de obj con cada operacion pero creo que nos enroscamos mucho
// const resumenReporte = () =>{
//     totalXTipo (lista, "ganancia", mayorQue, "Categoria con mayor ganancia");
//     totalXTipo (lista, "gasto", mayorQue, "Categoria con mayor gasto");
//     totalXMes();
//     ordenarCategorias(lista);
//     var operacion = {};
//     const sumaTotal = [];
//     const cantidadCategoriasUtilizadas = constadorCtaegoriasUtilizadas();
//     for (let i = 0; i < cantidadCategoriasUtilizadas; i++) {
//         var elementoComparacion = lista[0];
//         const elementosCategoria = lista.filter((elemento)=>{
//             if(elementoComparacion.categoria === elemento.categoria){
//                 elementoComparacion = elemento;
//                 lista.shift();
//                 return elemento;
//             }
//         }); 
//         const ganancias = filtroDeTipoDeOperacion(elementosCategoria, "ganancia");
//         const gastos = filtroDeTipoDeOperacion(elementosCategoria, "gasto");
//         sumaTotal[i] = {
//             monto: sumaDeMontos(ganancias) - sumaDeMontos(gastos),
//             categoria: elementoComparacion.categoria
//         }
//     }
//     const categoriaConMayorBalance = mayorQue(sumaTotal);
//     operacion.descripcion = "Categoria con mayor balance";
//     operacion.categoria = categoriaConMayorBalance.categoria;
//     operacion.mayorGanancia = categoriaConMayorBalance.monto; 
//     reporteGeneral.push(operacion);
// }
// const meses = [0, 1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11];
// const totalXMes = () =>{
//     const infoMesMayorGanancia = {};
//     const infoMesMayorGasto = {};
//     const meses = [0, 1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11];
//     const operacionPorMes = [];
//     meses.map((mes) => {
//         operacionPorMes.push([mes]);
//     });
//     lista.map((operacion) => {
//         const fecha = new Date(operacion.fecha + "11:00:00");
//         const mes = fecha.getMonth();
//         operacionPorMes[mes].push(operacion);
//     });

//     var mesMayorGanancia = 0;
//     var mesMayorGasto = 0;
//     var mesGanancia = 0;
//     var mesGasto = 0;
//     operacionPorMes.map((array) => {
//         var ganancias = filtroDeTipoDeOperacion(array, "ganancia");
//         var gastos = filtroDeTipoDeOperacion(array, "gasto");
//         ganancias = sumaDeMontos(ganancias); 
//         gastos = sumaDeMontos(gastos);
//         if(mesMayorGanancia < ganancias){
//             mesMayorGanancia = ganancias;
//             mesGanancia = operacionPorMes[array];
//         }
//         if(mesMayorGasto < gastos){
//             mesMayorGasto = gastos;
//             mesGasto = operacionPorMes[array];
//         }
//     });
//     infoMesMayorGanancia = {
//         descripcion: "Mes con mayor ganancia",
//         categoria: array.id,
//         mayorGanancia: mesMayorGanancia 
//     }
//     infoMesMayorGasto = {
//         descripcion: "Mes con mayor gasto",
//         categoria: array.id,
//         mayorGanancia: mesMayorGasto 
//     }
//     reporteGeneral.push(infoMesMayorGanancia);
//     reporteGeneral.push(infoMesMayorGasto);
// }

//funcion para cambio de numeros en estados de ganacia, gasto y total.

// excelente esta parte del codigo
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
//cambia de color dependiendo si es gato o ganancia
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
//eliminar objetos del array de categorias
const eliminarObjetoDeArray = (arrayObj, id) => {
    arrayObj.splice(id, 1);
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
const operacionesNoEncontradas = (mostrar) => {
    if (mostrar === []) {
        const parteHTML = document.getElementById("operaciones-filtro");
        sinResultadosBackgruond.style.display = "block";
        parteHTML.classList.add("is-hidden");
    }
}

//actualizamos html de pagina
//balance html: linea 63 -linea 98
const operacionesRealizadas = tomarInfoDelLocalStorage('operacionesRealizadas');
actualizacionDatosDeBalance(operacionesRealizadas);
agregarOperacionesHTML(operacionesRealizadas);
//lista igual a operacionesRealizadas para utilizarla en las funciones de reporte 
const lista = operacionesRealizadas;
//categorias
const arrayCategorias = tomarInfoDelLocalStorage('categoriasAñadidas');
agregarCategoriasHTML(arrayCategorias);
//actualiza reporte general
//actualizarListasDelLocalStorage(reporteGeneral, resumenReporte(), 'reporteGeneral');

//navegacion html: linea15 - linea 61
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
// botonEditarCategoria.onclick = () => {
//     editarCategoria.style.display = "block"

// }





//Funcion de enviar formulario de operaciones

//eventos de box de filtros html: linea 100 - linea 169
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

//crear nueva operacion html: linea 426 - linea 502
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

//seccion de crear categoria html: linea 399 - linea 424
botonCrearCategoria.onclick = () => {
    actualizarListasDelLocalStorage(arrayCategorias, generarNuevaCategoria(), 'categoriasAñadidas');
    agregarCategoriasHTML(arrayCategorias);
    inputCrearCategoria.value = "";
}

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

//probamos con un conole.log botonEditarCategoria botonesEliminarCategoria
//pero nos nos traia los botones de editar ni de borrar

// Gracias por dejarme aclarado el problema. Quiza debamos hacer una call así se los explico mejor, pero 
// el problema es basicamente este: este codigo se ejecuta apenas carga la pagina, y en ese momento 
// los botones de editar y eliminar no existen. Solo existen una vez que se crean los botones en la funcion 
// agregarCategoriasHTML. 
// Se pone mas complicado: cada vez que creamos, editamos o eliminamos una categoria, esos botones se destruyen
// y se vuelven a crear con la funcion agregarCategoriasHTML. Asi que tendriamos que ejecutar el codigo de abajo
// cada vez que ejecutamos agregarCategoriasHTML. 
for (let i = 0; i < botonesEliminarCategoria.length; i++) {
    botonesEliminarCategoria[i].onclick = () => {
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