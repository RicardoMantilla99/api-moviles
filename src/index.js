const express = require('express')
const app = express();
const morgan = require('morgan')

//configuraciones

app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//starting  the server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')} `);
})

//routes
app.use(require('./routes/index'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/productos', require('./routes/productos'));





