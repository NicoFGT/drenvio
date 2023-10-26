const express = require('express');
const app = express();
const PORT = 3000; 

// Lista de productos en stock
const productos = [
    { nombre: 'Producto1', stock: true, precioBase: 100 },
    { nombre: 'Producto2', stock: true, precioBase: 150 },
    
];

// Precios especiales para clientes
const preciosEspeciales = {
    'cliente1': { 'Producto1': 80 },
    'cliente2': { 'Producto2': 120 }
    
};

// Ruta para obtener productos en stock
app.post('/productos', (req, res) => {
    const productosEnStock = productos.filter(producto => producto.stock);
    res.json(productosEnStock);
});

// Ruta para obtener precio especial para un cliente y producto
app.post('/price/:user_id/:nombre_producto', (req, res) => {
    const { user_id, nombre_producto } = req.params;

    if (preciosEspeciales[user_id] && preciosEspeciales[user_id][nombre_producto]) {
        res.json({ precio: preciosEspeciales[user_id][nombre_producto] });
    } else {
        // Si no hay precio especial, devolver el precio base
        const producto = productos.find(producto => producto.nombre === nombre_producto);
        if (producto) {
            res.json({ precio: producto.precioBase });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log('Servidor corriendo');
});
