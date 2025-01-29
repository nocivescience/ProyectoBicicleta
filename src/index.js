const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejs = require('ejs');
const { Pool } = require('pg');

app.set('port', 4000 || process.env.port);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'comenius12',
    database: 'postgres',
});
app.get('/', (req, res) => {
    const content = ejs.renderFile(path.join(__dirname, 'views', 'inicio.ejs'), { message: 'Hola mundo' }, (err, str) => {
        if (err) throw err;
        res.render('layout', { title: 'Inicio', body: str , titulo: ''})
    });
});
app.get('/about', (req, res) => {
    const content = ejs.renderFile(path.join(__dirname,'views', 'about.ejs'), {mensaje: 'Acá iría el cuerpo'}, (err, str)=>{
        if (err){throw err};
        res.render(
            'layout',
            {title: 'Sobre Nosotros', titulo: 'Sobre nosotros', body: str}
        )
    })
});

app.get('/contact', (req,res)=>{
    const content = ejs.renderFile(path.join(__dirname, 'views', 'contact.ejs'),{
        mensaje: "contacto"}, (err, str)=>{
            if(err) throw err;
            res.render(
                'layout',
                {
                    title: 'Contacto',
                    titulo: 'Contáctanos',
                    body: str
                }
            )
    })
})
app.listen(app.get('port'), () => {
    console.log(`Server on ${app.get('port')}`);
})