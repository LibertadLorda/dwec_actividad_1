// Definir claves de LocalStorage
const KEY_PEDIDOS = 'pedidos';
const KEY_PIEZAS = 'piezas';

// Datos de Pedidos
let numero;
let cliente;
let fecha;
let procesado;
let servido;

// Datos de Piezas
let numeroPieza;
let numeroPedido;
let largo;
let ancho;
let grosor;
let color;
let ambasCaras;
let cortada;

// Abrir Gestión de Pedidos
function abrirGestionPedidos() {

    let opcion = prompt(
        `Gestión de Pedidos:\n` +
        `1. Crear Pedido\n` +
        `2. Modificar Pedido\n` +
        `3. Eliminar Pedido\n` +
        `4. Consultar Pedido\n`
    );

    if (opcion === null) return; // Si el usuario cancela

    switch (opcion) {
        case '1':
            crearPedido();
            break;
        case '2':
            modificarPedido();
            break;
        case '3':
            eliminarPedido();
            break;
        case '4':
            consultarPedido();
            break;
    }
}

// Función para validar formato de fecha
function validarFecha(fecha) {
    const date = new Date(fecha);
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha) && !isNaN(date) && date <= new Date();
}


// Crear pedido nuevo
function crearPedido() {
    const pedidos = obtenerDatos(KEY_PEDIDOS);

    while (true) {
        numero = parseInt(prompt('Introduce el número del pedido (entero positivo):'));
        // Si el usuario cancela, salimos de la función
        if (numero === null) {
            alert('Operación cancelada.');
            return;
        }

        if (isNaN(numero) || numero <= 0 || !Number.isInteger(numero)) {
            alert('El número de pedido debe ser un entero.');
            continue;
        }

        // Comprobar si ya existe
        if (pedidos.some(pedido => pedido.numero === numero)) {
            alert('El número de pedido ya existe.');
            continue;
        }

        break;
    }

    while (true) {
        // Solicitar cliente
        cliente = prompt('Introduce el nombre del cliente:').trim();
          // Si el usuario cancela, salimos de la función
          if (cliente === null) {
            alert('Operación cancelada.');
            return;
        }
        if (!cliente) {
            alert('El nombre del cliente no puede estar vacío.');
            continue;
        }
        break;
    }

    while (true) {
        // Solicitar fecha
        fecha = prompt('Introduce la fecha del pedido (YYYY-MM-DD):').trim();
          // Si el usuario cancela, salimos de la función
          if (fecha === null) {
            alert('Operación cancelada.');
            return;
        }
        if (!validarFecha(fecha)) {
            alert('La fecha no es válida o es futura.');
            continue;
        }
        break;
    }


    // Añadir pedido
    pedidos.push({
        numero,
        cliente,
        fecha,
        procesado: false,
        servido: false
    });
    guardarDatos(KEY_PEDIDOS, pedidos);
    alert('Pedido creado con éxito.');
}

// Obtener datos de LocalStorage 
function obtenerDatos(key) {
    const datos = localStorage.getItem(key);
    return datos ? JSON.parse(datos) : [];
}

// Guardar datos en LocalStorage
function guardarDatos(key, datos) {
    localStorage.setItem(key, JSON.stringify(datos));
}

// Modificar un pedido
function modificarPedido() {
    const pedidos = obtenerDatos(KEY_PEDIDOS);
    const numero = parseInt(prompt('Introduce el número del pedido a modificar'));
    const pedido = pedidos.find(pedido => pedido.numero === numero);

    if (!pedido) {
        alert('El pedido introducido no existe');
        return;
    }

    // Modificar cliente
    const nuevoCliente = prompt(`Introduce el nuevo nombre del cliente (actual: ${pedido.cliente}):`, pedido.cliente).trim();

    if (nuevoCliente) pedido.cliente = nuevoCliente;
    //Modificar fecha
    const nuevaFecha = prompt(`Introduce la nueva fecha del pedido (actual: ${pedido.fecha}, formato: YYYY-MM-DD):`, pedido.fecha).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(nuevaFecha) && !isNaN(Date.parse(nuevaFecha)) && new Date(nuevaFecha) <= new Date()) {
        pedido.fecha = nuevaFecha;
    }
    else {
        alert('Fecha no válida. Se conservará la anterior.');
    }

    // Modificar estado de procesado
    const nuevoProcesado = prompt(`Introduce el estado de procesado (actual: ${pedido.procesado ? 'Sí' : 'No'}, valores permitidos: Sí/No):`, pedido.procesado ? 'Sí' : 'No').trim().toLowerCase();
    if (nuevoProcesado === 'sí' || nuevoProcesado === 'no') {
        pedido.procesado = nuevoProcesado === 'sí';
    } else {
        alert('Valor no válido para procesado. Se conservará el estado anterior.');
    }

    // Modificar estado de servido
    const nuevoServido = prompt(`Introduce el estado de servido (actual: ${pedido.servido ? 'Sí' : 'No'}, valores permitidos: Sí/No):`, pedido.servido ? 'Sí' : 'No').trim().toLowerCase();
    if (nuevoServido === 'sí' || nuevoServido === 'no') {
        pedido.servido = nuevoServido === 'sí';
    } else {
        alert('Valor no válido para servido. Se conservará el estado anterior.');
    }

    guardarDatos(KEY_PEDIDOS, pedidos);
    alert('Pedido modificado con éxito.');
}


