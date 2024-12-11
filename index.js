// Definir claves de LocalStorage
const KEY_PEDIDOS = 'pedidos';
const KEY_PIEZAS = 'piezas';

// Obtener datos de LocalStorage o inicializar
function obtenerDatos(key) {
    const datos = localStorage.getItem(key);
    return datos ? JSON.parse(datos) : [];
}

// Guardar datos en LocalStorage
function guardarDatos(key, datos) {
    localStorage.setItem(key, JSON.stringify(datos));
}

// Gestión de Pedidos
function crearPedido(numero, cliente, fecha) {
    const pedidos = obtenerDatos(KEY_PEDIDOS);

    // Validaciones
    if (pedidos.some(pedido => pedido.numero === numero)) {
        alert('El número de pedido ya existe.');
        return;
    }
    if (isNaN(numero) || numero < 1) {
        alert('El número de pedido debe ser un entero positivo.');
        return;
    }
    if (new Date(fecha) > new Date()) {
        alert('La fecha del pedido no puede ser futura.');
        return;
    }

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
function obtenerDetallePedido(numeroPedido) {
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

// Funciones auxiliares para abrir las secciones
function abrirGestionPedidos() {
    console.log('Navegar a Gestión de Pedidos');
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
