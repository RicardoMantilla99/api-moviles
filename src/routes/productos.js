const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const productos = require('../sample.json');
const { title } = require('process');
console.log(productos);


router.get('/', (req, res) => {
    res.send(productos);
});


router.post('/', (req, res) => {

    const { nombre_producto, precio, descripcion } = req.body
    if (nombre_producto && precio && descripcion) {
        const id = productos.length + 1;
        const newProducto = {...req.body, id };
        console.log(newProducto);
        productos.push(newProducto);
        res.json(productos)
    } else {
        res.status(500)({ error: 'Ocurrio un error inesperado' });
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Encuentra el índice del producto con el ID dado
    const index = productos.findIndex(producto => producto.id == id);

    if (index !== -1) {
        // Elimina el producto del array
        productos.splice(index, 1);
        res.send(productos);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});



router.put('/:id', (req, res) => {
    const { id } = req.params
    const { nombre_producto, precio, descripcion } = req.body
    if (nombre_producto && precio && descripcion) {
        _.each(productos, (producto, i) => {
            if (producto.id == id) {
                producto.nombre_producto = nombre_producto;
                producto.precio = precio;
                producto.descripcion = descripcion;
            }
        });
        res.json(productos);
    } else {
        res.status(500).json({ error: 'Hubo un error' });
    }
});





router.get('/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(producto => producto.id == id);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;

/*

 

 app.get('/routes/clientes/:id',  (req, res) => {
     const cliente = clientes.find(c =>c.id === parseInt(req.params.id));
     if (!cliente) return res.status(404).send('Cliente no encontrado');
     else res.send(cliente)
 });
 
 
 
     clientes.push(cliente);
     res.send(cliente);
 });
 
 
 */