// Eliminar un pedido
function eliminarPedido() {
    const pedidos = obtenerDatos(KEY_PEDIDOS);
    const numero = parseInt(prompt('Introduce el número del pedido a eliminar:'));
    const indice = pedidos.findIndex(pedido => pedido.numero === numero);

    if (indice === -1) {
        alert('El pedido no existe.');
        return;
    }

    pedidos.splice(indice, 1);
    guardarDatos(KEY_PEDIDOS, pedidos);
    alert('Pedido eliminado con éxito.');
}


// Consultar un pedido
function consultarPedido() {
    const pedidos = obtenerDatos(KEY_PEDIDOS);
    const numero = parseInt(prompt('Introduce el número del pedido a consultar:'));
    const pedido = pedidos.find(pedido => pedido.numero === numero);

    if (!pedido) {
        alert('El pedido no existe.');
        return;
    }

    alert(`Detalle del Pedido N° ${pedido.numero}:\nCliente: ${pedido.cliente}\nFecha: ${pedido.fecha}\nProcesado: ${pedido.procesado ? 'Sí' : 'No'}\nServido: ${pedido.servido ? 'Sí' : 'No'}`);
}









// Gestión de Piezas
function crearPieza(numeroPieza, numeroPedido, largo, ancho, grosor, color, ambasCaras) {
    const piezas = obtenerDatos(KEY_PIEZAS);
    const pedidos = obtenerDatos(KEY_PEDIDOS);

    // Validaciones
    if (piezas.some(pieza => pieza.numeroPieza === numeroPieza)) {
        alert('El número de pieza ya existe.');
        return;
    }
    if (!pedidos.some(pedido => pedido.numero === numeroPedido)) {
        alert('El número de pedido no existe.');
        return;
    }
    if (isNaN(largo) || largo <= 0 || isNaN(ancho) || ancho <= 0 || isNaN(grosor) || grosor <= 0) {
        alert('Las medidas deben ser mayores que 0.');
        return;
    }

    piezas.push({
        numeroPieza,
        numeroPedido,
        largo,
        ancho,
        grosor,
        color: color || 'Natural',
        ambasCaras: !!ambasCaras,
        cortada: false
    });
    guardarDatos(KEY_PIEZAS, piezas);
    alert('Pieza creada con éxito.');
}

// Detalle de Pedido
function abrirDetallePedido(numeroPedido) {
    const piezas = obtenerDatos(KEY_PIEZAS).filter(pieza => pieza.numeroPedido === numeroPedido);
    if (piezas.length === 0) {
        alert('No hay piezas asociadas a este pedido.');
        return;
    }

    let detalle = `Detalle del Pedido N° ${numeroPedido}\n`;
    let superficieTotal = 0;
    let volumenTotal = 0;

    piezas.forEach(pieza => {
        const superficie = pieza.largo * pieza.ancho;
        const volumen = superficie * pieza.grosor;
        superficieTotal += superficie;
        volumenTotal += volumen;

        detalle += `\nNúmero de Pieza: ${pieza.numeroPieza}\n` +
            `Largo: ${pieza.largo} cm, Ancho: ${pieza.ancho} cm, Grosor: ${pieza.grosor} cm\n` +
            `Color: ${pieza.color}, Ambas Caras: ${pieza.ambasCaras ? 'Sí' : 'No'}\n` +
            `Superficie: ${superficie} cm², Volumen: ${volumen} cm³\n`;
    });

    detalle += `\nSuperficie Total: ${superficieTotal} cm²\n`;
    detalle += `Volumen Total: ${volumenTotal} cm³`;

    alert(detalle);
}



function abrirGestionPiezas() {
    console.log('Navegar a Gestión de Piezas');
}

function abrirDetallePedido() {
    const numeroPedido = parseInt(prompt('Introduce el número del pedido:'));
    if (!isNaN(numeroPedido)) {
        obtenerDetallePedido(numeroPedido);
    } else {
        alert('Número de pedido no válido.');
    }
}
