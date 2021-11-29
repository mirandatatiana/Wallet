#Proyecto AhorrADAs#

##Descripcion##
Este proyecto es un controlador de gastos, permite llevar un registro de los gastos realizados y de los ingresos obtenidos.

###Tecnologias Usadas###
    - HTML5
    - BULMA.IO
    - JAVASCRIPT

###Funcionalidades principales###
- agregar, editar y eliminar operaciones
- agregar, editar y eliminar categorías
Cada operación debe CUENTA con:
- Descripción
- Monto
- Tipo de operación (gasto o ganancia)
- Categoría a la que pertenece
- Fecha de realización
Cada categoría debe CUENTA con un nombre
- Al eliminar una categoría, se deben eliminar todas las operaciones asociadas a ella
Se PUEDE filtrar las operaciones realizadas por:
- Tipo de operación (gasto, ganancia o ambas)
- Categoría a la que pertenece (una en específico o cualquiera)
- Fecha de realización (a partir de la fecha seleccionada)
Se PUEDE ordernar las operaciones realizadas por:
- Fecha de realización (más y menos reciente)
- Monto (mayor y menor)
- Descripción (en orden alfabético creciente y decreciente)
Se PUEDE obtener los siguientes reportes:
- Un resumen con:
 - Categoría con mayor ganancia
 - Categoría con mayor gasto
 - Categoría con mayor balance
 - Mes con mayor ganancia
 - Mes con mayor gasto
 - Totales (gastos, ganancias y balances) por categoría
 - Totales (gastos, ganancias y balances) por mes
Se guardan los datos en el almacenamiento local del navegador