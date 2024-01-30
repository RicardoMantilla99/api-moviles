const {Router} = require('express');
const router = Router();
const _ = require('underscore');

const productos = require('../sample.json');
const { title } = require('process');
console.log(productos);


router.get('/', (req, res) =>{
    res.send(productos);
});


router.post('/', (req, res)=>{
  
    const {nombre_producto, precio, descripcion} = req.body
    if(  nombre_producto && precio && descripcion) {
        const id = productos.length +1;
        const newProducto = {...req.body,id};
        console.log(newProducto);
        productos.push(newProducto);
        res.json(productos)
    }else {
        res.status(500)({error: 'Ocurrio un error inesperado'});
    }
 });


 router.delete('/:id', (req, res)=>{
    const{id}= req.params;
    _.each(productos, (producto, i) =>{
        if(producto.id == id){
            producto.splice(i, 1);
        }
    } )
    res.send(productos);
});



router.put('/:id', (req, res)=>{
    const {id} = req.params
    const {nombre_producto, precio, descripcion } = req.body
    if(nombre_producto && precio && descripcion) {
        _.each(productos, (producto, i) =>{
            if(producto.id == id){
                producto.nombre_producto = nombre_producto;
                producto.precio = precio;
                producto.descripcion = descripcion;
            }
        });
        res.json(productos);
    }else{
        res.status(500).json({error: 'Hubo un error'});
    }
});

        
        


module.exports= router;

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